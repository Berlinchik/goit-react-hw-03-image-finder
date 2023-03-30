import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchData = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=33613361-6d492b1f5bfad6ab1d8f1666b&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
