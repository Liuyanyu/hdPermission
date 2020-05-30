import instance from "../https";
export function getAll(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/aut/getAll",
    method: "post",
    data: query
  });
}
// 添加
export function getadd(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/aut/add",
    method: "post",
    data: query
  });
}
// 删除
export function getDelete(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/aut/del",
    method: "post",
    data: query
  });
}
// 编辑
export function getUpdate(query) {
  return instance({
    url: "/dd-web/web/read/hdpark/user/update",
    method: "post",
    data: query
  });
}