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
    model_keys: ['iphone 16 pro max', 'iphone 16 pro'],
    description: 'Unmatched longevity and power. Ceramic Shield front and Aerospace-grade titanium design.',
    processor_name: 'A18 Pro',
    display_nits: '2000 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 33h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '256GB', price_offset: 0 },
      { capacity: '512GB', price_offset: 200 },
      { capacity: '1TB', price_offset: 400 }
    ],
    variants: [
      { color_name: 'Titanium White', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/iphone-16-pro-max-titaniumwhite.jpeg' },
      { color_name: 'Titanium Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/iphone-16-pro-max-tiniumblack.jpeg' },
      { color_name: 'Desert Titanium', color_hex: '#C9B19C', image_url: '/assets/images/Tienda/Tienda/iphone-16-pro-max-desert.jpeg' }
    ]
  },
  {
    model_keys: ['iphone 15 pro max', 'iphone 15 pro'],
    description: 'The first iPhone to feature an aerospace-grade titanium design. Powered by the A17 Pro chip.',
    processor_name: 'A17 Pro',
    display_nits: '2000 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 29h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 },
      { capacity: '1TB', price_offset: 500 }
    ],
    variants: [
      { color_name: 'Natural Titanium', color_hex: '#BEBBB4', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro_Max/iphone-15-pro-max-titanio.jpeg' },
      { color_name: 'White Titanium', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro_Max/iphone-15-pro-max-titanioW.jpeg' },
      { color_name: 'Black Titanium', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_15_pro_Max/iphone-15-pro-max-titaniob.jpeg' }
    ]
  },
  {
    model_keys: ['iphone 14 pro max', 'iphone 14 pro'],
    description: 'Introducing Dynamic Island and the A16 Bionic chip. Experience the 48MP Main camera.',
    processor_name: 'A16 Bionic',
    display_nits: '2000 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 29h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Space Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-blackSpace.jpeg' },
      { color_name: 'Deep Purple', color_hex: '#594F63', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-purpleb.jpeg' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_14_Pro_max/iphone-14-pro-max-silver.jpeg' }
    ]
  },
  {
    model_keys: ['iphone 13 pro max', 'iphone 13 pro'],
    description: 'The biggest camera upgrade ever. Cinematic mode and macro photography.',
    processor_name: 'A15 Bionic',
    display_nits: '1200 nits',
    refresh_rate: '120Hz',
    battery_desc: 'Up to 28h video playback',
    category: 'iPhones',
    storage_options: [
      { capacity: '128GB', price_offset: 0 },
      { capacity: '256GB', price_offset: 100 },
      { capacity: '512GB', price_offset: 300 }
    ],
    variants: [
      { color_name: 'Graphite', color_hex: '#41424C', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro_max/iphone-13-pro-max-grafito.jpeg' },
      { color_name: 'Sierra Blue', color_hex: '#9BB5CE', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro/iphone-13-blue.jpeg' },
      { color_name: 'Silver', color_hex: '#F5F5F0', image_url: '/assets/images/Tienda/Tienda/Iphone_13_Pro_max/iphone-13-pro-max-silver.jpeg' }
    ]
  },
  {
    model_keys: ['iphone 12 pro max', 'iphone 12 pro'],
    description: 'The first iPhone with 5G. Super Retina XDR display and LiDAR Scanner.',
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
      { color_name: 'Graphite', color_hex: '#41424C', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-grafito.jpeg' },
      { color_name: 'Pacific Blue', color_hex: '#3D5C6C', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-pasificb.jpeg' },
      { color_name: 'Gold', color_hex: '#F9E5BC', image_url: '/assets/images/Tienda/Tienda/Iphone_12_pro_max/iphone-12-pro-max-gold.jpeg' }
    ]
  },
  {
    model_keys: ['iphone 11 pro max', 'iphone 11 pro'],
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
    model_keys: ['samsung', 's25 ultra', 's24 ultra'],
    description: 'The champion of Android. Unrivaled performance, premium titanium design, and an integrated S Pen for ultimate productivity.',
    processor_name: 'Snapdragon 8 Gen 4',
    display_nits: '2600 nits',
    refresh_rate: '120Hz Adaptive',
    battery_desc: '5000 mAh (Up to 30h video playback)',
    category: 'Samsung',
    storage_options: [
      { capacity: '256GB', price_offset: 0 },
      { capacity: '512GB', price_offset: 120 },
      { capacity: '1TB', price_offset: 360 }
    ],
    variants: [
      { color_name: 'Titanium Black', color_hex: '#1F2020', image_url: '/assets/images/Tienda/Tienda/S25ultra-shop-png.webp' },
      { color_name: 'Titanium Gray', color_hex: '#7A7A7A', image_url: '/assets/images/Tienda/Tienda/s25_ultra_Png.png' }
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
