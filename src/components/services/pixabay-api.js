const API_KEY = '24021062-33a986e16cffce2cd7c29eb8f'

function fetchPixabayPicture(nextName, page = 1) {
  return fetch(`https://pixabay.com/api/?q=${nextName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
         .then(response => response.json())
}


const api = { fetchPixabayPicture }

export default api