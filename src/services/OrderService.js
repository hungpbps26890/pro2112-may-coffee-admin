import axios from "./customized-axios";

export const fetchAllOrders = () => axios.get("/api/orders");

export const fetchGetOrderById = (id) => axios.get(`/api/orders/${id}`);

export const postCreateOrder = (data) => axios.post("/api/orders", data);

export const putUpdateOrder = (id, data) =>
  axios.put(`/api/orders/${id}`, data);

export const deleteOrderById = (id) =>
  axios.delete(`/api/orders/delete/${id}`);
