// modal.js

import { addBookmark, getBookmarks, removeBookmark } from './bookmark.js';

// ** 모달 열기 **
export function openModal(e, movies, movieModal) {
  const movieTarget = e.target.closest('.movie-item'); // 클릭된 영화 카드
  if (movieTarget) {
    const movieId = movieTarget.getAttribute('id'); // 영화 카드의 id 가져오기
    const matchedMovie = movies.find((movie) => movie.id == movieId); // id로 영화 데이터 찾기

    if (matchedMovie) {
      renderMoviesDetail(matchedMovie, movieModal); // 모달에 영화 정보 렌더링
      movieModal.classList.add('active'); // 모달 표시
    }
  }
}

// ** 모달 닫기 **
export function closeModal(movieModal) {
  movieModal.classList.remove('active');
}

// ** 모달 상세 정보 렌더링 **
function renderMoviesDetail(movie, movieModal) {
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
  movieModal.querySelector('.modal-content').innerHTML = detailHtml;

  // 닫기 버튼 클릭 이벤트
  movieModal.querySelector('.modal-close').addEventListener('click', () => closeModal(movieModal));

  // 북마크 추가/삭제 클릭 이벤트
  const bookmarkBtn = movieModal.querySelector('.bookmarkbtn');
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
