const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYwMjQ4ZTYyMDVkYzA4YTAyNGRiOTNhMWMyZmUzNiIsIm5iZiI6MTczNjI5NjU2NC4yMDk5OTk4LCJzdWIiOiI2NzdkYzg3NDA0NGI2Y2E2NzY0ZTRkOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s-M0-iIwNQyL3k8gfnll33ZQR8p30YYUQG_kHUZlVbI';

const movieList = document.querySelector('.movie-list'); //영화카드영역
const movieModal = document.querySelector('.movie-modal') //모달
const searchInput = document.querySelector('#searchInput'); //검색
const slider = document.querySelector('.slider'); // 슬라이더 사용
let movies = []; //영화데이터저장

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};


// ** 데이터 가져오기 **
function fetchMovies() {

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

// ** 영화 정보 노출 **
function renderMovies(movieData) {
  movieData = movies;
  movieData.forEach((e, index) => {
    const title = e['title']
    const vote_average = e['vote_average']
    const poster_path = e['poster_path']
    const id = e['id']; //클릭때 활용할 부분
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
searchInput.addEventListener('input', (e) => {

  const searchTerm = e.target.value.toLowerCase().trim(); //인풋창에 입력한 값
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm) // 대소문자 구분 없이 검색
  );

  if (filteredMovies.length === 0) { //결과가 없으면 메세지 출력
    movieList.innerHTML = `<p>검색된 결과가 없습니다.</p>`;
  } else {
    movieList.innerHTML = ''; //초기화
    renderMovies(filteredMovies);
  }
})

// ** 모달표시 **
function openModal(e) {

}

// ** 모달닫기 **
function closeModal(e) {

}

function renderMoviesDetail(movie) {
  const detail_Html = `
    <div>테스트</div>
  `;
  document.querySelector(".modal-content").innerHTML = detail_Html;
}

// 클릭 이벤트
movieList.addEventListener("click", function (e) {
  openModal(e);
});

fetchMovies();
