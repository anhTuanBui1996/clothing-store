import BaseReponse from "../../_dataModels/core/BaseResponse";

export async function getAllMenu(): Promise<any> {
  try {
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function getMenuById(id: string): Promise<BaseReponse> {
  const result = await fetch(
    `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/{${id}}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  return await result.json();
}

export async function createNewMenu(menu: any): Promise<BaseReponse> {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`, {
    method: "PUT",
    mode: "cors",
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
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`, {
    method: "PUT",
    mode: "cors",
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
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/menu/`, {
    method: "PUT",
    mode: "cors",
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
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/menu/${id}`, {
    method: "DELETE",
    mode: "cors",
  });
  return await result.json();
}

export async function deleteAllMenus(ids: string[]): Promise<BaseReponse> {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/menu/`, {
    method: "DELETE",
    mode: "cors",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  return await result.json();
}
