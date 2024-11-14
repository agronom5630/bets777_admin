import axios from '../axiosInstance';

export const fetchAdmins = async (page = 1, pageSize = 6) => {
  const response = await axios.get(`/admin/list`, {
    params: { page, limit: pageSize },
  });

  return response.data;
};