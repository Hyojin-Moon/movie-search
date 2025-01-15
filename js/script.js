import { addBookmark, getBookmarks, showBookmarks, removeBookmark } from './bookmark.js';
import { openModal } from './modal.js';

const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYwMjQ4ZTYyMDVkYzA4YTAyNGRiOTNhMWMyZmUzNiIsIm5iZiI6MTczNjI5NjU2NC4yMDk5OTk4LCJzdWIiOiI2NzdkYzg3NDA0NGI2Y2E2NzY0ZTRkOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s-M0-iIwNQyL3k8gfnll33ZQR8p30YYUQG_kHUZlVbI';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko&page=1';

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
async function fetchMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };
  try {
    const response = await fetch(API_URL, options)

    if (!response.ok) {
      throw new Error("네트워크 주소가 ok아님"); //잘못된 주소가 오면 에러처리
    }
    const data = await response.json();
    movies = data['results'];
    originMovies = [...movies];
    renderMovies(movies);
  } catch (err) {
    console.error(err)
    alert("API 호출 에러 발생");
  }
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
    renderMovies(originMovies); // 검색어 없으면 기본 목록 출력
    clearTimeout(debounceTimeout);
    return;
  }

  // 디바운싱 
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchSearchResults(searchResult)
  }, 300);
}



// ** 검색 API 데이터 호출 함수 **
async function fetchSearchResults(query) {
  const url = `${SEARCH_API_URL}&query=${encodeURIComponent(query)}`; //입력값 query를 인코딩하는 메서드
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const response = await fetch(url, options)
    try {
      if (!response.ok) {
        throw new Error('검색 API 호출 실패');
      }
      const data = await response.json();
      if (data.results.length === 0) {
        movieList.innerHTML = `<p>검색된 결과가 없습니다.</p>`;
      } else {
        movies = data.results; //검색결과 배열에 담기 => 상세페이지 기능 설정
        renderMovies(movies); // 검색 결과 렌더링
      }
    } catch (err) {
      console.error(err);
      alert('검색 중 문제가 발생했습니다.');
    }
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
  location.href = '/index.html'
})


fetchMovies();