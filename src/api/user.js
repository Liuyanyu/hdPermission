import instance from "../https";

// 谁最懂我相关

// 列表
export function getUser(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/list",
    method: "get",
    params: query
  });
}
// 用户列表
export function getUser1(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/user/list",
    method: "get",
    params: query
  });
}
// 添加
export function getadd(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/user/add",
    method: "post",
    data: query
  });
}
// 编辑
export function getedit(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/user/update",
    method: "post",
    data: query
  });
}
// 获取角色列表
export function getRole(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/list",
    method: "get",
    params: query
  });
}
// 删除
export function getDelete(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/user/remove",
    method: "post",
    data: query
  });
}