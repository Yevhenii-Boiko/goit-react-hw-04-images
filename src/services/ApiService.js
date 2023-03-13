const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33163433-7381312326b7cb4a7310bb1a7';

export const getImages = (searchValue, page) => {
  return fetch(
    `${BASE_URL}?q=${searchValue}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12&`
  );
};
