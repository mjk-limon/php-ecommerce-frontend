import {
  Campaign,
  Category,
  FilterObjects,
  PaymentMethod,
  Product,
  ProductQuestion,
  ProductReview,
  ShippingLocation,
  ShippingMethod,
  StoreMeta,
  User
} from '../types';

export const STORE_CONTACT = {
  phone: '01894084242',
  email: 'info@wellsellbd.com',
  secondary_email: 'jhmasterlimon11@gmail.com',
  address: 'Sector 3, Uttara, Dhaka-1230, Bangladesh',
  whatsapp: '+8801894084242',
  hotline: '+8801894084242',
  app_key: 'abcd'
};

export const MOCK_USER: User = {
  id: 1,
  username: 'ixarapitiy04@gmail.com',
  first_name: 'Jahid',
  last_name: 'Limon',
  email: 'ixarapitiy04@gmail.com',
  address: 'gmexcsCbenkMnuVoWvQnaq',
  city: 'Bagerhat',
  state: 'Barisal',
  country: 'Bangladesh',
  postal_code: 'vyzwkzFAtrXMXbEotuUt',
  phone: '2617681904',
  created_at: '2025-12-21 17:57:50',
  updated_at: '2026-10-17 01:02:05'
};

export const STORE_METAS: StoreMeta[] = [
  {
    id: 1,
    tenant_id: 1,
    meta_key: 'layout',
    meta_sub_key: null,
    meta_value: JSON.stringify({ logo: 'logo.png', name: 'Wellsell BD' }),
    visibility: 'public',
    updated_at: '2026-10-17 14:58:42'
  },
  {
    id: 3,
    tenant_id: 1,
    meta_key: 'contact',
    meta_sub_key: null,
    meta_value: JSON.stringify({ phone: '01956758055', email: 'jhmasterlimon11@gmail.com' }),
    visibility: 'public',
    updated_at: '2026-10-17 14:58:42'
  }
];

