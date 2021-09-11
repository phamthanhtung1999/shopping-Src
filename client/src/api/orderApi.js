import axiosClient from "./axiosClient";

const orderApi = {
  async getAll(params) {
    const url = '/orders';
    const res = await axiosClient.get(url, params);
    return res.data
  },
  async add(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
}
export default orderApi;