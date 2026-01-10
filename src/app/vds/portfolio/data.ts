// ============================================
// VDS PORTFOLIO DATA - COMPLETE
// ============================================
// Vision Design Studio × VERA AI
// All Residential + Commercial Projects
// ============================================

export interface Hotspot {
  id: string
  position: { x: number; y: number }
  category: string
  title: string
  description: string
  specs: {
    material: string
    origin: string
    style: string
  }
}

export interface Project {
  slug: string
  name: string
  subtitle: string
  category: string
  location: string
  year: string
  description: string
  tags: string[]
  images: string[]
  hotspots: Hotspot[]
}

export const projects: Project[] = [

  // ============================================
  // RESIDENTIAL - RENDERINGS (9)
  // ============================================

  {
    slug: 'cascading-light',
    name: 'Cascading Light',
    subtitle: 'Drama in Every Dimension',
    category: 'Interior Design • Great Room',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A breathtaking double-height living space with a cascading geometric chandelier as its crown jewel.',
    tags: ['Double Height', 'Rendering', 'Statement Chandelier', 'Modern Grandeur'],
    images: ['/portfolio/residential-render-4.webp'],
    hotspots: [
      {
        id: 'cascading-chandelier',
        position: { x: 45, y: 25 },
        category: 'Lighting',
        title: 'Golden Cascade',
        description: 'A stunning cascading chandelier of geometric gold forms descends through the double-height space.',
        specs: { material: 'Brushed Gold & LED', origin: 'Designer Commission', style: 'Sculptural Modern' }
      },
      {
        id: 'stone-fireplace',
        position: { x: 60, y: 50 },
        category: 'Architecture',
        title: 'Stone Anchor',
        description: 'A floor-to-ceiling stone fireplace surround grounds the soaring space.',
        specs: { material: 'Limestone', origin: 'Natural Stone', style: 'Modern Organic' }
      },
      {
        id: 'curved-sectional',
        position: { x: 40, y: 70 },
        category: 'Seating',
        title: 'Sculptural Comfort',
        description: 'A curved sectional creates an intimate seating area within the grand space.',
        specs: { material: 'Bouclé Upholstery', origin: 'Italian Design', style: 'Organic Modern' }
      }
    ]
  },

  {
    slug: 'marble-grandeur',
    name: 'Marble Grandeur',
    subtitle: 'Modern Opulence Defined',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'An expansive luxury living room rendering with floor-to-ceiling marble, modular white seating, and seamless indoor-outdoor flow.',
    tags: ['Ultra Luxury', 'Rendering', 'Open Concept', 'Marble'],
    images: ['/portfolio/residential-render-1.webp'],
    hotspots: [
      {
        id: 'marble-wall',
        position: { x: 80, y: 40 },
        category: 'Materials',
        title: 'Stone Canvas',
        description: 'A monumental marble feature wall rises from floor to ceiling.',
        specs: { material: 'Bookmatched Marble', origin: 'Rare Stone Selection', style: 'Grand Luxury' }
      },
      {
        id: 'modular-seating',
        position: { x: 50, y: 65 },
        category: 'Seating',
        title: 'Cloud Configuration',
        description: 'An expansive modular seating system in pristine white creates multiple conversation areas.',
        specs: { material: 'Performance Bouclé', origin: 'Italian Design', style: 'Contemporary Luxury' }
      }
    ]
  },

  {
    slug: 'marble-grandeur-ii',
    name: 'Marble Grandeur II',
    subtitle: 'Alternate Perspective',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Alternate angle of the marble living room showcasing the sculptural chandelier and carefully curated furniture arrangement.',
    tags: ['Ultra Luxury', 'Rendering', 'Fireplace', 'Sculptural Lighting'],
    images: ['/portfolio/residential-render-2.webp'],
    hotspots: [
      {
        id: 'chandelier-detail',
        position: { x: 35, y: 25 },
        category: 'Lighting',
        title: 'Artistic Illumination',
        description: 'From this angle, the chandelier\'s sculptural complexity becomes apparent.',
        specs: { material: 'Blackened Steel & LED', origin: 'Artisan Made', style: 'Contemporary Art' }
      }
    ]
  },

  {
    slug: 'garden-view-living',
    name: 'Garden View Living',
    subtitle: 'Nature as Neighbor',
    category: 'Interior Design • Living & Dining',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A light-filled contemporary space with floor-to-ceiling windows framing lush greenery.',
    tags: ['Indoor-Outdoor', 'Rendering', 'Nature Connection', 'Contemporary'],
    images: ['/portfolio/residential-render-3.webp'],
    hotspots: [
      {
        id: 'window-wall',
        position: { x: 25, y: 40 },
        category: 'Architecture',
        title: 'Living Frame',
        description: 'Floor-to-ceiling windows transform the garden into living artwork.',
        specs: { material: 'Steel & Glass', origin: 'Custom Glazing', style: 'Indoor-Outdoor' }
      }
    ]
  },

  {
    slug: 'forest-frame',
    name: 'Forest Frame',
    subtitle: 'Living Among the Trees',
    category: 'Interior Design • Living & Dining',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Floor-to-ceiling windows wrap this sophisticated space, framing views of dense greenery.',
    tags: ['Nature Views', 'Rendering', 'Emerald Accents', 'Contemporary'],
    images: ['/portfolio/residential-render-5.webp'],
    hotspots: [
      {
        id: 'green-wall',
        position: { x: 85, y: 45 },
        category: 'Views',
        title: 'Living Backdrop',
        description: 'Dense tropical foliage creates a living green wall beyond the glass.',
        specs: { material: 'Nature', origin: 'Tropical Landscaping', style: 'Biophilic Connection' }
      }
    ]
  },

  {
    slug: 'timber-and-stone',
    name: 'Timber & Stone',
    subtitle: 'Warmth Meets Modern',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Warm wood slat feature wall meets a suspended modern fireplace in this cozy yet contemporary space.',
    tags: ['Warm Modern', 'Rendering', 'Wood Feature', 'Suspended Fireplace'],
    images: ['/portfolio/residential-render-6.webp'],
    hotspots: [
      {
        id: 'wood-slat-wall',
        position: { x: 40, y: 40 },
        category: 'Materials',
        title: 'Vertical Forest',
        description: 'A floor-to-ceiling wood slat feature wall adds warmth and texture.',
        specs: { material: 'Oak Slats', origin: 'Custom Millwork', style: 'Japandi' }
      }
    ]
  },

  {
    slug: 'cascading-light-ii',
    name: 'Cascading Light II',
    subtitle: 'Alternate View',
    category: 'Interior Design • Great Room',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Another perspective of the stunning double-height space showcasing the full impact of the geometric chandelier.',
    tags: ['Double Height', 'Rendering', 'Geometric Lighting', 'Grand Scale'],
    images: ['/portfolio/residential-render-7.webp'],
    hotspots: [
      {
        id: 'chandelier-full',
        position: { x: 45, y: 30 },
        category: 'Lighting',
        title: 'Full Cascade',
        description: 'From this vantage point, the chandelier\'s full descent is visible.',
        specs: { material: 'Brushed Gold', origin: 'Custom Commission', style: 'Sculptural Statement' }
      }
    ]
  },

  {
    slug: 'garden-view-living-ii',
    name: 'Garden View II',
    subtitle: 'Courtyard Connection',
    category: 'Interior Design • Living & Dining',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Alternate view highlighting the courtyard connection and the beautiful interplay of natural light.',
    tags: ['Courtyard', 'Rendering', 'Light-Filled', 'Contemporary'],
    images: ['/portfolio/residential-render-8.webp'],
    hotspots: [
      {
        id: 'courtyard-view',
        position: { x: 20, y: 45 },
        category: 'Architecture',
        title: 'Private Garden',
        description: 'The courtyard provides a private garden oasis visible from multiple interior spaces.',
        specs: { material: 'Glass & Steel', origin: 'Custom Design', style: 'Indoor-Outdoor' }
      }
    ]
  },

  {
    slug: 'the-grand-foyer',
    name: 'The Grand Foyer',
    subtitle: 'A Grand First Impression',
    category: 'Interior Design • Entryway',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A stunning architectural entry featuring dramatic design elements and warm wood accents.',
    tags: ['Contemporary', 'Rendering', 'Architectural', 'Grand Entry'],
    images: ['/portfolio/residential-render-9.webp'],
    hotspots: [
      {
        id: 'entry-feature',
        position: { x: 50, y: 40 },
        category: 'Architecture',
        title: 'Dramatic Entry',
        description: 'Architectural elements create a memorable first impression.',
        specs: { material: 'Custom Design', origin: 'Architect Collaboration', style: 'Contemporary Grand' }
      }
    ]
  },

  // ============================================
  // RESIDENTIAL - REAL PHOTOS (15)
  // ============================================

  {
    slug: 'the-parisian-alcove',
    name: 'The Parisian Alcove',
    subtitle: 'Romance in Every Detail',
    category: 'Interior Design • Bathroom',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A dreamy all-white bathroom sanctuary framed by an elegant archway. Marble surfaces and antique-inspired fixtures create a romantic Parisian escape.',
    tags: ['Romantic', 'All-White', 'Classic Elegance', 'Spa Retreat'],
    images: ['/portfolio/18.webp'],
    hotspots: [
      {
        id: 'archway',
        position: { x: 50, y: 20 },
        category: 'Architecture',
        title: 'Elegant Frame',
        description: 'A graceful archway frames the bathing alcove, creating architectural drama.',
        specs: { material: 'Plaster & Millwork', origin: 'Custom Carpentry', style: 'Classical French' }
      },
      {
        id: 'soaking-tub',
        position: { x: 50, y: 60 },
        category: 'Fixtures',
        title: 'Soaking Sanctuary',
        description: 'A classic freestanding soaking tub invites long, luxurious baths.',
        specs: { material: 'Cast Iron & Enamel', origin: 'Classic Design', style: 'Traditional Luxury' }
      }
    ]
  },

  {
    slug: 'jazz-and-velvet',
    name: 'Jazz & Velvet',
    subtitle: 'Where Music Meets Design',
    category: 'Interior Design • Dining Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A show-stopping Louis Armstrong portrait sets the rhythm for this bold dining space, while sapphire velvet chairs create an atmosphere worthy of a standing ovation.',
    tags: ['Eclectic Glam', 'Art-Centric', 'Bold Color', 'Jazz Inspired'],
    images: ['/portfolio/05.webp'],
    hotspots: [
      {
        id: 'full-staircase',
        position: { x: 85, y: 50 },
        category: 'Architecture',
        title: 'Spiral Drama',
        description: 'The spiral staircase is revealed as a major architectural element.',
        specs: { material: 'Steel & Oak', origin: 'Custom Fabrication', style: 'Sculptural Architecture' }
      },
      {
        id: 'satchmo-context',
        position: { x: 10, y: 40 },
        category: 'Artwork',
        title: 'Jazz Master',
        description: 'The Louis Armstrong portrait\'s scale and impact command the space.',
        specs: { material: 'Acrylic on Canvas', origin: 'Commissioned Art', style: 'Pop Art Portrait' }
      }
    ]
  },

  {
    slug: 'skylight-kitchen',
    name: 'Skylight Kitchen',
    subtitle: 'Cooking Under the Sky',
    category: 'Interior Design • Kitchen',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A modern galley kitchen transformed by dual skylights flooding the space with natural light.',
    tags: ['Modern Kitchen', 'Skylights', 'Blue Accent', 'Clean Lines'],
    images: ['/portfolio/09.webp'],
    hotspots: [
      {
        id: 'skylights',
        position: { x: 50, y: 15 },
        category: 'Architecture',
        title: 'Light From Above',
        description: 'Dual skylights flood this kitchen with natural light.',
        specs: { material: 'Glass & Steel', origin: 'Custom Installation', style: 'Light Architecture' }
      }
    ]
  },

  {
    slug: 'collectors-gallery',
    name: "The Collector's Gallery",
    subtitle: 'Art as Life',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'An art collector\'s dream living space where bold paintings and bronze sculptures create a curated gallery atmosphere.',
    tags: ['Art Collector', 'Eclectic', 'Gallery Living', 'Bold Art'],
    images: ['/portfolio/10.webp'],
    hotspots: [
      {
        id: 'bold-painting',
        position: { x: 55, y: 25 },
        category: 'Artwork',
        title: 'Statement Canvas',
        description: 'A large-scale abstract painting in bold primary colors commands the main wall.',
        specs: { material: 'Oil on Canvas', origin: 'Contemporary Artist', style: 'Bold Abstract' }
      }
    ]
  },

  {
    slug: 'gallery-corridor',
    name: 'Gallery Corridor',
    subtitle: 'The Journey Matters',
    category: 'Interior Design • Hallway',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A dramatic corridor with dark wood floors leading to the living space, lined with art and sculptures.',
    tags: ['Gallery', 'Sculptural', 'Dark Floors', 'Art Display'],
    images: ['/portfolio/11.webp'],
    hotspots: [
      {
        id: 'silhouette-figures',
        position: { x: 50, y: 35 },
        category: 'Sculpture',
        title: 'Human Form',
        description: 'Bronze figures silhouetted against the bright window create a dramatic tableau.',
        specs: { material: 'Bronze', origin: 'Artist Original', style: 'Figurative Art' }
      }
    ]
  },

  {
    slug: 'taupe-comfort',
    name: 'Taupe Comfort',
    subtitle: 'Warmth Without Compromise',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A warm, inviting living room in sophisticated taupe and cream tones.',
    tags: ['Traditional Comfort', 'Warm Neutrals', 'Layered Textures', 'Inviting'],
    images: ['/portfolio/12.webp'],
    hotspots: [
      {
        id: 'taupe-sofa',
        position: { x: 50, y: 55 },
        category: 'Seating',
        title: 'Generous Comfort',
        description: 'An oversized sofa in rich taupe invites lingering conversation.',
        specs: { material: 'Velvet Upholstery', origin: 'Custom Design', style: 'Traditional Comfort' }
      }
    ]
  },

  {
    slug: 'chefs-canvas',
    name: "Chef's Canvas",
    subtitle: 'Where Culinary Dreams Come True',
    category: 'Interior Design • Kitchen',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A professional-grade kitchen with stainless steel appliances and sleek white cabinetry.',
    tags: ['Professional Kitchen', 'Modern Clean', 'Stainless Steel', 'Functional'],
    images: ['/portfolio/13.webp'],
    hotspots: [
      {
        id: 'pro-range',
        position: { x: 45, y: 45 },
        category: 'Appliances',
        title: 'Professional Power',
        description: 'A professional-grade range handles any culinary challenge.',
        specs: { material: 'Stainless Steel', origin: 'Commercial Grade', style: 'Professional Kitchen' }
      }
    ]
  },

  {
    slug: 'stone-and-steel',
    name: 'Stone & Steel',
    subtitle: 'Material Honesty',
    category: 'Interior Design • Kitchen',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'An open-concept kitchen featuring a stacked stone accent wall and seamless flow to dining.',
    tags: ['Open Concept', 'Stone Accent', 'Modern Kitchen', 'Warm Industrial'],
    images: ['/portfolio/14.webp'],
    hotspots: [
      {
        id: 'stone-wall',
        position: { x: 75, y: 40 },
        category: 'Materials',
        title: 'Stacked Stone',
        description: 'A stacked stone accent wall adds natural texture and warmth.',
        specs: { material: 'Natural Stone', origin: 'Quarried Stone', style: 'Organic Modern' }
      }
    ]
  },

  {
    slug: 'monochrome-elegance',
    name: 'Monochrome Elegance',
    subtitle: 'The Power of Black & White',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A sophisticated black and white living room with navy velvet sofa and curated photography.',
    tags: ['Black & White', 'Sophisticated', 'Minimalist Glam', 'Photography Art'],
    images: ['/portfolio/15.webp'],
    hotspots: [
      {
        id: 'navy-sofa',
        position: { x: 45, y: 55 },
        category: 'Seating',
        title: 'Midnight Anchor',
        description: 'A deep navy velvet sofa anchors the monochromatic scheme.',
        specs: { material: 'Velvet Upholstery', origin: 'Custom Design', style: 'Refined Comfort' }
      }
    ]
  },

  {
    slug: 'golden-hour-glamour',
    name: 'Golden Hour Glamour',
    subtitle: 'Hollywood Dreams',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A romantic living room bathed in warm light, featuring iconic furniture and crystal accents.',
    tags: ['Hollywood Regency', 'Romantic', 'Crystal & Lucite', 'Mauve Velvet'],
    images: ['/portfolio/16.webp'],
    hotspots: [
      {
        id: 'barcelona-chair',
        position: { x: 20, y: 55 },
        category: 'Seating',
        title: 'Design Icon',
        description: 'A Barcelona chair adds modernist credentials.',
        specs: { material: 'Leather & Chrome', origin: 'Bauhaus Design', style: 'Modernist Icon' }
      }
    ]
  },

  {
    slug: 'modern-conversation',
    name: 'Modern Conversation',
    subtitle: 'Intimate Dining, Bold Expression',
    category: 'Interior Design • Dining',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'An intimate dining space where contemporary art meets modern minimalism.',
    tags: ['Contemporary', 'Intimate Dining', 'Art-Forward', 'Warm Minimalism'],
    images: ['/portfolio/33.webp'],
    hotspots: [
      {
        id: 'floral-artwork',
        position: { x: 50, y: 30 },
        category: 'Artwork',
        title: 'Botanical Burst',
        description: 'A vibrant abstract floral painting commands the accent wall.',
        specs: { material: 'Mixed Media on Canvas', origin: 'Contemporary Artist', style: 'Abstract Floral' }
      }
    ]
  },

  {
    slug: 'champagne-silk',
    name: 'Champagne & Silk',
    subtitle: 'Refined Elegance for Gatherings',
    category: 'Interior Design • Living Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'Refined elegance in soft champagne and cream tones with symmetrical seating.',
    tags: ['Traditional Elegance', 'Neutral Palette', 'Symmetrical', 'Refined Luxury'],
    images: ['/portfolio/residential-12.webp'],
    hotspots: [
      {
        id: 'silk-chairs',
        position: { x: 35, y: 55 },
        category: 'Seating',
        title: 'Golden Hour Chairs',
        description: 'A pair of champagne silk armchairs anchor the seating arrangement.',
        specs: { material: 'Silk Blend', origin: 'Custom Design', style: 'Traditional Refined' }
      }
    ]
  },

  {
    slug: 'lavender-dusk',
    name: 'Lavender Dusk',
    subtitle: 'Soft Glamour for Memorable Dinners',
    category: 'Interior Design • Dining Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'Soft lavender walls embrace a formal dining space where floral upholstered chairs surround a modern dark wood table.',
    tags: ['Soft Glam', 'Formal Dining', 'Lavender Tones', 'Crystal Accents'],
    images: ['/portfolio/residential-13.webp'],
    hotspots: [
      {
        id: 'floral-chairs',
        position: { x: 50, y: 55 },
        category: 'Seating',
        title: 'Garden Party Seats',
        description: 'Upholstered dining chairs in a soft floral pattern bring romance to the space.',
        specs: { material: 'Printed Linen', origin: 'Custom Upholstery', style: 'Romantic Traditional' }
      }
    ]
  },

  {
    slug: 'composers-loft',
    name: "The Composer's Loft",
    subtitle: 'Where Music Lives',
    category: 'Interior Design • Music Room',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A sophisticated urban space where a gleaming black grand piano takes center stage.',
    tags: ['Modern Classic', 'Music Room', 'Iconic Furniture', 'Urban Sophistication'],
    images: ['/portfolio/residential-15.webp'],
    hotspots: [
      {
        id: 'grand-piano',
        position: { x: 70, y: 50 },
        category: 'Furniture',
        title: 'The Heart of Music',
        description: 'A magnificent black grand piano commands the space.',
        specs: { material: 'Ebony Polish', origin: 'Concert Quality', style: 'Timeless Icon' }
      }
    ]
  },

  {
    slug: 'midnight-retreat',
    name: 'Midnight Retreat',
    subtitle: 'Where Relaxation Meets Refinement',
    category: 'Interior Design • Bathroom',
    location: 'Saint Petersburg, FL',
    year: '2023',
    description: 'A dramatic spa-like bathroom where textured black stone meets pristine white marble.',
    tags: ['Modern Luxe', 'Spa Bathroom', 'High Contrast', 'Textured Stone'],
    images: ['/portfolio/residential-16.webp'],
    hotspots: [
      {
        id: 'black-wall',
        position: { x: 35, y: 40 },
        category: 'Materials',
        title: 'Volcanic Texture',
        description: 'A floor-to-ceiling textured black stone feature wall creates dramatic depth.',
        specs: { material: 'Textured Porcelain', origin: 'Italian Tile', style: 'Modern Drama' }
      }
    ]
  },

  // ============================================
  // COMMERCIAL PROJECTS
  // ============================================

  {
    slug: 'grand-lobby',
    name: 'The Grand Lobby',
    subtitle: 'First Impressions Matter',
    category: 'Interior Design • Lobby',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A stunning commercial lobby featuring dramatic marble, warm wood slat partitions, and strategic lighting.',
    tags: ['Commercial', 'Lobby', 'Marble', 'Architectural'],
    images: ['/portfolio/grand-lobby.webp'],
    hotspots: [
      {
        id: 'marble-feature',
        position: { x: 75, y: 45 },
        category: 'Materials',
        title: 'Marble Drama',
        description: 'Floor-to-ceiling Calacatta marble creates a stunning backdrop.',
        specs: { material: 'Calacatta Marble', origin: 'Italian Quarry', style: 'Luxury Statement' }
      }
    ]
  },

  {
    slug: 'lobby-01',
    name: 'Executive Lobby I',
    subtitle: 'Corporate Elegance',
    category: 'Interior Design • Lobby',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A sophisticated corporate lobby designed to impress clients and inspire employees.',
    tags: ['Commercial', 'Lobby', 'Corporate', 'Professional'],
    images: ['/portfolio/lobby-01.webp'],
    hotspots: [
      {
        id: 'reception',
        position: { x: 50, y: 50 },
        category: 'Furniture',
        title: 'Reception Design',
        description: 'A custom reception desk anchors the welcoming space.',
        specs: { material: 'Custom Millwork', origin: 'Local Craftsman', style: 'Modern Corporate' }
      }
    ]
  },

  {
    slug: 'lobby-01b',
    name: 'Executive Lobby II',
    subtitle: 'Alternate View',
    category: 'Interior Design • Lobby',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Another perspective of the executive lobby showcasing the seating area.',
    tags: ['Commercial', 'Lobby', 'Seating', 'Professional'],
    images: ['/portfolio/lobby-01b.webp'],
    hotspots: []
  },

  {
    slug: 'lobby-02',
    name: 'Modern Reception',
    subtitle: 'Welcome in Style',
    category: 'Interior Design • Lobby',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A contemporary reception area with clean lines and warm materials.',
    tags: ['Commercial', 'Reception', 'Modern', 'Welcoming'],
    images: ['/portfolio/lobby-02.webp'],
    hotspots: []
  },

  {
    slug: 'lobby-04',
    name: 'Corporate Welcome',
    subtitle: 'Professional First Impression',
    category: 'Interior Design • Lobby',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A polished corporate entrance designed for maximum impact.',
    tags: ['Commercial', 'Corporate', 'Lobby', 'Impressive'],
    images: ['/portfolio/lobby-04.webp'],
    hotspots: []
  },

  {
    slug: 'office-04',
    name: 'Executive Suite',
    subtitle: 'Where Decisions Happen',
    category: 'Interior Design • Office',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A refined executive office space balancing prestige with functionality.',
    tags: ['Commercial', 'Office', 'Executive', 'Professional'],
    images: ['/portfolio/office-04.webp'],
    hotspots: [
      {
        id: 'executive-desk',
        position: { x: 50, y: 50 },
        category: 'Furniture',
        title: 'Command Center',
        description: 'A substantial executive desk commands respect.',
        specs: { material: 'Walnut & Leather', origin: 'Custom Design', style: 'Executive Modern' }
      }
    ]
  },

  {
    slug: 'office-05',
    name: 'Modern Workspace',
    subtitle: 'Productivity by Design',
    category: 'Interior Design • Office',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A contemporary workspace designed to inspire creativity and focus.',
    tags: ['Commercial', 'Office', 'Modern', 'Productive'],
    images: ['/portfolio/office-05.webp'],
    hotspots: []
  },

  {
    slug: 'hospitality-01',
    name: 'Boutique Hotel I',
    subtitle: 'Hospitality Refined',
    category: 'Interior Design • Hospitality',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A boutique hotel space designed for memorable guest experiences.',
    tags: ['Commercial', 'Hospitality', 'Hotel', 'Luxury'],
    images: ['/portfolio/hospitality-01.webp'],
    hotspots: []
  },

  {
    slug: 'hospitality-01b',
    name: 'Boutique Hotel II',
    subtitle: 'Guest Experience',
    category: 'Interior Design • Hospitality',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Alternate view showcasing the attention to detail in hospitality design.',
    tags: ['Commercial', 'Hospitality', 'Hotel', 'Detail'],
    images: ['/portfolio/hospitality-01b.webp'],
    hotspots: []
  },

  {
    slug: 'hospitality-02',
    name: 'Resort Lounge',
    subtitle: 'Relaxation Destination',
    category: 'Interior Design • Hospitality',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A resort lounge designed for ultimate relaxation and socializing.',
    tags: ['Commercial', 'Hospitality', 'Resort', 'Lounge'],
    images: ['/portfolio/hospitality-02.webp'],
    hotspots: []
  },

  {
    slug: 'hospitality-12',
    name: 'Hotel Retreat',
    subtitle: 'Escape Within',
    category: 'Interior Design • Hospitality',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A hotel retreat space designed for rejuvenation.',
    tags: ['Commercial', 'Hospitality', 'Hotel', 'Retreat'],
    images: ['/portfolio/hospitality-12.webp'],
    hotspots: []
  },

  {
    slug: 'hospitality-16',
    name: 'Luxury Suite',
    subtitle: 'Five Star Experience',
    category: 'Interior Design • Hospitality',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A luxury hotel suite designed for the discerning traveler.',
    tags: ['Commercial', 'Hospitality', 'Suite', 'Luxury'],
    images: ['/portfolio/hospitality-16.webp'],
    hotspots: []
  },

  {
    slug: 'bedroom-01',
    name: 'Presidential Suite',
    subtitle: 'Ultimate Luxury',
    category: 'Interior Design • Hotel Suite',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A presidential suite bedroom designed for unparalleled comfort.',
    tags: ['Commercial', 'Hotel', 'Suite', 'Presidential'],
    images: ['/portfolio/bedroom-01.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-01',
    name: 'Commercial Space I',
    subtitle: 'Business Ready',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A versatile commercial space designed for modern business needs.',
    tags: ['Commercial', 'Flexible', 'Modern', 'Business'],
    images: ['/portfolio/commercial-01.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-02',
    name: 'Commercial Space II',
    subtitle: 'Professional Environment',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A professional commercial environment designed for success.',
    tags: ['Commercial', 'Professional', 'Modern', 'Business'],
    images: ['/portfolio/commercial-02.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-03',
    name: 'Commercial Space III',
    subtitle: 'Functional Design',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Form meets function in this thoughtfully designed commercial space.',
    tags: ['Commercial', 'Functional', 'Modern', 'Design'],
    images: ['/portfolio/commercial-03.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-04',
    name: 'Commercial Space IV',
    subtitle: 'Innovation Hub',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A commercial space designed to foster innovation and collaboration.',
    tags: ['Commercial', 'Innovation', 'Collaborative', 'Modern'],
    images: ['/portfolio/commercial-04.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-19',
    name: 'Retail Design I',
    subtitle: 'Shopping Experience',
    category: 'Interior Design • Retail',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A retail space designed to enhance the customer experience.',
    tags: ['Commercial', 'Retail', 'Customer Experience', 'Modern'],
    images: ['/portfolio/commercial-19.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-20',
    name: 'Retail Design II',
    subtitle: 'Brand Expression',
    category: 'Interior Design • Retail',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A retail environment that perfectly expresses brand identity.',
    tags: ['Commercial', 'Retail', 'Branding', 'Design'],
    images: ['/portfolio/commercial-20.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-21',
    name: 'Retail Design III',
    subtitle: 'Customer Journey',
    category: 'Interior Design • Retail',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A retail space designed to guide customers through a memorable journey.',
    tags: ['Commercial', 'Retail', 'Journey', 'Experience'],
    images: ['/portfolio/commercial-21.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-22',
    name: 'Retail Design IV',
    subtitle: 'Visual Merchandising',
    category: 'Interior Design • Retail',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Retail design that showcases products at their best.',
    tags: ['Commercial', 'Retail', 'Merchandising', 'Display'],
    images: ['/portfolio/commercial-22.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-23',
    name: 'Retail Design V',
    subtitle: 'Shopping Destination',
    category: 'Interior Design • Retail',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A retail space that becomes a destination in itself.',
    tags: ['Commercial', 'Retail', 'Destination', 'Design'],
    images: ['/portfolio/commercial-23.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset',
    name: 'Modern Commercial',
    subtitle: 'Contemporary Business',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A modern commercial space for contemporary business.',
    tags: ['Commercial', 'Modern', 'Contemporary', 'Business'],
    images: ['/portfolio/commercial-asset.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-1',
    name: 'Corporate Design I',
    subtitle: 'Business Excellence',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Corporate design that reflects business excellence.',
    tags: ['Commercial', 'Corporate', 'Excellence', 'Design'],
    images: ['/portfolio/commercial-asset-1.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-2',
    name: 'Corporate Design II',
    subtitle: 'Professional Space',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A professional commercial environment.',
    tags: ['Commercial', 'Corporate', 'Professional', 'Modern'],
    images: ['/portfolio/commercial-asset-2.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-3',
    name: 'Corporate Design III',
    subtitle: 'Work Environment',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'An inspiring work environment for modern teams.',
    tags: ['Commercial', 'Corporate', 'Workspace', 'Team'],
    images: ['/portfolio/commercial-asset-3.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-4',
    name: 'Corporate Design IV',
    subtitle: 'Office Excellence',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Office design that promotes excellence.',
    tags: ['Commercial', 'Corporate', 'Office', 'Excellence'],
    images: ['/portfolio/commercial-asset-4.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-5',
    name: 'Corporate Design V',
    subtitle: 'Business Space',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A sophisticated business environment.',
    tags: ['Commercial', 'Corporate', 'Business', 'Sophisticated'],
    images: ['/portfolio/commercial-asset-5.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-6',
    name: 'Corporate Design VI',
    subtitle: 'Modern Office',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A modern office designed for productivity.',
    tags: ['Commercial', 'Corporate', 'Modern', 'Productive'],
    images: ['/portfolio/commercial-asset-6.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-7',
    name: 'Corporate Design VII',
    subtitle: 'Executive Environment',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'An executive environment designed for leadership.',
    tags: ['Commercial', 'Corporate', 'Executive', 'Leadership'],
    images: ['/portfolio/commercial-asset-7.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-8',
    name: 'Corporate Design VIII',
    subtitle: 'Business Hub',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'A central hub for business activities.',
    tags: ['Commercial', 'Corporate', 'Hub', 'Business'],
    images: ['/portfolio/commercial-asset-8.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-9',
    name: 'Corporate Design IX',
    subtitle: 'Work Innovation',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Innovative workspace design for modern businesses.',
    tags: ['Commercial', 'Corporate', 'Innovation', 'Workspace'],
    images: ['/portfolio/commercial-asset-9.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-10',
    name: 'Corporate Design X',
    subtitle: 'Professional Excellence',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Design that reflects professional excellence.',
    tags: ['Commercial', 'Corporate', 'Professional', 'Excellence'],
    images: ['/portfolio/commercial-asset-10.webp'],
    hotspots: []
  },

  {
    slug: 'commercial-asset-11',
    name: 'Corporate Design XI',
    subtitle: 'Business Forward',
    category: 'Interior Design • Commercial',
    location: 'Saint Petersburg, FL',
    year: '2024',
    description: 'Forward-thinking business environment.',
    tags: ['Commercial', 'Corporate', 'Forward', 'Modern'],
    images: ['/portfolio/commercial-asset-11.webp'],
    hotspots: []
  },

]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}

export function getResidentialProjects(): Project[] {
  return projects.filter(p => !p.tags.includes('Commercial'))
}

export function getCommercialProjects(): Project[] {
  return projects.filter(p => p.tags.includes('Commercial'))
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(p => p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase())))
}

export function getRenderings(): Project[] {
  return projects.filter(p => p.tags.includes('Rendering'))
}

export function getPhotography(): Project[] {
  return projects.filter(p => !p.tags.includes('Rendering') && !p.tags.includes('Commercial'))
}