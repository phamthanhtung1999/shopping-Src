import axiosClient from "./axiosClient";

const orderApi = {
  async getAll(params) {
    const url = '/orders';
    const res = await axiosClient.get(url, params);
    return res.data
  },
  async getOne(orderId) {
    const url = `/orders/${orderId}`;
    const res = await axiosClient.get(url);
    return res
  },
  async add(details) {
    const url = '/orders';
    return axiosClient.post(url, { "details": details });
  },
}
export default orderApi;