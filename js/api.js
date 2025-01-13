const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYwMjQ4ZTYyMDVkYzA4YTAyNGRiOTNhMWMyZmUzNiIsIm5iZiI6MTczNjI5NjU2NC4yMDk5OTk4LCJzdWIiOiI2NzdkYzg3NDA0NGI2Y2E2NzY0ZTRkOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s-M0-iIwNQyL3k8gfnll33ZQR8p30YYUQG_kHUZlVbI';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko&page=1';

// ** 인기 영화 데이터 호출 **
export function fetchMovies() {
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

// ** 검색 API 호출 **
export function fetchSearchResults(query) {
  const url = `${SEARCH_API_URL}&query=${encodeURIComponent(query)}`; //입력값 query를 인코딩하는 메서드
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error('검색 API 호출 실패');
      }
      return res.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        movieList.innerHTML = `<p>검색된 결과가 없습니다.</p>`;
      } else {
        movies = data.results; //검색결과 배열에 담기 => 상세페이지 기능 설정
        renderMovies(movies); // 검색 결과 렌더링
      }
    })
    .catch((err) => {
      console.error(err);
      alert('검색 중 문제가 발생했습니다.');
    });
}