import axios from 'axios';

const getUserAvatar = async (userId: string): Promise<string> => {
  try {
    const { data: profileData } = await axios.get(
      `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_API_TOKEN}/getUserProfilePhotos?user_id=${userId}`
    );

    if (profileData.ok && profileData.result.total_count > 0) {
      const fileId = profileData.result.photos[0][0].file_id;
      const { data: fileData } = await axios.get(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_API_TOKEN}/getFile?file_id=${fileId}`
      );

      if (fileData.ok) {
        const filePath = fileData.result.file_path;
        return `https://api.telegram.org/file/bot${process.env.NEXT_PUBLIC_TELEGRAM_API_TOKEN}/${filePath}`;
      } else {
        throw new Error('Failed to get file URL');
      }
    } else {
      throw new Error('No profile photos found');
    }
  } catch (error: any) {
    throw new Error(error.response ? error.response.data.description : error.message);
  }
};

export default getUserAvatar;