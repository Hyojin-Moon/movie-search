const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYwMjQ4ZTYyMDVkYzA4YTAyNGRiOTNhMWMyZmUzNiIsIm5iZiI6MTczNjI5NjU2NC4yMDk5OTk4LCJzdWIiOiI2NzdkYzg3NDA0NGI2Y2E2NzY0ZTRkOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s-M0-iIwNQyL3k8gfnll33ZQR8p30YYUQG_kHUZlVbI';

const movieList = document.querySelector('.movie-list'); //영화카드영역
const movieModal = document.querySelector('.movie-modal'); //모달
const searchInput = document.querySelector('#searchInput'); //검색
const slider = document.querySelector('.slider'); // 슬라이더 사용

let movies = []; //영화데이터저장

// ** 영화 데이터 가져오기 **
function fetchMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };
  fetch(API_URL, options)
    .then(res => {
      console.log(res.status)
      if (!res.ok) {
        throw new Error("네트워크 주소가 ok아님"); //잘못된 주소가 오면 에러처리
      }
      return res.json()
    })

    .then(data => {
      console.log(data);
      movies = data['results'];
      renderMovies(movies)
    })

    .catch((err) => {
      console.error(err)
      alert("API 호출 에러 발생");
    });
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


// ** 검색 기능 ** // 디바운싱 처리 하기
searchInput.addEventListener('input', (e) => {

  const searchResult = e.target.value.toLowerCase().trim(); //인풋창에 입력한 값 공백제거 해주기
  const filteredMovies = movies.filter(movie =>   //movies가 전역데이터
    movie.title.toLowerCase().includes(searchResult) // 대소문자 구분 없이 검색
  );

  if (filteredMovies.length === 0) { //결과가 없으면 메세지 출력
    movieList.innerHTML = `<p>검색된 결과가 없습니다.</p>`;
  } else {
    renderMovies(filteredMovies);
  }
})


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
  const { title, poster_path, release_date, vote_average } = movie; //구조분해할당

  const detailHtml = `
    <div class="modal-header">
      <h2>${title}</h2>
      <button class="modal-close">닫기</button>
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
}


// ** 북마크 **
function Bookmark () {

}


// ** 클릭 이벤트 **
movieList.addEventListener('click', function (e) {
  openModal(e);
});


fetchMovies();
