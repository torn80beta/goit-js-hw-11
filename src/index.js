import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MoreButton from './js/more-button';
import UrlCreator from './js/url-creator';
const loadMoreButton = new MoreButton();
const urlCreator = new UrlCreator();
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};
const notiflixParams = {
  position: 'center-center',
  fontSize: '15px',
};

refs.formEl.addEventListener('submit', onFormSubmit);
loadMoreButton.button.addEventListener('click', onLoadMore);

function onLoadMore() {
  urlCreator.incrementPage();
  fetchUrl(urlCreator.getUrl()).then(data => {
    drawCards(data.hits);
    scroll();
  });
  //console.log(urlCreator.page);
}

async function fetchUrl(targetUrl) {
  let data;
  await fetch(targetUrl)
    .then(response => response.json())
    .then(response => {
      data = response;
      if (response.hits.length === 0) {
        loadMoreButton.hide();
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          notiflixParams
        );
      } else if (urlCreator.page * 40 >= response.totalHits) {
        loadMoreButton.hide();
        return Notify.info(
          "We're sorry, but you've reached the end of search results.",
          notiflixParams
        );
      }
      loadMoreButton.show();
    });
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
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 20,
    behavior: 'smooth',
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  loadMoreButton.hide();
  refs.galleryEl.innerHTML = '';
  urlCreator.clearPageValue();
  fetchUrl(urlCreator.getUrl()).then(response => {
    if (response.totalHits > 40) {
      Notify.success(
        `Hooray! We found ${response.totalHits} images.`,
        notiflixParams
      );
    }
    drawCards(response.hits);
    scroll();
  });
}

// const searchParams = {
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
// };
//&safesearch=true
