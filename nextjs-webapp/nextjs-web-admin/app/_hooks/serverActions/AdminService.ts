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
  const getMenuById = async (id: string) => await findMenuById(token, id);
  const createNewMenu = async (menu: any) => await createMenu(token, menu);
  const updateExistingMenu = async (menu: any) => await updateMenu(token, menu);
  const updateAllMenus = async (menus: any[]) =>
    await updateMenus(token, menus);
  const deleteExistingMenu = async (id: string) => await deleteMenu(token, id);
  const deleteAllMenus = async (ids: string[]) => await deleteMenus(token, ids);

  const getAllRole = async () => await findAllRole(token);
  const getRoleById = async (id: string) => await findRoleById(token, id);
  const createNewRole = async (role: any) => await createRole(token, role);
  const updateExistingRole = async (role: any) => await updateRole(token, role);
  const updateAllRoles = async (roles: any[]) =>
    await updateRoles(token, roles);
  const deleteExistingRole = async (id: string) => await deleteRole(token, id);
  const deleteAllRoles = async (ids: string[]) => await deleteRoles(token, ids);

  const getAllUser = async () => await findAllUser(token);
  const getUserById = async (id: string) => await findUserById(token, id);
  const createNewUser = async (user: any) => await createUser(token, user);
  const updateExistingUser = async (user: any) => await updateUser(token, user);
  const updateAllUsers = async (users: any[]) =>
    await updateUsers(token, users);
  const deleteExistingUser = async (id: string) => await deleteUser(token, id);
  const deleteAllUsers = async (ids: string[]) => await deleteUsers(token, ids);

  const getAllPermission = async () => findAllPermission(token);
  const getPermissionsOfRole = async (id: string) =>
    findPermissionOfRole(token, id);
  const updateAllPermissions = async (permissions: any[]) =>
    updatePermissions(token, permissions);

  return {
    getAllMenu,
    getMenuById,
    createNewMenu,
    updateExistingMenu,
    updateAllMenus,
    deleteExistingMenu,
    deleteAllMenus,

    getAllRole,
    getRoleById,
    createNewRole,
    updateExistingRole,
    updateAllRoles,
    deleteExistingRole,
    deleteAllRoles,

    getAllUser,
    getUserById,
    createNewUser,
    updateExistingUser,
    updateAllUsers,
    deleteExistingUser,
    deleteAllUsers,

    getAllPermission,
    getPermissionsOfRole,
    updateAllPermissions,
  };
}

//#region "Menu"
export async function findAllMenu(token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function findMenuById(token: string, id: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/{${id}}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function createMenu(token: string, menu: any): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(menu),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updateMenu(token: string, menu: any): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/${menu.id}`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(menu),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updateMenus(token: string, menus: any[]): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(menus),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function deleteMenu(token: string, id: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function deleteMenus(token: string, ids: string[]): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/`,
      {
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify(ids),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

//#region "Role"
export async function findAllRole(token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function findRoleById(token: string, id: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/{${id}}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function createRole(token: string, role: any): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(role),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updateRole(token: string, role: any): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/${role.id}`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(role),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updateRoles(token: string, roles: any[]): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(roles),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function deleteRole(token: string, id: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function deleteRoles(token: string, ids: string[]): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/role/`,
      {
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify(ids),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

//#region "Users"
export async function findAllUser(token: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function findUserById(token: string, id?: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/{${id}}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function createUser(token: string, user: any): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(user),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updateUser(token: string, user: any): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/${user.id}`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(user),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updateUsers(token: string, users: any[]): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(users),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function deleteUser(token: string, id: string): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function deleteUsers(token: string, ids: string[]): Promise<any> {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/user/`,
      {
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify(ids),
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

//#region "Permission"

export async function findAllPermission(token: string) {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/permission/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function findPermissionOfRole(token: string, id: string) {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/permission/${id}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}

export async function updatePermissions(token: string, permissions: any[]) {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/permission/`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(permissions),
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

//#region "Product"
export async function findAllProduct(token: string) {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.PRODUCT_SERVICE_ORIGIN}/admin/product/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers,
      }
    );
    return await result.json();
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

export default useAdminService;