// 3-Level Multimenu Category Tree (Matching Postman collection & WellSell BD concepts)
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 101,
    name: 'Health & Vitamin',
    slug: 'health-vitamin',
    icon: 'Pill',
    childs: [
      {
        id: 1011,
        name: 'Multivitamins & Minerals',
        slug: 'multivitamins-minerals',
        childs: [
          { id: 10111, name: 'Daily Tablets', slug: 'daily-tablets' },
          { id: 10112, name: 'Liposomal Liquid', slug: 'liposomal-liquid' },
          { id: 10113, name: 'Effervescent Fizzy', slug: 'effervescent-fizzy' }
        ]
      },
      {
        id: 1012,
        name: 'Calcium & Bone Health',
        slug: 'calcium-bone-health',
        childs: [
          { id: 10121, name: 'Vitamin D3 + K2', slug: 'vitamin-d3-k2' },
          { id: 10122, name: 'Magnesium Glycinate', slug: 'magnesium-glycinate' }
        ]
      },
      {
        id: 1013,
        name: 'Herbal & Organic Supplements',
        slug: 'herbal-organic',
        childs: [
          { id: 10131, name: 'Organic Turmeric & Ginger', slug: 'organic-turmeric-ginger' },
          { id: 10132, name: 'Ashwagandha', slug: 'ashwagandha' }
        ]
      },
      {
        id: 1014,
        name: 'Immunity Boosters',
        slug: 'immunity-boosters',
        childs: [
          { id: 10141, name: 'Glutathione 1750mg', slug: 'glutathione-1750mg' },
          { id: 10142, name: 'Liposomal NAD+', slug: 'liposomal-nad' }
        ]
      },
      {
        id: 1015,
        name: 'Fish Oil & Omega 3',
        slug: 'fish-oil-omega',
        childs: [
          { id: 10151, name: 'Wild Alaskan Salmon Oil', slug: 'wild-alaskan-salmon-oil' },
          { id: 10152, name: 'Triple Strength Omega 3', slug: 'triple-strength-omega-3' }
        ]
      }
    ]
  },
  {
    id: 102,
    name: 'Health & Beauty',
    slug: 'health-beauty',
    icon: 'Sparkles',
    childs: [
      {
        id: 1021,
        name: 'Perfumes & Fragrances',
        slug: 'perfumes-fragrances',
        childs: [
          { id: 10211, name: 'Eau De Parfum (EDP)', slug: 'eau-de-parfum' },
          { id: 10212, name: 'Body Mist & Sprays', slug: 'body-mist-sprays' }
        ]
      },
      {
        id: 1022,
        name: 'Facial Cleansers & Toners',
        slug: 'facial-cleansers-toners',
        childs: [
          { id: 10221, name: 'Botanical Foaming Cleansers', slug: 'botanical-foaming-cleansers' },
          { id: 10222, name: 'Micellar Water', slug: 'micellar-water' }
        ]
      },
      {
        id: 1023,
        name: 'Serums & Essences',
        slug: 'serums-essences',
        childs: [
          { id: 10231, name: 'Hyaluronic Acid Serums', slug: 'hyaluronic-serums' },
          { id: 10232, name: 'Vitamin C Brightening', slug: 'vitamin-c-brightening' }
        ]
      },
      {
        id: 1024,
        name: 'Face Masks & Peels',
        slug: 'face-masks-peels',
        childs: [
          { id: 10241, name: 'Platinum Pearl Peel Off', slug: 'platinum-pearl-peel-off' },
          { id: 10242, name: 'Clay & Charcoal Masks', slug: 'clay-charcoal-masks' }
        ]
      }
    ]
  },
  {
    id: 32,
    tenant_id: 0,
    name: 'Sewing Machinery',
    slug: 'sewing-machinery',
    position: 1000,
    childs: [
      {
        id: 33,
        tenant_id: 0,
        parent_main_id: 32,
        parent_sub_id: null,
        slug: 'sewing-machinery-pre-sewing-machine',
        name: 'Pre-sewing Machine',
        position: 1000,
        childs: [
          {
            id: 34,
            tenant_id: 0,
            parent_main_id: 32,
            parent_sub_id: 33,
            slug: 'sewing-machinery-pre-sewing-machine-cutting-machine',
            name: 'Cutting Machine',
            position: 1000
          },
          {
            id: 35,
            tenant_id: 0,
            parent_main_id: 32,
            parent_sub_id: 33,
            slug: 'sewing-machinery-pre-sewing-machine-thread-distributor',
            name: 'Thread Distributor',
            position: 1000
          }
        ]
      },
      {
        id: 36,
        tenant_id: 0,
        parent_main_id: 32,
        parent_sub_id: null,
        slug: 'sewing-machinery-sewing-machine',
        name: 'Sewing Machine',
        position: 1000,
        childs: [
          {
            id: 37,
            name: 'Direct Drive Overlock',
            slug: 'direct-drive-overlock'
          },
          {
            id: 38,
            name: 'Button Holing & Tacking',
            slug: 'button-holing-tacking'
          }
        ]
      }
    ]
  },
  {
    id: 48,
    tenant_id: 0,
    name: 'Laundry Machinery',
    slug: 'laundry-machinery',
    position: 1000,
    childs: [
      {
        id: 481,
        name: 'Industrial Steam Boilers',
        slug: 'industrial-steam-boilers'
      },
      {
        id: 482,
        name: 'Hydro Extractor & Dryers',
        slug: 'hydro-extractor-dryers'
      }
    ]
  },
  {
    id: 23,
    tenant_id: 0,
    name: 'Yarn Tester',
    slug: 'yarn-tester',
    position: 1000,
    childs: [
      {
        id: 24,
        tenant_id: 0,
        parent_main_id: 23,
        parent_sub_id: null,
        slug: 'yarn-tester-yarn-tester',
        name: 'Yarn Tester',
        position: 1000,
        childs: [
          {
            id: 25,
            tenant_id: 0,
            parent_main_id: 23,
            parent_sub_id: 24,
            slug: 'yarn-tester-yarn-tester-anytester',
            name: 'Anytester',
            position: 1000
          },
          {
            id: 26,
            tenant_id: 0,
            parent_main_id: 23,
            parent_sub_id: 24,
            slug: 'yarn-tester-yarn-tester-prowhite',
            name: 'ProWhite',
            position: 1000
          }
        ]
      }
    ]
  },
  {
    id: 55,
    tenant_id: 0,
    name: 'Material Handling Equipment',
    slug: 'material-handling-equipment',
    position: 1000,
    childs: [
      {
        id: 551,
        name: 'Diesel & Electric Forklifts',
        slug: 'diesel-electric-forklifts'
      },
      {
        id: 552,
        name: 'Semi-Electric Stackers',
        slug: 'semi-electric-stackers'
      }
    ]
  },
  {
    id: 13,
    tenant_id: 0,
    name: 'Dyeing & Fastening Equipment',
    slug: 'dyeing-fastening-equipment',
    position: 1000,
    childs: [
      {
        id: 14,
        tenant_id: 0,
        parent_main_id: 13,
        parent_sub_id: null,
        slug: 'dyeing-fastening-equipment-prowhite',
        name: 'ProWhite',
        position: 1000,
        childs: [
          { id: 141, name: 'Fastness Testing Devices', slug: 'fastness-testing-devices' },
          { id: 142, name: 'Sample Dyeing Machines', slug: 'sample-dyeing-machines' }
        ]
      }
    ]
  },
  {
    id: 17,
    tenant_id: 0,
    name: 'Strength Testing Equipment',
    slug: 'strength-testing-equipment',
    position: 1000,
    childs: [
      {
        id: 18,
        tenant_id: 0,
        parent_main_id: 17,
        parent_sub_id: null,
        slug: 'strength-testing-equipment-brand',
        name: 'Brand',
        position: 1000,
        childs: [
          {
            id: 19,
            tenant_id: 0,
            parent_main_id: 17,
            parent_sub_id: 18,
            slug: 'strength-testing-equipment-brand-prowhite',
            name: 'ProWhite',
            position: 1000
          }
        ]
      },
      {
        id: 20,
        tenant_id: 0,
        parent_main_id: 17,
        parent_sub_id: null,
        slug: 'strength-testing-equipment-brand-2',
        name: 'Brand 2',
        position: 1000,
        childs: [
          {
            id: 21,
            tenant_id: 0,
            parent_main_id: 17,
            parent_sub_id: 20,
            slug: 'strength-testing-equipment-brand-2-anytester',
            name: 'Anytester',
            position: 1000
          },
          {
            id: 22,
            tenant_id: 0,
            parent_main_id: 17,
            parent_sub_id: 20,
            slug: 'strength-testing-equipment-brand-2-brand3',
            name: 'Brand3',
            position: 1000
          }
        ]
      }
    ]
  },
  {
    id: 1,
    tenant_id: 0,
    name: 'LAB CONSUMBLES 1',
    slug: 'lab-consumbles-1',
    position: 1,
    childs: [
      {
        id: 2,
        tenant_id: 0,
        parent_main_id: 1,
        parent_sub_id: null,
        slug: 'lab-consumbles-1-sdc-products',
        name: 'SDC PRODUCTS',
        position: 1,
        childs: [
          {
            id: 3,
            tenant_id: 0,
            parent_main_id: 1,
            parent_sub_id: 2,
            slug: 'lab-consumbles-1-sdc-products-sdc-products',
            name: 'SDC PRODUCTS',
            position: 1
          }
        ]
      }
    ]
  },
  {
    id: 103,
    name: "Men's Care & Grooming",
    slug: 'men',
    icon: 'User',
    childs: [
      { id: 1031, name: 'Beard Oils & Balms', slug: 'beard-oils' },
      { id: 1032, name: 'Men Fragrances', slug: 'men-fragrances' },
      { id: 1033, name: 'Face Wash & Scrub', slug: 'men-face-wash' }
    ]
  },
  {
    id: 104,
    name: 'Mom & Baby Care',
    slug: 'mom-kids',
    icon: 'Baby',
    childs: [
      { id: 1041, name: 'Baby Shampoo & Wash', slug: 'baby-shampoo' },
      { id: 1042, name: 'Diaper Rash Cream', slug: 'diaper-rash-cream' },
      { id: 1043, name: 'Baby Lotions & Powders', slug: 'baby-lotions' }
    ]
  },
  {
    id: 106,
    name: 'Watches Collection',
    slug: 'watch-collection',
    icon: 'Clock',
    childs: [
      { id: 1061, name: 'Men Chronograph', slug: 'men-chronograph' },
      { id: 1062, name: 'Women Minimalist', slug: 'women-minimalist' }
    ]
  },
  {
    id: 107,
    name: 'Korean Beauty',
    slug: 'korean-collection',
    icon: 'Sparkles',
    childs: [
      { id: 1071, name: 'Snail Mucin Essences', slug: 'snail-mucin' },
      { id: 1072, name: 'Cica Soothing Gels', slug: 'cica-soothing' },
      { id: 1073, name: 'Glass Skin Sheet Masks', slug: 'glass-skin-masks' }
    ]
  }
];

