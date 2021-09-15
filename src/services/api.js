import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '22089613-2c269b20f41d8e495fd067b59';
const params = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (imageName, page) => {
  const {
    data: { hits },
  } = await axios.get(`?key=${API_KEY}&q=${imageName}&${params}&page=${page}`);

  return hits;
};
