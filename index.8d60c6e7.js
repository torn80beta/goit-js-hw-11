const e={formEl:document.querySelector(".search-form"),buttonEl:document.querySelector(".button"),galleryEl:document.querySelector(".gallery")};e.formEl.addEventListener("submit",(function(n){n.preventDefault();const t=n.currentTarget.searchQuery.value;(async function(e){let n;return await fetch(e).then((e=>e.json())).then((e=>(n=[...e.hits],n))).then((e=>{0===e.length&&console.log(e,"Sorry, there are no images matching your search query. Please try again.")})),n})(`https://pixabay.com/api/?key=34120463-e7776ce011157a1f3e137c765&q=${t}&image_type=photo&orientation=horizontal`).then((n=>{!function(n){const t=n.map((({webformatURL:e,tags:n,likes:t,views:o,comments:a,downloads:s})=>`<div class="photo-card">\n                <img class="image" src="${e}" alt="${n}" loading="lazy" />\n            <div class="info">\n                <p class="info-item">\n                <b>Likes: ${t}</b>\n                </p>\n                <p class="info-item">\n                <b>Views: ${o}</b>\n                </p>\n                <p class="info-item">\n                <b>Comments :${a}</b>\n                </p>\n                <p class="info-item">\n                <b>Downloads: ${s}</b>\n                </p>\n            </div>\n        </div>`)).join("");console.log(t),e.galleryEl.insertAdjacentHTML("beforeend",t)}(n)}))}));
//# sourceMappingURL=index.8d60c6e7.js.map