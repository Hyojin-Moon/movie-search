
const BOOKMARK_KEY = 'bookmarkedMovies';

// ** 북마크 추가 **
export const addBookmark = (movie) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.some((item) => item.id === movie.id)) {
    bookmarks.push(movie);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    alert('찜목록에 추가되었습니다!');
  } else {
    alert('이미 북마크에 추가된 영화입니다.');
  }
};

// ** 북마크 가져오기 **
export const getBookmarks = () => {
  const bookmarks = localStorage.getItem(BOOKMARK_KEY);
  return bookmarks ? JSON.parse(bookmarks) : [];
};

// ** 북마크 된 영화 리스트 **
export const showBookmarks = () => {
  const bookmarkList = getBookmarks();
  const movieList = document.querySelector('.movie-list'); //영화카드영역
  if(bookmarkList) {
    movieList.innerHTML = ''; //초기화
    bookmarkList.forEach((movie) => {
      const { id, title, poster_path, vote_average } = movie;
      const bookmarkHtml = `
        <div class="movie-item" id="${id}">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"/>
            <h3>${title}</h3>
            <p>평점: ${vote_average}</p>
          </div>
      `;
      movieList.insertAdjacentHTML('beforeend', bookmarkHtml);
    });
  } else {
    movieList.innerHTML = `<p>찜한 영화가 없습니다</p>`;
  }
}

// ** 북마크 삭제 **
export const removeBookmark = (movieid) => {
  let bookmarks = getBookmarks();
  bookmarks = bookmarks.filter((item) => item.id !== movieid);
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
  alert('찜해제 되었습니다.');

  showBookmarks(); //
};
