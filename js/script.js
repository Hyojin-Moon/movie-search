import { addBookmark, getBookmarks, showBookmarks, removeBookmark } from './bookmark.js';

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

// ** 영화 데이터 가져오기 **
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
            <p>평점: ${vote_average}</p>
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



// ** 검색 API 호출 함수 **
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
      const data = response.json();
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

// ** 모달표시 **   1) 클릭된요소확인 2) 클릭된요소 id확인 3) id로 영화데이터확인
function openModal(e) {
  const movieTarget = e.target.closest('.movie-item'); // 클릭된 영화 카드
  if (movieTarget) {
    const movieId = movieTarget.getAttribute('id'); // 영화 카드의 id 가져오기
    const matchedMovie = movies.find((movie) => movie.id == movieId); // id로 영화 데이터 찾기

    if (matchedMovie) {
      renderMoviesDetail(matchedMovie); // 모달에 영화 정보 렌더링
      movieModal.classList.add('active'); // 모달 표시
    }
  }
}


// ** 모달닫기 **
function closeModal() {
  movieModal.classList.remove('active');
}


// ** 모달창에 띄우는 정보 **
function renderMoviesDetail(movie) { // matchMovie가 매개변수로 전달됨
  const { title, poster_path, release_date, vote_average, id } = movie; //구조분해할당

  const isBookMark = getBookmarks().some((item) => item.id === id);
  const bookmarkBtnText = isBookMark ? '찜해제' : '찜하기';
  const detailHtml = `
    <div class="modal-header">
      <h2>${title}</h2>
      <button class="modal-close">닫기</button>
      <button class="bookmarkbtn">${bookmarkBtnText}</button>
    </div>
    <div class="modal-body">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
      <p><strong>개봉일:</strong> ${release_date}</p>
      <p><strong>★</strong> ${vote_average}</p>
    </div>
  `;
  document.querySelector(".modal-content").innerHTML = detailHtml;
  // 닫기 버튼 클릭이벤트
  document.querySelector('.modal-close').addEventListener('click', closeModal);

  // 북마크 추가 클릭이벤트
  const bookmarkBtn = document.querySelector('.bookmarkbtn');
  bookmarkBtn.addEventListener('click', () => {
    if (getBookmarks().some((item) => item.id === id)) {
      removeBookmark(movie.id);
      bookmarkBtn.textContent = '찜하기';
    } else {
      addBookmark(movie);
      bookmarkBtn.textContent = '찜해제';
    }
  });
}


// ** 영화카드클릭(상세모달) 이벤트 **
movieList.addEventListener('click', function (e) {
  openModal(e);
});
// ** 검색이벤트 **
searchInput.addEventListener('input', (e) => {
  searchMovies(e);
})
// ** 북마크클릭 이벤트**
bookMark.addEventListener('click', function (e) {
  showBookmarks(e);
})
// ** 로고클릭 이벤트 **
logo.addEventListener('click', function () {
  location.href = '/index.html'
})


fetchMovies();
