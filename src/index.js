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
  galleryEl: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

//const searchQuery = 'sea';

//&safesearch=true

async function fetchUrl(targetUrl) {
  let data;
  await fetch(targetUrl)
    .then(response => response.json())
    .then(response => {
      //console.log(response);
      data = [...response.hits];

      return data;
    })
    .then(response => {
      if (response.length === 0) {
        console.log(
          response,
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
  //console.log(data);
  return data;
}

function drawCards(data) {
  const markup = data
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments :${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads: ${downloads}</b>
                </p>
            </div>
        </div>`
    )
    .join('');
  console.log(markup);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function onFormSubmit(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.searchQuery.value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal`;
  fetchUrl(url).then(data => {
    drawCards(data);
  });
}
