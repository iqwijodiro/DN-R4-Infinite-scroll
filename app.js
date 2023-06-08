const photosContainer = document.getElementById('photos-container');
const loading = document.querySelector('.loader');

// Fetch posts from API
async function getPhotos() {
  const url = 'https://api.thecatapi.com/v1/images/search?limit=50';

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.log(error)
  }

}

// Muestra fotos en el dom
async function showPhotos() {
  const photos = await getPhotos();
  // console.log(photos)

  photos.forEach(photo => {
    const photoEl = document.createElement('div');
    photoEl.classList.add('photo');
    photoEl.innerHTML = `
      <div class="photos-info">
        <img src="${photo.url}" loading="lazy" class="photos-img" alt="cute cat">
      </div>
    `;

    photosContainer.appendChild(photoEl);
  });
}

// muestra el loade mientras carga mas fotos
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      // page++;
      showPhotos();
    }, 300);
  }, 4000);
}

// Show initial posts
showPhotos();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
    // showPhotos();
  }
});

