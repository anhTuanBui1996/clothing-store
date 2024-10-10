"use server"

//#region Products
export async function getProducts(): Promise<Response> {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/product`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function getProductById(id: string) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/product/{${id}}`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function createNewProduct(product: Response) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/product`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function updateExistingProduct(product: Response) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/product`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function deleteExistingProduct(id: string) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/product/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  return result.json();
}
//#endregion

//#region Brands
export async function getBrands(): Promise<Response> {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/brand`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function getBrandById(id: string) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/brand/{${id}}`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function createNewBrand(product: Response) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/brand`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function updateExistingBrand(product: Response) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/brand`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function deleteExistingBrand(id: string) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/brand/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  return result.json();
}
//#endregion

//#region Category
export async function getCategories(): Promise<Response> {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/category`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function getCategoryById(id: string) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/category/{${id}}`, {
    method: "GET",
    cache: "no-store",
  });
  return result.json();
}

export async function createNewCategory(product: Response) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/category`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function updateExistingCategory(product: Response) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/category`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify(product),
  });
  return result.json();
}

export async function deleteExistingCategory(id: string) {
  const result = await fetch(`${process.env.MAIN_SERVICE_ORIGIN}/category/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  return result.json();
}
//#endregion