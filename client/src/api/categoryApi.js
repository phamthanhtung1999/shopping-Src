import axiosClient from "./axiosClient";


const categoriesApi = {

  getAll(params) {
    const url = '/categories';
    return axiosClient.get(url, params);
  },

  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/categories/${id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoriesApi;