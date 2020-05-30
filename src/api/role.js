import instance from "../https";

// 列表
export function getUser(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/list",
    method: "get",
    params: query
  });
}
// 添加
export function getadd(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/add",
    method: "post",
    data: query
   });
}
// 编辑
export function getedit(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/update",
    method: "post",
    data: query
  });
}
// 获取权限列表
export function getAut(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/aut/getAll",
    method: "post",
    data: query
  });
}
// 删除
export function getDelete(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/del",
    method: "post",
    data: query
  });
}
// 已有权限
export function getAuted(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/getAut",
    method: "post",
    data: query
  });
}
// 给角色授权
export function setAut(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/role/setAut",
    method: "post",
    data: query
  });
 }