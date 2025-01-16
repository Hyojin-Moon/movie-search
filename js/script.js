import { showBookmarks} from './bookmark.js';
import { openModal } from './modal.js';
import { fetchMovies, fetchSearchResults } from './api.js';

const movieList = document.querySelector('.movie-list'); //영화카드영역
const movieModal = document.querySelector('.movie-modal'); //모달
const searchInput = document.querySelector('#searchInput'); //검색
const bookMark = document.querySelector('#bookmark'); //찜하기
const logo = document.querySelector('.logo'); //로고
const slider = document.querySelector('.slider'); // 슬라이더 사용

let debounceTimeout; // 디바운싱 세팅
let movies = []; //영화데이터저장
let originMovies = []; //초기데이터 저장


// ** 영화 API 데이터 가져오기 **
async function loadMovies() {
  movies = await fetchMovies();
  originMovies = [...movies];
  renderMovies(movies);
}

// ** 영화 데이터 노출 **
function renderMovies(movieData) {

  movieList.innerHTML = ''; //초기화
  movieData.forEach((e, index) => {
    const title = e['title']
    const vote_average = e['vote_average']
    const poster_path = e['poster_path']
    const id = e['id']; //클릭때 활용할 아이디
    const card_html = `
        <div class="movie-item" id="${id}">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"/>
            <h3>${title}</h3>
            <p>⭐ ${vote_average}</p>
          </div>
        `;
    movieList.insertAdjacentHTML('beforeend', card_html);
  });
}


// ** 검색 기능 ** 
function searchMovies(e) {
  const searchResult = e.target.value.toLowerCase().trim(); //인풋창에 입력한 값 공백제거 해주기
  if (!searchResult) {
    movies = [...originMovies];
    renderMovies(movies); // 검색어 없으면 기본 목록 출력
    clearTimeout(debounceTimeout);
    return;
  }

  // 디바운싱 
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchSearchResults(searchResult).then((result) => {
      movies = result;
      renderMovies(movies);
    })
  }, 300);
}




// ** 영화카드클릭(상세모달) 이벤트 **
movieList.addEventListener('click', function (e) {
  openModal(e, movies, movieModal);
});
// ** 검색이벤트 **
searchInput.addEventListener('input', (e) => {
  searchMovies(e);
})
// ** 북마크클릭 이벤트**
bookMark.addEventListener('click', function () {
  showBookmarks();
})
// ** 로고클릭 이벤트 **
logo.addEventListener('click', function () {
  location.href = './index.html'
})


loadMovies();