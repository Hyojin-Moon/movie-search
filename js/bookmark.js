
const BOOKMARK_KEY = 'bookmarkedMovies';

// ** 북마크 추가 **
export const addBookmark = (movie) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.some((item) => item.id === movie.id)) {
    bookmarks.push(movie);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    alert('북마크에 추가되었습니다!');
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
  
}