// All Products (combining Postman collections + Health/Beauty screenshots)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 103764,
    product_code: '103764',
    name: 'Cerave SA Lotion For Rough & Bumpy Skin 237ml',
    slug: 'cerave-sa-lotion-for-rough-bumpy-skin-237ml',
    brand: 'Cerave',
    category_id: 102,
    category_name: 'Health & Beauty',
    price: 2790,
    old_price: 3390,
    discount: 18,
    stock: 25,
    views: 8900,
    rating: 4.9,
    reviews_count: 54,
    sku: '3606000537712',
    image: '/assets/images/cerave_sa_lotion.png',
    images: ['/assets/images/cerave_sa_lotion.png'],
    variants: [
      {
        id: 1037641,
        product_id: 103764,
        size: '237ml',
        color: null,
        price: 2790,
        old_price: 3390,
        stock: 25,
        sku: '3606000537712',
        image: '/assets/images/cerave_sa_lotion.png',
        images: ['/assets/images/cerave_sa_lotion.png']
      },
      {
        id: 1037642,
        product_id: 103764,
        size: '473ml',
        color: null,
        price: 4350,
        old_price: 4990,
        stock: 12,
        sku: '3606000537729',
        image: '/assets/images/cerave_sa_lotion.png',
        images: ['/assets/images/cerave_sa_lotion.png']
      }
    ],
    description: '<p>Cerave SA Lotion for Rough & Bumpy Skin is formulated to effectively smooth and soothe dry, rough, and bumpy skin. Formulated with salicylic acid, lactic acid, hyaluronic acid, and 3 essential ceramides, this lightweight non-greasy lotion exfoliates, hydrates, and restores the protective skin barrier without irritation.</p>'
  },
  // Health & Vitamins from Screenshot 3
  {
    id: 2001,
    name: 'Calpol Infant Sugar Free Colour Free Oral Suspension Strawberry Flavour',
    slug: 'calpol-infant-sugar-free-colour-free-oral-suspension-strawberry-flavour',
    brand: 'Calpol',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 1050,
    old_price: 1200,
    discount: 13,
    stock: 24,
    views: 4120,
    rating: 4.8,
    reviews_count: 36,
    sku: 'CAL-INF-100',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Calpol Infant Sugar Free oral suspension provides soothing relief from pain and fever for babies and children aged 2 months to 6 years. Formulated with gentle strawberry flavor and zero added sugar.</p>'
  },
  {
    id: 2002,
    name: 'Apex Time Liposomal Glutathione 1750mg 120 Veg Capsules (USA)',
    slug: 'apex-time-liposomal-glutathione-1750mg-120-veg-capsules-usa',
    brand: 'Apex Time',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 5640,
    old_price: 6200,
    discount: 10,
    stock: 15,
    views: 3890,
    rating: 4.9,
    reviews_count: 42,
    sku: 'APX-LIP-1750',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Advanced liposomal cellular delivery provides maximum bioavailability of reduced L-glutathione combined with vitamin C for ultimate liver detox and antioxidant defense.</p>'
  },
  {
    id: 2003,
    name: 'Bronson Liposomal Vitamin D3 + K2 MK-7 - 360 Softgels (USA)',
    slug: 'bronson-liposomal-vitamin-d3-k2-mk-7-360-softgels-usa',
    brand: 'Bronson',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 3340,
    old_price: 3800,
    discount: 12,
    stock: 30,
    views: 2950,
    rating: 4.7,
    reviews_count: 18,
    sku: 'BRN-D3K2-360',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Targeted bone and arterial health synergy. Liposomal vitamin D3 promotes calcium absorption while vitamin K2 MK-7 directs calcium safely to bone tissue.</p>'
  },
  {
    id: 2004,
    name: 'Webber Naturals Magnesium Complex 400mg Enhanced (Canada)',
    slug: 'webber-naturals-magnesium-complex-400mg-enhanced-canada',
    brand: 'Webber Naturals',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 2940,
    old_price: 3400,
    discount: 14,
    stock: 18,
    views: 3100,
    rating: 4.8,
    reviews_count: 22,
    sku: 'WBR-MG-400',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Enhanced absorption magnesium complex supports muscle relaxation, nerve function, and restorative night-time sleep cycles without digestive distress.</p>'
  },
  {
    id: 2005,
    name: 'Micro Ingredients Liposomal NAD+ for Women Complex 180 Veggie',
    slug: 'micro-ingredients-liposomal-nad-for-women-complex-180-veggie',
    brand: 'Micro Ingredients',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 6080,
    old_price: 7000,
    discount: 13,
    stock: 12,
    views: 1890,
    rating: 4.9,
    reviews_count: 15,
    sku: 'MIC-NAD-180',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Groundbreaking cellular vitality formula featuring direct NAD+ precursor compounds with resveratrol and quercetin for mitochondrial energy enhancement.</p>'
  },
  {
    id: 2006,
    name: 'Nutravita High Strength Testomax 2.0 90 Tablets (UK)',
    slug: 'nutravita-high-strength-testomax-2-90-tablets-uk',
    brand: 'Nutravita',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 5650,
    old_price: 6400,
    discount: 12,
    stock: 20,
    views: 4500,
    rating: 4.6,
    reviews_count: 29,
    sku: 'NTR-TMX-90',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Manufactured in the UK under GMP guidelines. Formulated with zinc, magnesium, fenugreek, and vitamin B6 to promote natural male endurance and testosterone metabolism.</p>'
  },
  {
    id: 2007,
    name: 'Applied Nutrition Marine Collagen + 60 Capsules (UK)',
    slug: 'applied-nutrition-marine-collagen-60-capsules-uk',
    brand: 'Applied Nutrition',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 3160,
    old_price: 3600,
    discount: 12,
    stock: 25,
    views: 3200,
    rating: 4.8,
    reviews_count: 31,
    sku: 'APP-COL-60',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Hydrolyzed wild fish collagen peptide capsules with hyaluronic acid and vitamin C to promote dermal hydration, skin elasticity, and radiant nail strength.</p>'
  },
  {
    id: 2008,
    name: 'Applied Nutrition Sleep Support - 60 Capsules 100% ORIGINAL (UK)',
    slug: 'applied-nutrition-sleep-support-60-capsules-100-original-uk',
    brand: 'Applied Nutrition',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 3150,
    old_price: 3600,
    discount: 12,
    stock: 14,
    views: 2800,
    rating: 4.7,
    reviews_count: 14,
    sku: 'APP-SLP-60',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Natural herbal restful sleep complex blending 5-HTP, chamomile flower extract, L-theanine, magnesium, and lemon balm for restorative REM recovery.</p>'
  },
  {
    id: 2009,
    name: 'Nutravita Organic Turmeric Ginger & Black Pepper 1440mg 180 Vegan',
    slug: 'nutravita-organic-turmeric-ginger-black-pepper-1440mg-180-vegan',
    brand: 'Nutravita',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 4150,
    old_price: 4800,
    discount: 14,
    stock: 22,
    views: 3600,
    rating: 4.9,
    reviews_count: 45,
    sku: 'NTR-TRM-180',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Certified organic soil association turmeric enriched with organic ginger root and black pepper extract (piperine) for 2000% increased curcumin absorption.</p>'
  },
  {
    id: 2010,
    name: 'New Leaf Magnesium Glycinate 300mg with Vitamin B6 & Taurine',
    slug: 'new-leaf-magnesium-glycinate-300mg-with-vitamin-b6-taurine',
    brand: 'New Leaf',
    category_id: 101,
    category_name: 'Health & Vitamin',
    price: 4340,
    old_price: 4900,
    discount: 11,
    stock: 19,
    views: 2700,
    rating: 4.8,
    reviews_count: 20,
    sku: 'NLF-MGG-300',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Chelated bioavailable magnesium bisglycinate coupled with vitamin B6 and amino acid taurine to optimize central nervous calm and muscular repair.</p>'
  },

  // Screenshot 2: Product Details featured item
  {
    id: 108567,
    name: 'Absolute Renewal Brightening Platinum Pearl Peel Off Mask 70g',
    slug: 'absolute-renewal-brightening-platinum-pearl-peel-off-mask-70g',
    brand: 'Anytester',
    category_id: 102,
    category_name: 'Health & Beauty',
    price: 750,
    old_price: 850,
    discount: 12,
    stock: 18,
    views: 2950,
    rating: 4.9,
    reviews_count: 58,
    sku: 'AN-PLT-70G',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    thumbnails: [
      '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
      '/assets/images/hero_beauty_skincare_banner_1792385518854.jpg'
    ],
    description: `
      <div class="product-description-content">
        <h4><strong>The Absolute Renewal Brightening Platinum Pearl Peel Off Mask</strong></h4>
        <p>A premier skincare solution developed to draw out cellular impurities, unclog congested pores, and infuse essential micronutrients deep into the dermal mantle. Formulated with authentic micronized platinum pearl powder, botanical hyaluronic acid, and white truffle extracts.</p>
        
        <h5>Key Benefits</h5>
        <ul>
          <li><strong>Direct Pore Refining:</strong> Gently lifts blackheads, environmental micro-pollutants, and oxidized sebum without stripping essential lipids.</li>
          <li><strong>Platinum Radiance Complex:</strong> Delivers instant luminosity and tightens slack facial contours.</li>
          <li><strong>Paraben & Cruelty Free:</strong> 100% hypoallergenic formulation dermatologically certified for sensitive skin.</li>
        </ul>

        <h5>How To Apply</h5>
        <p>Cleanse face with warm water. Apply an even, moderate layer avoiding eye area and lips. Allow to dry completely for 15-20 minutes, then gently peel from the jawline upward.</p>
      </div>
    `
  },

  // Postman Collection Featured Detail Product: Yarn Twist Tester
  {
    id: 10,
    name: 'Yarn Twist Tester',
    slug: 'yarn-twist-tester',
    brand: 'PROWHITE',
    category_id: 25,
    category_name: 'Yarn Tester',
    price: 45220,
    old_price: 52000,
    discount: 13,
    stock: 5,
    views: 201,
    rating: 4.8,
    reviews_count: 12,
    sku: 'PW-YTT-10',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: `
      <div class="product-description-content">
        <p><strong>The Yarn Twist Tester</strong> is a laboratory equipment developed to measure the amount of twist in yarns per unit length with high precision. Capable of measuring in Twist Per Inch (TPI) or Twist Per Meter (TPM), this device calculates the number of spiral structures based on the principle of unraveling or re-twisting the yarn and determines the net twist value.</p>
        <p>The device is available in both manual and motorized versions, providing the user with fast, repeatable, and reliable test results.</p>
        <h5>Measurement Methods</h5>
        <ul>
          <li><strong>Direct Counting Method:</strong> The sample is unraveled, the spiral structure of the yarn is counted, and the twist value is calculated manually.</li>
          <li><strong>Automatic Untwist-Retwist Method:</strong> In motorized models, while the yarn is unwinding, the system automatically calculates the twist amount based on the original length of the yarn.</li>
        </ul>
        <h5>Technical Specifications</h5>
        <ul>
          <li><strong>Measurement Range:</strong> 0 – 999 TPI / TPM</li>
          <li><strong>Yarn Sample Length:</strong> 10 mm – 500 mm</li>
          <li><strong>Screen:</strong> 3.5” touchscreen color display</li>
          <li><strong>Tensioning Mechanism:</strong> Weight-loaded system</li>
          <li><strong>Clamping System:</strong> Rotating and fixed jaw structure</li>
          <li><strong>Operating Mode:</strong> Motorized model</li>
          <li><strong>Accuracy:</strong> ±1 TPI / TPM</li>
          <li><strong>Power Requirement:</strong> 220 V AC, 50 Hz</li>
          <li><strong>Body Material:</strong> Electrostatic powder-coated steel</li>
        </ul>
      </div>
    `
  },

  // Postman Products: Machinery & Testing Equipment
  {
    id: 100184,
    name: 'JK1790 Electrical straight button holing machine',
    slug: 'jk1790-electrical-straight-button-holing-machine',
    brand: 'JOCKY',
    category_id: 44,
    category_name: 'Sewing Machinery',
    price: 6520,
    old_price: 7500,
    discount: 13,
    stock: 5,
    views: 520,
    rating: 4.7,
    sku: 'JK-1790-E',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Direct drive computerized straight button holing sewing unit with step motor cloth feed and high efficiency auto cutter.</p>'
  },
  {
    id: 100216,
    name: 'GP5-1 Fur sewing machine, for thin and medium heavy material',
    slug: 'gp5-1-fur-sewing-machine-for-thin-and-medium-heavy-material-',
    brand: 'JOCKY',
    category_id: 46,
    category_name: 'Sewing Machinery',
    price: 5268,
    old_price: 6000,
    discount: 12,
    stock: 5,
    views: 430,
    rating: 4.6,
    sku: 'GP5-1-FUR',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Single needle disk-feed fur sewing machine suitable for fine sheepskins, synthetic furs, and glove manufacturing.</p>'
  },
  {
    id: 100119,
    name: 'Wick and Strip Winding Spinning Wheel',
    slug: 'wick-and-strip-winding-spinning-wheel',
    brand: 'PROWHITE',
    category_id: 25,
    category_name: 'Yarn Tester',
    price: 45220,
    old_price: 50000,
    discount: 10,
    stock: 5,
    views: 290,
    rating: 4.8,
    sku: 'PW-SPIN-01',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Precision motorized winding wheel designed for continuous ribbon, wick, and fabric strip laboratory preparation.</p>'
  },
  {
    id: 100248,
    name: 'DF-H30S 3 ton Diesel Forklift with Japanese or Chinese Engine for outdoor use',
    slug: 'df-h30s-3-ton-diesel-forklift-with-japanese-or-chinese-engine-for-outdoor-use20ton-35ton-available-',
    brand: 'JUKI',
    category_id: 55,
    category_name: 'Material Handling Equipment',
    price: 852000,
    old_price: 950000,
    discount: 10,
    stock: 5,
    views: 1250,
    rating: 4.9,
    sku: 'JUK-DF-H30S',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Heavy industrial 3-ton capacity diesel forklift equipped with dual mast, auto side-shift, and reinforced hydraulic steering.</p>'
  },
  {
    id: 100105,
    name: 'Strength Testing Machine – 3000N',
    slug: 'strength-testing-machine--3000n',
    brand: 'PROWHITE',
    category_id: 14,
    category_name: 'Strength Testing Equipment',
    price: 60000,
    old_price: 68000,
    discount: 12,
    stock: 5,
    views: 890,
    rating: 4.8,
    sku: 'PW-STM-3000N',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>High-resolution universal tensile and elongation testing instrument with load cell precision of ±0.2%.</p>'
  },
  {
    id: 100110,
    name: 'Gyrowash Washing and Dry Cleaning Fastness Testing Device',
    slug: 'gyrowash-washing-and-dry-cleaning-fastness-testing-device',
    brand: 'PROWHITE',
    category_id: 23,
    category_name: 'Yarn Tester',
    price: 56224,
    old_price: 62000,
    discount: 10,
    stock: 5,
    views: 650,
    rating: 4.8,
    sku: 'PW-GYRO-01',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Fully compliant with ISO 105 and AATCC washing fastness assessment test routines with programmable temperature controller.</p>'
  },
  {
    id: 100111,
    name: 'IR Painting Machine',
    slug: 'ir-painting-machine',
    brand: 'PROWHITE',
    category_id: 23,
    category_name: 'Yarn Tester',
    price: 5000,
    old_price: 5500,
    discount: 9,
    stock: 5,
    views: 380,
    rating: 4.5,
    sku: 'PW-IR-01',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Infrared beaker laboratory dyeing machine offering uniform temperature distribution and precision micro-processor control.</p>'
  },
  {
    id: 100112,
    name: 'Crachmeter- Friction Resistance Testing Device',
    slug: 'crachmeter--friction-resistance-testing-device',
    brand: 'PROWHITE',
    category_id: 23,
    category_name: 'Yarn Tester',
    price: 65000,
    old_price: 72000,
    discount: 10,
    stock: 5,
    views: 490,
    rating: 4.7,
    sku: 'PW-CRACH-01',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Standard electronic crockmeter for measuring rubbing fastness of woven, knitted, and dyed textile surfaces.</p>'
  },

  // Fragrances & Cosmetics from mock catalog
  {
    id: 108565,
    name: "Victoria's Secret Very Sexy Eau De Parfum Spray 100ml",
    slug: 'victorias-secret-very-sexy-eau-de-parfum-100ml',
    brand: "Victoria's Secret",
    category_id: 102,
    category_name: 'Health & Beauty',
    price: 3960,
    old_price: 4500,
    discount: 12,
    stock: 14,
    views: 8900,
    rating: 4.9,
    reviews_count: 85,
    sku: 'VS-VS-100ML',
    image: '/assets/images/product_perfume_very_sexy_1792385519859.jpg',
    description: '<p>Sensual notes of vanilla orchid, sun-drenched clementine, and midnight blackberry. Imported in sealed factory cellophane with batch authenticity verified.</p>'
  },
  {
    id: 108566,
    name: 'Botanical Foaming Cleanser 150ml with Pure Tea Tree Oil',
    slug: 'botanical-foaming-cleanser-150ml',
    brand: 'Origins',
    category_id: 102,
    category_name: 'Health & Beauty',
    price: 1850,
    old_price: 2100,
    discount: 12,
    stock: 28,
    views: 3120,
    rating: 4.8,
    reviews_count: 24,
    sku: 'ORG-FC-150',
    image: '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg',
    description: '<p>Gentle sulfate-free lather removes sunscreen, foundation, and sebum without disrupting the skin acid mantle.</p>'
  }
];

