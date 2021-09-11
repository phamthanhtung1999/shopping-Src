import axiosClient from "./axiosClient";

const productApi = {

  async getAll(params) {
    // Transform _page to _start
    const newParams = { ...params };
    // newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 10);
    // remove un-needed key
    // fetch product list + count
    const url = '/products';
    const productList = await axiosClient.get(url, { params: newParams });
    // const count = await axiosClient.get(`${url}/count`, { params: newParams });

    return {
      data: productList,
      pagination: {
        page: params.page,
        limit: params.limit,
      }
    }
  },

  async get(slug) {
    const url = `/products/${slug}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default productApi;