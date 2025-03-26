/**
 * Exercise 1: Product Catalog (SOLUTION)
 */

// Define a ProductCategory enum
enum ProductCategory {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Books = "Books",
  HomeAndKitchen = "Home & Kitchen",
  Beauty = "Beauty",
  Sports = "Sports"
}

// Define a Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  inStock: boolean;
  description?: string;
  tags: string[];
  rating?: number;
}

// Create an array of products
const products: Product[] = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 99.99,
    category: ProductCategory.Electronics,
    inStock: true,
    description: "Noise-cancelling wireless headphones with 20h battery life",
    tags: ["audio", "wireless", "headphones"],
    rating: 4.5
  },
  {
    id: "p2",
    name: "Graphic T-Shirt",
    price: 24.99,
    category: ProductCategory.Clothing,
    inStock: true,
    tags: ["apparel", "casual", "summer"]
  },
  {
    id: "p3",
    name: "Smart Watch",
    price: 199.99,
    category: ProductCategory.Electronics,
    inStock: false,
    description: "Fitness tracker with heart rate monitoring",
    tags: ["wearable", "fitness", "smartwatch"],
    rating: 4.2
  },
  {
    id: "p4",
    name: "Programming TypeScript",
    price: 39.99,
    category: ProductCategory.Books,
    inStock: true,
    description: "Learn TypeScript from scratch",
    tags: ["programming", "typescript", "beginner"],
    rating: 4.8
  },
  {
    id: "p5",
    name: "Coffee Maker",
    price: 79.99,
    category: ProductCategory.HomeAndKitchen,
    inStock: true,
    tags: ["kitchen", "appliance", "coffee"],
    rating: 4.0
  }
];

// Function to find products by category
function findProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(product => product.category === category);
}

// Function to calculate total inventory value
function calculateTotalInventoryValue(): number {
  return products
    .filter(product => product.inStock)
    .reduce((total, product) => total + product.price, 0);
}

// Function to apply discount to a product
function applyDiscount(product: Product, discountPercentage: number): Product {
  const discountFactor = (100 - discountPercentage) / 100;
  return {
    ...product,
    price: Number((product.price * discountFactor).toFixed(2))
  };
}

// Function to print product summary
function printProductSummary(product: Product): void {
  const { name, price, category, inStock } = product;
  console.log(`Product: ${name} | Price: $${price} | Category: ${category} | In Stock: ${inStock ? 'Yes' : 'No'}`);
}

// Demonstration code
console.log("All products:");
console.log(products);

console.log("\nElectronics products:");
console.log(findProductsByCategory(ProductCategory.Electronics));

console.log("\nTotal inventory value:", calculateTotalInventoryValue());

const sampleProduct = products[0];
console.log("\nOriginal product:");
console.log(sampleProduct);

const discountedProduct = applyDiscount(sampleProduct, 15);
console.log("\nDiscounted product (15% off):");
console.log(discountedProduct);

console.log("\nProduct summaries:");
products.forEach(printProductSummary); 