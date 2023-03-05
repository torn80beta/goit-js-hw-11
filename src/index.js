import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MoreButton from './js/more-button';
// const API_KEY = '34120463-e7776ce011157a1f3e137c765';
// const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  formEl: document.querySelector('.search-form'),
  buttonEl: document.querySelector('.button'),
  galleryEl: document.querySelector('.gallery'),
};

const notiflixParams = {
  position: 'center-top',
  distance: '60px',
};
const loadMoreButton = new MoreButton();

refs.formEl.addEventListener('submit', onFormSubmit);
// loadMoreButton.addEventListener('click', onLoadMore);

class UrlCreator {
  constructor() {
    this.page = 1;
    this.refs = this.getRefs();
    this.searchQuery = this.getQuery();
    this.API_KEY = '34120463-e7776ce011157a1f3e137c765';
    this.BASE_URL = 'https://pixabay.com/api/';
  }

  getRefs() {
    const refs = {};
    refs.searchForm = document.querySelector('.search-form');
    return refs;
  }

  getUrl() {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=10&page=${this.page}`;
    return url;
  }

  getQuery() {
    const searchQuery = this.refs.searchForm.searchQuery.value;
    return searchQuery;
  }
}

// function getUrl() {
//   let page = 1;
//   const searchQuery = refs.formEl.searchQuery.value;
//   const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=10&page=${page}`;
//   return url;
// }

// function onLoadMore() {
//   console.log(searchQuery);
// }

// const searchParams = {
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
// };
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
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          notiflixParams
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
  //console.log(markup);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function onFormSubmit(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';
  loadMoreButton.show();
  const url = new UrlCreator().getUrl();
  fetchUrl(url).then(data => {
    drawCards(data);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 20,
      behavior: 'smooth',
    });
  });
}
