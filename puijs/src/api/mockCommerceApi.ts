export interface ProductDto {
  id: string;
  title: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  inStock: boolean;
}

export const MOCK_PRODUCTS: ProductDto[] = [
  {
    id: 'prod-1',
    title: 'Titanium Quantum Neural Accelerator',
    category: 'Hardware',
    price: 4999.0,
    salePrice: 4299.0,
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60',
    description: 'Ultra-high throughput tensor processing unit designed for low-latency inference.',
    inStock: true,
  },
  {
    id: 'prod-2',
    title: 'Foundry Cybernetic Workstation Node',
    category: 'Systems',
    price: 3200.0,
    rating: 4.8,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=60',
    description: 'Enterprise rackmount system preloaded with Phient OS kernel.',
    inStock: true,
  },
  {
    id: 'prod-3',
    title: 'Precision Optical Matrix Sensor',
    category: 'Sensors',
    price: 850.0,
    salePrice: 720.0,
    rating: 4.7,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60',
    description: 'Sub-millimeter LiDAR and multi-spectral imaging array.',
    inStock: true,
  },
  {
    id: 'prod-4',
    title: 'Cryo-Shield Server Chassis',
    category: 'Hardware',
    price: 1450.0,
    rating: 4.6,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60',
    description: 'Liquid submersion cooling frame with redundant telemetry.',
    inStock: true,
  },
];

export class MockCommerceApi {
  static async fetchProducts(category?: string): Promise<ProductDto[]> {
    await new Promise((r) => setTimeout(r, 300));
    if (!category || category === 'All') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  static async fetchProductById(id: string): Promise<ProductDto | null> {
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}