// Postman Shipping Methods
export const MOCK_SHIPPING_METHODS: ShippingMethod[] = [
  { id: 1, method_name: 'RedX', method_logo: 'images/RedX-1612945489.png', status: 1 },
  { id: 2, method_name: 'Pathao', method_logo: 'images/Pathao-1612948484.png', status: 1 },
  { id: 3, method_name: 'eCourier', method_logo: 'images/eCourier-1612948537.png', status: 1 },
  { id: 4, method_name: 'Sundarban Courier', method_logo: 'images/Sundarban-Courier-1612948594.png', status: 1 },
  { id: 5, method_name: 'S.A Paribahan', method_logo: 'images/S.A-Paribahan-1612948629', status: 1 },
  { id: 6, method_name: 'DHL', method_logo: 'images/DHL-1612949010.png', status: 1 },
  { id: 7, method_name: 'REMOVE CHARGE', method_logo: null, status: 1 }
];

// Postman Shipping Locations
export const MOCK_SHIPPING_LOCATIONS: ShippingLocation[] = [
  {
    id: 14,
    location: 'Dhaka (Inside City)',
    city: 'Dhaka',
    status: 1,
    cost_times: [{ id: 14, method_id: 1, location_id: 14, cost: 60, estimate_time: '24-48 Hours' }]
  },
  {
    id: 15,
    location: 'Dhaka (Outside City)',
    city: 'Dhaka',
    status: 1,
    cost_times: [{ id: 15, method_id: 1, location_id: 15, cost: 120, estimate_time: '2-3 Days' }]
  },
  {
    id: 1,
    location: 'Bagerhat',
    city: 'Khulna',
    status: 1,
    cost_times: [{ id: 1, method_id: 1, location_id: 1, cost: 130, estimate_time: '2-4 Days' }]
  },
  {
    id: 10,
    location: 'Chattogram',
    city: 'Chattagram',
    status: 1,
    cost_times: [{ id: 10, method_id: 1, location_id: 10, cost: 120, estimate_time: '2-3 Days' }]
  },
  {
    id: 4,
    location: 'Barisal',
    city: 'Barisal',
    status: 1,
    cost_times: [{ id: 4, method_id: 1, location_id: 4, cost: 130, estimate_time: '2-4 Days' }]
  },
  {
    id: 20,
    location: 'Gazipur',
    city: 'Dhaka',
    status: 1,
    cost_times: [{ id: 20, method_id: 1, location_id: 20, cost: 100, estimate_time: '24-48 Hours' }]
  },
  {
    id: 6,
    location: 'Bogura',
    city: 'Rajshahi',
    status: 1,
    cost_times: [{ id: 6, method_id: 1, location_id: 6, cost: 130, estimate_time: '2-4 Days' }]
  },
  {
    id: 13,
    location: 'Coxsbazar',
    city: 'Chattagram',
    status: 1,
    cost_times: [{ id: 13, method_id: 1, location_id: 13, cost: 140, estimate_time: '3-4 Days' }]
  }
];

