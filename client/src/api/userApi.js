import axiosClient from "./axiosClient";

const userApi = {
  async register(data) {
    const url = 'users/register';
    // return axiosClient.post(url, data)
    try {
      const res = await axiosClient.post(url, data)
      return res.data
    } catch (error) {
      return { ...error.response.data, error: true }
    }
  },
  async login(data) {
    const url = 'users/login';
    try {
      const res = await axiosClient.post(url, data)
      return res.data
    } catch (error) {
      return { ...error.response.data, error: true }
    }
  },
  async logout(data) {
    const url = 'users/logout';
    return axiosClient.post(url, data)
  },
}
export default userApi