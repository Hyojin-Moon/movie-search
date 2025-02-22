## 1. 프로젝트 파일 구조 설정
  - index.html, styles.css, script.js, api.js 파일을 생성
  - HTML 파일 레이아웃
    - Header
    - Main
    - footer
  - style은 공통으로 해결해보자
  - js는 기능에 맞게 생성
    - script.js(메인)
    - api.js(api)
    - modal.js(클릭시 모달창)
## 2. TMDB API 연결
  - TMDB API에서 API 키 발급
    - 회원가입
    - API 종류 확인해보기
  - fetch API를 사용해 데이터 가져오기
    - token과 key의 차이점 확인하기
    - 우선은 기본 fetch로 코드작성하기 (async/await)는 추후에 리팩토링
  - 콘솔로 가져온 데이터 확인해보기
    - 데이터에서 필요한 값만 변수화하기
    - 
  - 에러처리 적용하기
    - API를 가져오는 과정에서의 에러
    - 가져온 데이터를 로딩하지 못한경우의 에러

## 3. 문제가 생긴 후 새롭게 알게된 부분들
### 1. insertAdjacentHTML
문자열을 HTML로 해석하여 DOM에 삽입하게 된다.
```js
movieList.insertAdjacentHTML('beforeend', html);
```
- 문자열을 HTML로 해석하여 지정된 위치에 삽입.
- 기존 요소를 제거하지 않음.
위치 지정 가능
- 'beforebegin': 요소 이전
- 'afterbegin': 요소 내부의 첫 부분
- 'beforeend': 요소 내부의 마지막 부분
- 'afterend': 요소 이후

### 2. catch() 
프로미스가 거부될 때 호출될 함수를 예약한다. 이 메서드는 즉시 다른 Promise 객체를 반환하여 다른 프로미스 메서드들을 체이닝 할 수 있게 한다.

### 3. 응답 객체 - response
- res.app: 똑같이 res 객체를 통해 app 객체에 접근한다. res.app.get('')같이 사용 가능.
- res.set(헤더, 값) / res.setHeader(헤더, 값): 응답의 헤더를 설정한다. req.get()이 헤더값을 가져오는거라면 이건 헤더 설정
- res.status(코드) / res.sendStatus(코드): 응답 시의 HTTP 상태 코드를 지정한다.
- res.type(type) : Contents-Type 헤더를 설정할 수 있는 간단한 메서드.
- res.cookie(키, 값, 옵션): 쿠키를 응답에 설정하는 메서드이다. (cookie-parser 패키지가 필요)
- res.clearCookie(키, 값, 옵션): 쿠키를 응답에서 제거하는 메서드이다.
- res.end(): 데이터 없이 응답을 보낸다.
- res.json(JSON): JSON 형식의 응답을 보낸다.
- res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보낸다.
- res.locals / res.render(뷰, 데이터): res.locals는 뷰를 렌더링하는 기본 콘텍스트를 포함하는 객체다. res.render는 jade와 같은 템플릿 엔진을 사용하여 뷰를 렌더링한다.
- res.send(body), res.send(status, body) : 클라이언트에 응답을 보냄. 상태 코드는 옵션. 기본 콘텐츠 타입은 text/html이므로 text/plain을 보내려면 res.set(‘Content-Type’, ‘text/plain’)을 먼저 호출 해야한다. 
- res.sendFile(경로): 경로에 위치한 파일을 응답한다.
- res.attachment([filename]), res.download(path, [filename], [callback]) : 클라이언트에게 파일을 표시하지 말고 다운로드 받으라고 전송함. filename을 주면 파일 이름이 명시되며, res.attachment는 헤더만 설정하므로 다운로드를 위한 node 코드가 따로 필요하다.