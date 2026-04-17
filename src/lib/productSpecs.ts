export interface ProductSpec {
  model_keys: string[];
  description: string;
  processor_name: string;
  display_nits: string;
  refresh_rate: string;
  battery_desc: string;
  category: string;
  storage_options: { capacity: string; price_offset: number }[];
  variants: { color_name: string; color_hex: string; image_url: string }[];
}

export const PRODUCT_SPECS_DB: ProductSpec[] = [
  {
    model_keys: ['iphone 17 pro max'],
    description: 'The ultimate iPhone representation. Featuring the next-gen A19 Pro chip with unprecedented performance and a stunning ProMotion display.',
    processor_name: 'A19 Pro',
    display_nits: '3000 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 35h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '256GB', price_offset: 0 },
      { capacity: '512GB', price_offset: 200 },
      { capacity: '1TB', price_offset: 400 }
    ],
    variants: [
      { color_name: 'Titanium White', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_17_pro_max/iphone-17-pro-max-white.png' },
      { color_name: 'Titanium Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_17_pro_max/iphone-17-pro-max-black-.png' },
      { color_name: 'Desert Orange', color_hex: '#E67E22', image_url: '/assets/images/Tienda/Tienda/Iphone_17_pro_max/iphone-17-pro-max-orange-.png' }
    ]
  },
  {
    model_keys: ['iphone 17 pro'],
    description: 'Performance meets elegance. A19 Pro chip, surgical-grade titanium, and the most advanced Pro camera system ever.',
    processor_name: 'A19 Pro',
    display_nits: '3000 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 30h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Titanium White', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_17_pro/iphone-17-pro-max-white.png' },
      { color_name: 'Titanium Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_17_pro/iphone-17-pro-max-black-.png' },
      { color_name: 'Desert Orange', color_hex: '#E67E22', image_url: '/assets/images/Tienda/Tienda/Iphone_17_pro/iphone-17-pro-max-orange-.png' }
    ]
  },
  {
    model_keys: ['iphone 17'],
    description: 'The next generation of iPhone. Powered by the A19 chip. All-day battery life. Featuring Apple Intelligence and a stunning new design with five vibrant colors.',
    processor_name: 'A19',
    display_nits: '2500 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 24h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_17/iphone-17-black-b.jpeg' },
      { color_name: 'Glacial Blue', color_hex: '#A2C4D2', image_url: '/assets/images/Tienda/Tienda/Iphone_17/iphone-17-glacial-g.png' },
      { color_name: 'Lavande', color_hex: '#D1D1E0', image_url: '/assets/images/Tienda/Tienda/Iphone_17/iphone-17-lavande.png' },
      { color_name: 'Sage Green', color_hex: '#B2C2B2', image_url: '/assets/images/Tienda/Tienda/Iphone_17/iphone-17-sage-S.png' },
      { color_name: 'White', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_17/iphone-17-white-w.png' }
    ]
  },
  {
    model_keys: ['iphone 16 pro max'],
    description: 'The ultimate Pro. Apple Intelligence. Massive 6.9-inch display. Titanium design. Camera Control. 48MP Ultra Wide camera. A18 Pro chip. Best battery life on iPhone.',
    processor_name: 'A18 Pro',
    display_nits: '2000 nits',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 33h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '256GB', price_offset: 0 },
      { capacity: '512GB', price_offset: 200 },
      { capacity: '1TB', price_offset: 400 }
    ],
    variants: [
      { color_name: 'Desert Titanium', color_hex: '#BCB5A8', image_url: '/assets/images/Tienda/Tienda/Iphone_16_pro_Max/iphone-16-pro-max-desert.png' },
      { color_name: 'Black Titanium', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_16_pro_Max/iphone-16-pro-max-tiniumblack.png' },
      { color_name: 'White Titanium', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_16_pro_Max/iphone-16-pro-max-titaniumwhite.png' }
    ]
  },
  {
    model_keys: ['iphone 16 pro'],
    description: 'Hello, Apple Intelligence. Stunning titanium design. Larger 6.3-inch display. Camera Control. 48MP Ultra Wide camera. A18 Pro chip.',
    processor_name: 'A18 Pro',
    display_nits: '2000 nits',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 27h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Desert Titanium', color_hex: '#BCB5A8', image_url: '/assets/images/Tienda/Tienda/Iphone_16_pro/iphone-16-pro-max-desert.png' },
      { color_name: 'Black Titanium', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_16_pro/iphone-16-pro-max-tiniumblack.png' },
      { color_name: 'White Titanium', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_16_pro/iphone-16-pro-max-titaniumwhite.png' }
    ]
  },
  {
    model_keys: ['iphone 16'],
    description: 'Built for Apple Intelligence. Camera Control. 48MP Fusion camera. Five vibrant colors. Action button. A18 chip.',
    processor_name: 'A18',
    display_nits: '2000 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 22h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_16/iphone-16-black.png' },
      { color_name: 'White', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_16/iphone-16-white.png' },
      { color_name: 'Pink', color_hex: '#F0BED0', image_url: '/assets/images/Tienda/Tienda/Iphone_16/iphone-16-pink.png' },
      { color_name: 'Teal', color_hex: '#91C8C8', image_url: '/assets/images/Tienda/Tienda/Iphone_16/iphone-16-purple.png' },
      { color_name: 'Ultramarine', color_hex: '#4B6D82', image_url: '/assets/images/Tienda/Tienda/Iphone_16/iphone-16-ultramarino.png' }
    ]
  },
  {
    model_keys: ['iphone 15 pro max'],
    description: 'The ultimate iPhone. Titanium design. A17 Pro chip. Pro-class GPU. 5x Telephoto camera. Action button. Professional-grade video capabilities. USB-C.',
    processor_name: 'A17 Pro',
    display_nits: '2000 nits (peak)',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 29h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '256GB', price_offset: 0 },
      { capacity: '512GB', price_offset: 200 },
      { capacity: '1TB', price_offset: 400 }
    ],
    variants: [
      { color_name: 'Blue Titanium', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro_Max/iphone-15-pro-max-titaniob.png' },
      { color_name: 'Natural Titanium', color_hex: '#BCB5A8', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro_Max/iphone-15-pro-max-tatanio.png' },
      { color_name: 'White Titanium', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro_Max/iphone-15-pro-max-titanioW.png' }
    ]
  },
  {
    model_keys: ['iphone 15 pro'],
    description: 'Forged in titanium. A17 Pro chip — a game-changing chip. Pro-class GPU. Action button. Pro camera system. USB‑C with USB 3 speeds.',
    processor_name: 'A17 Pro',
    display_nits: '2000 nits (peak)',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 23h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Blue Titanium', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro/iphone-15-pro-max-titaniob.png' },
      { color_name: 'Natural Titanium', color_hex: '#BCB5A8', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro/iphone-15-pro-max-tatanio.png' },
      { color_name: 'White Titanium', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro/iphone-15-pro-max-titanioW.png' }
    ]
  },
  {
    model_keys: ['iphone 15'],
    description: 'New camera. New design. Newfound power. Dynamic Island comes to iPhone 15. 48MP Main camera. Durable color-infused glass and aluminum design. USB-C.',
    processor_name: 'A16 Bionic',
    display_nits: '2000 nits (peak)',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 20h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_15/Iphone_15_Black.png' },
      { color_name: 'Blue', color_hex: '#D1DCE3', image_url: '/assets/images/Tienda/Tienda/Iphone_15/Iphone_15_Blue.png' },
      { color_name: 'Yellow', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_15/iphone-15-yellow.png' },
      { color_name: 'Red', color_hex: '#AF1E2D', image_url: '/assets/images/Tienda/Tienda/Iphone_15/Iphone_15_Red.png' }
    ]
  },
  {
    model_keys: ['iphone 14 pro max'],
    description: 'The ultimate Pro. Dynamic Island. Always-On display. 48MP Main camera. Our most powerful pro camera system ever. Massive battery life.',
    processor_name: 'A16 Bionic',
    display_nits: '2000 nits (peak)',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 29h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Space Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-blackSpace.png' },
      { color_name: 'Deep Purple', color_hex: '#4B4254', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-purpleb.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-silver.png' }
    ]
  },
  {
    model_keys: ['iphone 14 pro'],
    description: 'Pro. Beyond. A magical new way to interact with iPhone. Dynamic Island. Always-On display. 48MP Main camera for up to 4x resolution.',
    processor_name: 'A16 Bionic',
    display_nits: '2000 nits (peak)',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 23h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Space Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro/iphone-14-pro-max-blackSpace.png' },
      { color_name: 'Deep Purple', color_hex: '#4B4254', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro/iphone-14-pro-max-purpleb.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro/iphone-14-pro-max-gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro/iphone-14-pro-max-silver.png' }
    ]
  },
  {
    model_keys: ['iphone 14'],
    description: 'Wonderfull. Big and bigger. Super Retina XDR display. Advanced dual-camera system for better photos in any light. Action mode for smooth handheld videos. Vital safety technology.',
    processor_name: 'A15 Bionic (5-core GPU)',
    display_nits: '800 nits (typical), 1200 nits (peak)',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 20h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Midnight', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_14/iphone-14-midnight.png' },
      { color_name: 'Blue', color_hex: '#A2B2C8', image_url: '/assets/images/Tienda/Tienda/Iphone_14/iphone-14-blue.png' },
      { color_name: 'Purple', color_hex: '#B1A9D0', image_url: '/assets/images/Tienda/Tienda/Iphone_14/iphone-14-purple.png' },
      { color_name: 'Red', color_hex: '#AF1E2D', image_url: '/assets/images/Tienda/Tienda/Iphone_14/iphone-14-red.png' },
      { color_name: 'Starlight', color_hex: '#F2F2E4', image_url: '/assets/images/Tienda/Tienda/Iphone_14/iphone-14-starlight.png' }
    ]
  },
  {
    model_keys: ['iphone 13 pro max'],
    description: 'The ultimate Pro. A massive leap in battery life. ProMotion display for a faster, more responsive feel. The most powerful camera system on iPhone.',
    processor_name: 'A15 Bionic',
    display_nits: '1000 nits',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 28h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Graphite', color_hex: '#41424C', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro_max/iphone-13-pro-max-grafito.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro_max/iphone-13-pro-max-gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro_max/iphone-13-pro-max-silver.png' }
    ]
  },
  {
    model_keys: ['iphone 13 pro'],
    description: 'Oh. So. Pro. A huge camera upgrade. A display so responsive every interaction feels new again. The world’s fastest smartphone chip.',
    processor_name: 'A15 Bionic',
    display_nits: '1000 nits',
    refresh_rate: '120Hz ProMotion',
    battery_desc: 'Up to 22h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Graphite', color_hex: '#41424C', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro/iphone-13-pro-max-grafito.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro/iphone-13-pro-max-gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro/iphone-13-pro-max-silver.png' }
    ]
  },
  {
    model_keys: ['iphone 13'],
    description: 'Your new superpower. A lightning-fast chip. A huge leap in battery life. And a bright Super Retina XDR display.',
    processor_name: 'A15 Bionic',
    display_nits: '800 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 19h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Midnight', color_hex: '#191E24', image_url: '/assets/images/Tienda/Tienda/Iphone_13/iphone-13-midnight.png' },
      { color_name: 'Blue', color_hex: '#426D8F', image_url: '/assets/images/Tienda/Tienda/Iphone_13/iphone-13-blue.png' },
      { color_name: 'Green', color_hex: '#3A463A', image_url: '/assets/images/Tienda/Tienda/Iphone_13/iphone-13-green.png' },
      { color_name: 'Pink', color_hex: '#EFCBD4', image_url: '/assets/images/Tienda/Tienda/Iphone_13/iphone-13-pink.png' },
      { color_name: 'Red', color_hex: '#AF1E2D', image_url: '/assets/images/Tienda/Tienda/Iphone_13/iphone-13-red.png' },
      { color_name: 'Starlight', color_hex: '#F9F6EF', image_url: '/assets/images/Tienda/Tienda/Iphone_13/iphone-13-starlight.png' }
    ]
  },
  {
    model_keys: ['iphone 12 pro max'],
    description: 'The ultimate iPhone of its generation. 5G speed. A14 Bionic. Pro camera system for low-light photography. Super Retina XDR display.',
    processor_name: 'A14 Bionic',
    display_nits: '1200 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 20h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Pacific Blue', color_hex: '#3D5C6C', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-pasificb.png' },
      { color_name: 'Graphite', color_hex: '#41424C', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-grafito.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-silver.png' }
    ]
  },
  {
    model_keys: ['iphone 12 pro'],
    description: 'A Pro experience in a compact size. Surgical-grade stainless steel. A14 Bionic chip. Night mode on all cameras.',
    processor_name: 'A14 Bionic',
    display_nits: '1200 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 17h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Pacific Blue', color_hex: '#3D5C6C', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro/iphone-12-pro-max-pasificb.png' },
      { color_name: 'Graphite', color_hex: '#41424C', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro/iphone-12-pro-max-grafito.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro/iphone-12-pro-max-gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro/iphone-12-pro-max-silver.png' }
    ]
  },
  {
    model_keys: ['iphone 12'],
    description: '5G speed. A14 Bionic. An edge-to-edge OLED display. Ceramic Shield front for better drop performance. A leap forward for iPhone.',
    processor_name: 'A14 Bionic',
    display_nits: '1200 nits (peak)',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 17h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 150 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_12/iphone-12-black.png' },
      { color_name: 'Blue', color_hex: '#4B5364', image_url: '/assets/images/Tienda/Tienda/Iphone_12/iphone-12-blue.png' },
      { color_name: 'Purple', color_hex: '#BF94E4', image_url: '/assets/images/Tienda/Tienda/Iphone_12/iphone-12-purple.png' },
      { color_name: 'Red', color_hex: '#AF1E2D', image_url: '/assets/images/Tienda/Tienda/Iphone_12/iphone-12-red.png' },
      { color_name: 'White', color_hex: '#FFFFFF', image_url: '/assets/images/Tienda/Tienda/Iphone_12/iphone-12-white.png' }
    ]
  },
  {
    model_keys: ['iphone 11 pro max'],
    description: 'Triple-camera system. All-night battery life. The brightest display yet.',
    processor_name: 'A13 Bionic',
    display_nits: '1200 nits',
    refresh_rate: '60Hz',
    battery_desc: 'All-day battery life',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 150 },
      { capacity: '512GB', price_offset: 350 }
    ],
    variants: [
      { color_name: 'Midnight Green', color_hex: '#4E5851', image_url: '/assets/images/Tienda/Tienda/Iphone_11_pro/iphone-11-pro-midnightg-.png' },
      { color_name: 'Space Gray', color_hex: '#535150', image_url: '/assets/images/Tienda/Tienda/Iphone_11_pro/iphone-11-pro-spaceg-.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_11_pro/iphone-11-pro-gold-.png' }
    ]
  },
  {
    model_keys: ['airpods pro 2', 'airpods pro second gen'],
    description: 'Rebuilt from the sound up. Features up to 2x more Active Noise Cancellation, Adaptive Audio, and Transparency mode. Powered by the H2 chip. MagSafe Charging Case (USB-C).',
    processor_name: 'Apple H2',
    display_nits: '-',
    refresh_rate: '-',
    battery_desc: 'Up to 6h listening time (30h total)',
    category: 'Accessories',
    storage_options: [],
    variants: [
      { color_name: 'White', color_hex: '#FFFFFF', image_url: '/assets/images/Tienda/Tienda/airPods_pro_secondgen/airpods_pro.png' }
    ]
  },
  {
    model_keys: ['iphone se 3', 'iphone se 3rd gen'],
    description: 'Love the power. Love the price. A15 Bionic chip. 5G speed. A camera that’s all kinds of smart. And a Home button you know and love. All in a durable 4.7-inch design.',
    processor_name: 'A15 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 15h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 150 }
    ],
    variants: [
      { color_name: 'Midnight', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_SE_3/iphone-se-midnight.jpg' },
      { color_name: 'Starlight', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_SE_3/iphone-se-starlight.jpg' },
      { color_name: '(PRODUCT)RED', color_hex: '#AF1E2D', image_url: '/assets/images/Tienda/Tienda/Iphone_SE_3/iphone-se-red.jpg' }
    ]
  },
  {
    model_keys: ['iphone 8 plus'],
    description: 'A new generation of iPhone. Most durable glass design. Dual 12MP cameras with Portrait mode and Portrait Lighting. A11 Bionic chip. 5.5-inch Retina HD display with True Tone.',
    processor_name: 'A11 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 14h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 120 }
    ],
    variants: [
      { color_name: 'Space Gray', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_8_plus/Iphone_8_plus_Black.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_8_plus/Iphone_8_plus_Gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_8_plus/Iphone_8_plus_silver.png' }
    ]
  },
  {
    model_keys: ['iphone 8'],
    description: 'A new generation of iPhone. Most durable glass design. Wireless charging. A11 Bionic chip. 4.7-inch Retina HD display with True Tone. 12MP camera with new sensor.',
    processor_name: 'A11 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 13h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 120 }
    ],
    variants: [
      { color_name: 'Space Gray', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_8/Iphone_8_black.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_8/Iphone_8_Gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_8/Iphone_8_Silver.png' }
    ]
  },
  {
    model_keys: ['iphone 7 plus'],
    description: 'Dual 12MP cameras. High-resolution zoom. 5.5-inch Retina HD display. A10 Fusion chip. Best battery life on an iPhone 7. Splash and water resistant.',
    processor_name: 'A10 Fusion',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 14h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '32GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 120 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/iphone_7_plus/Iphone_7_plus_Black.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/iphone_7_plus/Iphone_7_plus_Gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/iphone_7_plus/Iphone_7_plus_Silver.png' },
      { color_name: 'Rose Gold', color_hex: '#FADADD', image_url: '/assets/images/Tienda/Tienda/iphone_7_plus/Iphone_7_plus_roseGold.png' }
    ]
  },
  {
    model_keys: ['iphone 7'],
    description: 'This is iPhone 7. Advanced camera systems. The best performance and battery life ever in an iPhone. Immersive stereo speakers. A10 Fusion chip. Splash and water resistant.',
    processor_name: 'A10 Fusion',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 13h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '32GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 120 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/iPhone_7/iphone_7_black.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/iPhone_7/iphone_7_Gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/iPhone_7/iphone_7_Silver.png' },
      { color_name: 'Rose Gold', color_hex: '#FADADD', image_url: '/assets/images/Tienda/Tienda/iPhone_7/iphone_7_RoseGold.png' }
    ]
  },
  {
    model_keys: ['iphone xs max'],
    description: 'Welcome to the big screens. Super Retina. The largest display ever on an iPhone (6.5"). Faster Face ID. A12 Bionic chip. Dual 12MP cameras with Depth Control. Surgical-grade stainless steel.',
    processor_name: 'A12 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 15h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 250 }
    ],
    variants: [
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_Xs_Max/Iphone_Xs_max_Gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_Xs_Max/iphone-xs-max-Silver.png' }
    ]
  },
  {
    model_keys: ['iphone xr'],
    description: 'Brilliant. In every way. All-new Liquid Retina display. Faster Face ID. The smartest, most powerful chip in a smartphone. A breakthrough camera system. Six stunning new finishes.',
    processor_name: 'A12 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 16h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '128GB', price_offset: 50 },
      { capacity: '256GB', price_offset: 150 }
    ],
    variants: [
      { color_name: 'Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_Xr/iphone-xr-black.png' },
      { color_name: 'Blue', color_hex: '#A2B2C8', image_url: '/assets/images/Tienda/Tienda/Iphone_Xr/iphone-xr-blue.png' },
      { color_name: 'Red', color_hex: '#AF1E2D', image_url: '/assets/images/Tienda/Tienda/Iphone_Xr/iphone-xr-red.png' },
      { color_name: 'White', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_Xr/iphone-xr-white.png' },
      { color_name: 'Yellow', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_Xr/iphone-xr-yellow.png' }
    ]
  },
  {
    model_keys: ['iphone xs'],
    description: 'Welcome to the big screens. Super Retina. Faster Face ID. The smartest, most powerful chip in a smartphone. And a breakthrough dual-camera system. Surgical-grade stainless steel.',
    processor_name: 'A12 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 14h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 250 }
    ],
    variants: [
      { color_name: 'Space Gray', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_Xs/Iphone_XS_Black.png' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_Xs/Iphone_XS_Gold.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_Xs/Iphone_XS_Silver.png' }
    ]
  },
  {
    model_keys: ['iphone x'],
    description: 'Say hello to the future. 5.8-inch Super Retina display. Face ID. A11 Bionic chip. Dual 12MP cameras with OIS. Stainless steel and glass design.',
    processor_name: 'A11 Bionic',
    display_nits: '625 nits',
    refresh_rate: '60Hz',
    battery_desc: 'Up to 13h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '64GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 150 }
    ],
    variants: [
      { color_name: 'Space Gray', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_X/Iphone_X_Black.png' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_X/Iphone_X_White.png' }
    ]
  },
  {
    model_keys: ['samsung galaxy s25 ultra', 's25 ultra'],
    description: 'The ultimate smartphone experience. Featuring the Snapdragon 8 Gen 4, a 6.8" Dynamic AMOLED 2X display, and the iconic S Pen. Professional-grade 200MP camera system with advanced Galaxy AI.',
    processor_name: 'Snapdragon 8 Gen 4',
    display_nits: '2600 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 30h video playback',
    category: 'Samsung',
    storage_options: [
      { capacity: '256GB', price_offset: 0 },
      { capacity: '512GB', price_offset: 150 },
      { capacity: '1TB', price_offset: 350 }
    ],
    variants: [
      { color_name: 'Titanium Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/S25/s25_ultra_Png.png' },
      { color_name: 'Titanium Gray', color_hex: '#535150', image_url: '/assets/images/Tienda/Tienda/S25/S25ultra-shop-png.webp' }
    ]
  }
];

export const searchProductSpecs = (title: string): ProductSpec | null => {
  if (!title) return null;
  const lowercaseTitle = title.toLowerCase();
  
  // Find the first spec where any of its model_keys are included in the user's title
  const found = PRODUCT_SPECS_DB.find(spec => 
    spec.model_keys.some(key => lowercaseTitle.includes(key))
  );
  
  return found || null;
};
