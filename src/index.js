const API_KEY = '34120463-e7776ce011157a1f3e137c765';
const BASE_URL = 'https://pixabay.com/api/';
// const searchParams = {
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
// };

const refs = {
  formEl: document.querySelector('.search-form'),
  buttonEl: document.querySelector('.button'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

//const searchQuery = 'sea';

//&safesearch=true

function fetchUrl(targetUrl) {
  return fetch(targetUrl)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .then(response => {
      if (response.hits.length === 0) {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
}

function onFormSubmit(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.searchQuery.value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal`;
  fetchUrl(url);
}