// Postman Payment Methods
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 2,
    name: 'Cash On Delivery',
    handler: null,
    status: 1,
    additional: '<p><span style="color: #666; font-size: 13px;">Please pay Delivery Charge Tk.150 by bKash/Rocket/Nagad Account @ </span><strong style="color: #BA2D1D;">01894084242</strong><span style="color: #666;"> (Personal) if you are ordering outside of Dhaka. Thanks!</span></p>'
  },
  {
    id: 3,
    name: 'bKash',
    handler: 'BkashPaymentHandler',
    status: 1,
    additional: '<p><span style="color: #BA2D1D; font-weight: bold; font-size: 13px;">bKash 01894084242 (Personal)</span> — Please send money and submit your bKash Transaction ID (TrxID) below.</p>'
  },
  {
    id: 4,
    name: 'Rocket',
    handler: null,
    status: 1,
    additional: '<p><span style="color: #8E44AD; font-weight: bold; font-size: 13px;">Rocket 01894084242 (Personal)</span> — Send money and provide your 12-digit transaction number.</p>'
  },
  {
    id: 11,
    name: 'Nagad',
    handler: null,
    status: 1,
    additional: '<p><span style="color: #D35400; font-weight: bold; font-size: 13px;">Nagad 01894084242 (Personal)</span> — Send money and enter your 8-digit Nagad reference code.</p>'
  }
];

