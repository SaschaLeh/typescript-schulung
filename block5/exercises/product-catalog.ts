/**
 * Exercise 1: Product Catalog
 * 
 * In this exercise, you'll create a product catalog system for an online store.
 * Follow the instructions below to complete the implementation.
 */

// TODO: Create a ProductCategory enum with at least 5 different product categories
// e.g., Electronics, Clothing, Books, etc.


// TODO: Define a Product interface with the following properties:
// - id: string
// - name: string
// - price: number
// - category: ProductCategory
// - inStock: boolean
// - description: optional string
// - tags: array of strings
// - rating: optional number (between 1-5)


// TODO: Create an array of at least 5 product objects using your Product interface


// TODO: Implement a function called 'findProductsByCategory' that:
// - Takes a category parameter
// - Returns an array of products that match the given category


// TODO: Implement a function called 'calculateTotalInventoryValue' that:
// - Calculates the total value of all products that are in stock
// - Returns the total value as a number


// TODO: Implement a function called 'applyDiscount' that:
// - Takes a product and a discount percentage
// - Returns a new product object with the discounted price
// - Does not modify the original product object


// TODO: Implement a function called 'printProductSummary' that:
// - Takes a product object 
// - Destructures relevant properties
// - Prints a formatted summary string like: "Product: [name] | Price: $[price] | Category: [category] | In Stock: [yes/no]"


// Demonstration code - uncomment and run to test your implementation
/*
console.log("All products:");
console.log(products);

console.log("\nElectronics products:");
console.log(findProductsByCategory(ProductCategory.Electronics));

console.log("\nTotal inventory value:", calculateTotalInventoryValue());

const product = products[0];
console.log("\nOriginal product:");
console.log(product);

const discountedProduct = applyDiscount(product, 15);
console.log("\nDiscounted product (15% off):");
console.log(discountedProduct);

console.log("\nProduct summaries:");
products.forEach(printProductSummary);
*/ 