const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYwMjQ4ZTYyMDVkYzA4YTAyNGRiOTNhMWMyZmUzNiIsIm5iZiI6MTczNjI5NjU2NC4yMDk5OTk4LCJzdWIiOiI2NzdkYzg3NDA0NGI2Y2E2NzY0ZTRkOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s-M0-iIwNQyL3k8gfnll33ZQR8p30YYUQG_kHUZlVbI';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko&page=1';

// ** 인기 영화 API **
async function fetchMovies() {

  const totalPages = 5;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  try {
    const dataMovies = [];
    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.themoviedb.org/3/movie/popular?language=ko&page=${page}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("네트워크 주소 오류");
      }
      const data = await response.json();

      dataMovies.push(...data.results);
    }

    return dataMovies; // 영화 데이터 반환

  } catch (err) {
    console.error(err)
    alert("API 호출 에러 발생");
  }
}

// ** 검색 영화 API **
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
      return data.results; //검색결과 배열에 담기 => 상세페이지 기능 설정
    }
  } catch (err) {
    console.error(err);
    alert('검색 중 문제가 발생했습니다.');
  }
}

export { fetchMovies, fetchSearchResults };