const baseHeaders = new Headers({
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
});

function useAdminService(token?: string) {
  if (token === undefined) throw new Error("Not jwt available at service!");
  const getAllMenu = async () => await findAllMenu(token);
  const getMenuById = async (id: string) => await findMenuById(id, token);
  const createNewMenu = async (menu: any) => await createMenu(menu, token);
  const updateExistingMenu = async (menu: any) => await updateMenu(menu, token);
  const updateAllMenus = async (menus: any[]) => await updateMenus(menus, token);
  const deleteExistingMenu = async (id: string) => await deleteMenu(id, token);
  const deleteAllMenus = async (ids: string[]) => await deleteMenus(ids, token);
  return {
    getAllMenu,
    getMenuById,
    createNewMenu,
    updateExistingMenu,
    updateAllMenus,
    deleteExistingMenu,
    deleteAllMenus,
  };
}

//#region "Menu"
async function findAllMenu(token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

async function findMenuById(id: string, token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/{${id}}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

async function createMenu(menu: any, token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(menu),
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

async function updateMenu(menu: any, token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(menu),
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

async function updateMenus(menus: any[], token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/menu/`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(menus),
      headers,
    });
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

async function deleteMenu(id: string, token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/menu/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

async function deleteMenus(ids: string[], token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/menu/`, {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(ids),
      headers,
    });
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

export default useAdminService;
