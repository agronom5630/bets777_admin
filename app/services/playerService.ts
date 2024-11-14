import axios from '../axiosInstance';

export const fetchPlayers = async (page = 1, limit = 10) => {
  const response = await axios.get(`/players`, {
    params: { page, limit },
  });
  return response.data;
};


export const fetchAllPlayers = async () => {
  const response = await axios.get(`/players/all`);
  return response.data;
}