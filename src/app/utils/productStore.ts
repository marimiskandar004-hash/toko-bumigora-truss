import { PRODUCTS, type Product } from "../data/products";

const CUSTOM_KEY = "custom_products_v1";
const REVIEWS_KEY_PREFIX = "product_reviews_v1_";

export function getCustomProducts(): Product[] {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Product[];
  } catch (e) {
    return [];
  }
}

export function saveCustomProducts(list: Product[]) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}

export function addCustomProduct(p: Product) {
  const list = getCustomProducts();
  list.push(p);
  saveCustomProducts(list);
}

export function getAllProducts(): Product[] {
  return [...PRODUCTS, ...getCustomProducts()];
}

export function getProductById(id: number): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export type Review = { name: string; rating: number; text: string; createdAt: string };

export function getReviews(productId: number): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY_PREFIX + productId);
    if (!raw) return [];
    return JSON.parse(raw) as Review[];
  } catch (e) {
    return [];
  }
}

export function saveReview(productId: number, review: Review) {
  const list = getReviews(productId);
  list.unshift(review);
  localStorage.setItem(REVIEWS_KEY_PREFIX + productId, JSON.stringify(list));
}
