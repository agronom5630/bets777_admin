import axios from '@/app/axiosInstance';
import { Player } from '@/app/types/playerTypes'; 

interface SearchPlayersResponse {
  players: Player[];
  totalPages: number;
}

export const searchPlayers = async (
  search: string,
  page: number,
  pageSize: number
): Promise<SearchPlayersResponse> => {
  try {
    const response = await axios.get('/players/search', {
      params: {
        search,
        page,
        pageSize,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Error searching players:', error);
    throw error;
  }
};