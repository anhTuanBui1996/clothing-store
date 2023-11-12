import Product from "../entity/productService/Product";

export async function getProducts(): Promise<Product> {
  const result = await fetch(`${process.env.PRODUCT_SERVICE_ORIGIN}/product`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function getProductById(id: string) {
  const result = await fetch(`${process.env.PRODUCT_SERVICE_ORIGIN}/product/{${id}}`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function createNewProduct(product: Product) {
  const result = await fetch(`${process.env.PRODUCT_SERVICE_ORIGIN}/product`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function updateExistingProduct(product: Product) {
  const result = await fetch(`${process.env.PRODUCT_SERVICE_ORIGIN}/product`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function deleteExistingProduct(id: string) {
  const result = await fetch(`${process.env.PRODUCT_SERVICE_ORIGIN}/product/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  return result.json();
}
