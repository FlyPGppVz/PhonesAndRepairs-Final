/**
 * # ARCHIVO: js/stripe-config.js
 * # PROPÓSITO: Configuración pública de Stripe.
 */

const STRIPE_PUBLIC_KEY = 'pk_test_51TMjCzKC0sZs6xiizgh3Gf1qGRCa3vJxY9Rv4zu2c28ogxdARGDzQ7gy3pulOy79nSkRsmYCt59kDfha9qLmgE6o00FO1iH23U';

// Inicialización de Stripe (requiere cargar https://js.stripe.com/v3/ primero)
let stripe;
if (typeof Stripe !== 'undefined') {
    stripe = Stripe(STRIPE_PUBLIC_KEY);
} else {
    console.warn('Stripe.js no cargado. Asegúrate de incluir <script src="https://js.stripe.com/v3/"></script>');
}
