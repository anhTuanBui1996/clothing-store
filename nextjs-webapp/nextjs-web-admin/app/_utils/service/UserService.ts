import BaseReponse from "../../_dataModels/core/BaseResponse";

export async function getAllMenu(): Promise<BaseReponse> {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/admin/menu/`, {
    method: "GET",
    mode: "no-cors",
    cache: "no-store",
  });
  return await result.json();
}

export async function getMenuById(id: string): Promise<BaseReponse> {
  const result = await fetch(
    `${process.env.USER_SERVICE_ORIGIN}/admin/menu/{${id}}`,
    {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
    }
  );
  return await result.json();
}

export async function createNewMenu(menu: any): Promise<BaseReponse> {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/admin/menu/`, {
    method: "PUT",
    mode: "no-cors",
    cache: "no-store",
    body: JSON.stringify(menu),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  return await result.json();
}

export async function updateExistingMenu(menu: any): Promise<BaseReponse> {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/admin/menu/`, {
    method: "PUT",
    mode: "no-cors",
    cache: "no-store",
    body: JSON.stringify(menu),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  return await result.json();
}

export async function updateAllMenus(menus: any[]): Promise<BaseReponse> {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/menu/`, {
    method: "PUT",
    mode: "no-cors",
    cache: "no-store",
    body: JSON.stringify(menus),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  return await result.json();
}

export async function deleteExistingMenu(id: string): Promise<BaseReponse> {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/menu/${id}`, {
    method: "DELETE",
    mode: "no-cors",
    cache: "no-store",
  });
  return await result.json();
}

export async function deleteAllMenus(ids: string[]): Promise<BaseReponse> {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/menu/`, {
    method: "DELETE",
    mode: "no-cors",
    cache: "no-store",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  return await result.json();
}