// Postman Campaigns
export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: 'Flash Sales',
    slug: 'flash-sales',
    discount: 10,
    start_from: '2026-10-18 18:49:28',
    ends_in: '2026-10-31 23:59:59',
    items: [
      { id: 1, campaign_id: 1, category_id: 13 },
      { id: 2, campaign_id: 1, category_id: 23 }
    ]
  }
];

// Postman Reviews
export const MOCK_REVIEWS: ProductReview[] = [
  {
    id: 1,
    user_id: 1,
    user_name: 'Jahid Limon',
    product_id: 10,
    review: 'High precision calibration and robust build. The automatic untwist-retwist feature provides 100% reproducible laboratory results.',
    rating: 4.8,
    status: 1,
    created_at: '2026-10-14 11:28:10'
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Farhana Ahmed',
    product_id: 108567,
    review: 'Subtle peeling experience, removes dead cells and leaves instant radiance. My skin felt silky smooth!',
    rating: 5.0,
    status: 1,
    created_at: '2026-10-15 14:10:00'
  },
  {
    id: 3,
    user_id: 3,
    user_name: 'Tanvir Hossain',
    product_id: 2001,
    review: 'Genuine batch with sealed packaging. Delivery was within 24 hours in Dhaka.',
    rating: 4.9,
    status: 1,
    created_at: '2026-10-16 09:30:00'
  }
];

