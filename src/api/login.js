import instance from "../https";

// 谁最懂我相关

// 列表
export function getLogin(query) {
  return instance({
    url: "/dd-web/web/hdpark/login",
    method: "get",
    params: query
  });
}
