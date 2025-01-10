const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYwMjQ4ZTYyMDVkYzA4YTAyNGRiOTNhMWMyZmUzNiIsIm5iZiI6MTczNjI5NjU2NC4yMDk5OTk4LCJzdWIiOiI2NzdkYzg3NDA0NGI2Y2E2NzY0ZTRkOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s-M0-iIwNQyL3k8gfnll33ZQR8p30YYUQG_kHUZlVbI';
const API_KEY = 'ebf0248e6205dc08a024db93a1c2fe36';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

let movies = []; //영화데이터저장

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

//화면에 띄워주는 함수
function renderMovies(movieData) {

  const movieList = document.querySelector('.movie-list');
  movieList.innerHTML = ''; //초기화
  const slider = document.querySelector('.slider'); // 슬라이더 사용

  movieData.forEach((e, index) => {
    const title = e['title']
    const vote_average = e['vote_average']
    const poster_path = e['poster_path']
    const id = e['id']; //클릭때 활용할 부분
    const card_html = `
        <div class="movie-item">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"/>
            <h3>${title}</h3>
            <p>평점: ${vote_average}</p>
          </div>
        `;
    movieList.insertAdjacentHTML('beforeend', card_html);
  });
}

//검색기능
const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase(); //인풋창에 입력한 값
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm) // 대소문자 구분 없이 검색
  );
  renderMovies(filteredMovies);
});


fetchMovies();