// Postman Questions
export const MOCK_QUESTIONS: ProductQuestion[] = [
  {
    id: 1,
    product_id: 10,
    question: 'Does this model include the optional integrated thermal printer?',
    answer: 'Yes! The optional model with integrated micro-printer is available upon request with computer connectivity.',
    status: 1,
    created_at: '2026-10-14 11:18:33'
  },
  {
    id: 2,
    product_id: 108567,
    question: 'Is this suitable for acne prone or sensitive skin types?',
    answer: 'Yes, it is formulated with gentle botanical extracts and is 100% hypoallergenic and paraben-free.',
    status: 1,
    created_at: '2026-10-15 16:45:10'
  }
];

export const MOCK_FILTER_OBJECTS: FilterObjects = {
  brands: {
    '1': 'Calpol',
    '2': 'Apex Time',
    '3': 'Bronson',
    '4': 'Webber Naturals',
    '5': 'Micro Ingredients',
    '6': 'Nutravita',
    '7': 'Applied Nutrition',
    '8': 'New Leaf',
    '9': 'Anytester',
    '10': 'PROWHITE',
    '11': 'JOCKY',
    '12': 'JUKI'
  },
  min_price: 500,
  max_price: 900000,
  available_sizes: ['50ml', '70g', '100ml', '60 Caps', '120 Caps', '180 Veggie', '360 Softgels'],
  available_colors: ['White', 'Red', 'Gold', 'Amber', 'Natural']
};
