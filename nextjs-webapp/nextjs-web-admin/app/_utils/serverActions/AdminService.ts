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
  const updateAllMenus = async (menus: any[]) =>
    await updateMenus(menus, token);
  const deleteExistingMenu = async (id: string) => await deleteMenu(id, token);
  const deleteAllMenus = async (ids: string[]) => await deleteMenus(ids, token);

  const getAllRole = async () => await findAllRole(token);
  const getRoleById = async (id: string) => await findRoleById(id, token);
  const createNewRole = async (role: any) => await createRole(role, token);
  const updateExistingRole = async (role: any) => await updateRole(role, token);
  const updateAllRoles = async (roles: any[]) =>
    await updateRoles(roles, token);
  const deleteExistingRole = async (id: string) => await deleteRole(id, token);
  const deleteAllRoles = async (ids: string[]) => await deleteRoles(ids, token);

  const getAllUser = async () => await findAllUser(token);
  const getUserById = async (id: string) => await findUserById(id, token);
  const createNewUser = async (user: any) => await createUser(user, token);
  const updateExistingUser = async (user: any) => await updateUser(user, token);
  const updateAllUsers = async (users: any[]) =>
    await updateUsers(users, token);
  const deleteExistingUser = async (id: string) => await deleteUser(id, token);
  const deleteAllUsers = async (ids: string[]) => await deleteUsers(ids, token);

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

export async function findMenuById(id: string, token: string): Promise<any> {
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

export async function createMenu(menu: any, token: string): Promise<any> {
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

export async function updateMenu(menu: any, token: string): Promise<any> {
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

export async function updateMenus(menus: any[], token: string): Promise<any> {
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

export async function deleteMenu(id: string, token: string): Promise<any> {
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

export async function deleteMenus(ids: string[], token: string): Promise<any> {
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

export async function findRoleById(id: string, token: string): Promise<any> {
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

export async function createRole(role: any, token: string): Promise<any> {
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

export async function updateRole(role: any, token: string): Promise<any> {
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

export async function updateRoles(roles: any[], token: string): Promise<any> {
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

export async function deleteRole(id: string, token: string): Promise<any> {
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

export async function deleteRoles(ids: string[], token: string): Promise<any> {
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

export async function findUserById(id: string, token: string): Promise<any> {
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

export async function createUser(user: any, token: string): Promise<any> {
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

export async function updateUser(user: any, token: string): Promise<any> {
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

export async function updateUsers(users: any[], token: string): Promise<any> {
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

export async function deleteUser(id: string, token: string): Promise<any> {
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

export async function deleteUsers(ids: string[], token: string): Promise<any> {
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
export type Permission = {
  roleId: string;
  menuId: string;
  canModified: boolean;
  canView: boolean;
};

export async function getPermissionOfRole(token: string, id?: string) {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/permissions/${id}`,
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

export async function setPermissions(token: string, permissions: Permission[]) {
  try {
    const headers = new Headers(baseHeaders);
    headers.append("Authorization", `Bearer ${token}`);
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/admin/menu/permissions`,
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

export default useAdminService;
