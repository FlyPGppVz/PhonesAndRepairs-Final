const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Support both single product (productId) and array of items (cartItems)
  const { productId, cartItems } = req.body;
  let line_items = [];

  try {
    if (productId) {
      // Single Product Flow
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error || !product) return res.status(404).json({ error: 'Product not found' });

      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.main_image_url || product.image_url],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      });
    } else if (cartItems && cartItems.length > 0) {
      // Multiple Items Flow (Cart)
      for (const item of cartItems) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        });
      }
    } else {
      return res.status(400).json({ error: 'Missing product details' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin}/booking-confirmation.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: req.headers.referer || `${req.headers.origin}/shop-fully-connected.html`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error:', err);
    res.status(500).json({ error: err.message });
  }
};
