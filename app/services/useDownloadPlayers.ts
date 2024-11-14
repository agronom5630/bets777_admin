import axios from '@/app/axiosInstance';

export const useDownloadPlayers = () => {
  const downloadPlayers = async () => {
    try {
      const response = await axios.get('/players/download-players', {
        responseType: 'blob',
      });
      if (response.status === 200) {
        const blob = response.data;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'players.csv';
        link.click();
      } else {
        alert('Failed to download the CSV file.');
      }
    } catch (error) {
      alert('An error occurred while downloading the file.');
      console.error(error);
    }
  };

  return { downloadPlayers };
};