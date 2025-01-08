
## 프로젝트 목표
- **진짜 영화 정보**를 제공하는 검색 사이트 만들기
- **HTML**, **CSS**, **JavaScript**만으로 API와 소통하며 웹 애플리케이션 만들기
- 영화 팬들을 위한 **멋진 UI**로, 데이터를 시각적으로 표현하기
- 🦸‍♂️ API 마스터: 개발자가 되는 첫 걸음으로 실시간 데이터를 사용하는 법 익히기!

## 개발 프로세스
### 공통
**[ 프로젝트 셋업 ]**

1. **프로젝트 파일 구조 설정**
    - HTML, CSS, JavaScript 파일을 생성하고, 각각의 역할을 분명히 분리하세요.
    - HTML 파일에 기본적인 구조(헤더, 본문, 푸터 등)를 작성하고, CSS와 JS 파일을 연결하세요.
2. **TMDB API 연결**
    - [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)에서 API 키를 발급받고, **`fetch` API**를 사용해 데이터를 가져옵니다.
    - 데이터를 받아오는 코드가 제대로 작동하는지 **콘솔에서 데이터 출력**을 통해 확인하세요.

    
### 필수로드맵
1. **1/8(수) : TMDB API 연동 및 데이터 가져오기**
    - TMDB API에서 **인기 영화 데이터를 가져오는** 작업을 먼저 진행하세요.
    - TMDB의 API 키를 발급받고, **`fetch` API**를 사용하여 데이터를 가져옵니다.
    - 가져온 데이터를 **콘솔에 출력**하여, 데이터가 제대로 받아지는지 확인하세요.
    - **중요 포인트**: 데이터를 잘못 요청하거나 API 키가 잘못되었을 경우 에러 메시지가 발생할 수 있습니다. 콘솔에서 확인하며 API가 정상적으로 동작하는지 체크하세요.
2. **1/9(목) : 영화 카드 리스트 UI 구현**
    - HTML과 CSS를 사용해 **영화 카드** UI를 만듭니다. 영화 카드에는 영화의 **포스터, 제목, 요약, 평점** 정보가 포함됩니다.
    - 이때 CSS로 **카드 레이아웃**을 디자인하고, API에서 받아온 데이터를 카드 형태로 화면에 출력하세요.
    - **중요 포인트**: Flexbox 또는 Grid 레이아웃을 사용해 스타일링을 적용하세요. 최대한 페이지가 브라우저의 크기가 변화해도 자연스럽게 보일 수 있게 해봅시다.
3. **1/10(금) Day 3: 영화 검색 기능 구현**
    - 검색창을 만들고, 사용자가 입력한 키워드에 맞춰 **영화 리스트를 필터링**하세요.
    - **검색 버튼을 클릭**하거나 **Enter 키를 입력**하면 해당 키워드를 포함한 영화들만 리스트에 나타나게 합니다.
    - **중요 포인트**: 대소문자 구분 없이 검색할 수 있게 하세요. 검색창 입력에 따라 실시간으로 영화가 필터링되게 구현합니다.
4. **1/13(월) Day 4: 영화 상세 페이지 구현**
    - 각 영화 카드를 클릭했을 때, 영화의 **상세 정보**(예: 줄거리, 감독, 개봉일 등)를 API에서 추가로 받아와 화면에 표시하세요.
    - 상세 정보는 **새로운 페이지** 또는 **모달 창**으로 보여주면 됩니다.
    - **중요 포인트**: 클릭된 영화의 **ID**를 활용하여 TMDB API로부터 해당 영화의 상세 정보를 요청해야 합니다.
5. **1/14(화) Day 5: 메인 페이지로 돌아오기 및 코드 정리**
    - 영화 상세 페이지나 모달에서 다시 메인 페이지로 돌아가는 **"뒤로 가기"** 또는 **"닫기"** 버튼을 구현하세요.
    - 상세 페이지에서 메인 페이지로 돌아갈 때, **원래의 영화 리스트 상태를 유지**하도록 구현합니다.
6. **1/15(수) Day 6: 모듈화 및 코드 분리**
    - API 요청과 관련된 코드와 DOM 조작 코드를 **별도의 모듈로 분리**하여, 코드의 재사용성과 유지보수성을 높이세요.
    - 예를 들어, **API 요청**은 `api.js`에서, **UI 업데이트**는 `ui.js`에서 처리하는 식으로 각각 분리합니다.
    - **중요 포인트**: 함수로 모듈을 분리할 때 **매개변수와 반환값**을 명확히 정의하여 재사용성을 높이는 데 중점을 두세요.
7. **1/16(목) Day 7: 디버깅 및 최종 제출 준비**
    - 전체 기능이 잘 동작하는지 테스트하고, **브라우저 콘솔에 에러**가 없는지 확인하세요.
    - 추가로 **UI를 다듬거나 간단한 스타일링**을 적용해서 마무리하세요.

### 도전로드맵
1. **1/8(수) Day 1: TMDB API 연동 및 데이터 가져오기 (집중반과 동일)**
    - 집중반과 동일하게 TMDB API 연동 및 데이터를 받아오는 작업을 진행하세요.
    - API 키 발급 및 데이터를 가져오는 과정에서 생길 수 있는 **에러 처리**를 적용하세요.
2. **1/9(목) Day 2: 영화 카드 리스트 UI 구현 (집중반과 동일)**
    - 영화 카드 리스트 UI를 CSS로 스타일링하고, **Flexbox** 또는 **Grid**를 활용해 **반응형 레이아웃**을 적용하세요.
3. **1/10(금) Day 3: 영화 검색 기능 고도화**
    - 집중반과 동일한 영화 검색 기능을 구현하되, **대소문자 구분 없이** 검색할 수 있도록 하고, **Enter 키**로 검색을 실행할 수 있게 추가 기능을 구현하세요.
    - **추가 도전**: 실시간 검색 기능을 구현해, 사용자가 검색어를 입력할 때마다 자동으로 영화 리스트가 필터링되도록 해보세요.
4. **1/13(월) Day 4: 이벤트 위임 적용**
    - 영화 카드 리스트의 개수가 많아지면 각각에 이벤트 리스너를 붙이기 비효율적입니다. 이를 해결하기 위해 **이벤트 위임**을 적용하세요.
    - **상위 요소에만 이벤트 리스너**를 붙이고, 클릭된 요소를 `event.target`으로 판별해 처리합니다.
    - **중요 포인트**: 동적으로 생성된 요소에 이벤트를 효율적으로 처리할 수 있는 방법을 익히세요.
5. **1/14(화) Day 5: 로컬 저장소 활용한 ‘북마크’ 기능**
    - 관심 있는 영화들을 ‘북마크’ (혹은, ‘좋아요’) 할 수 있는 기능을 구현해보세요. 특정 버튼을 눌렀을 때, `localStorage` 에 관련 데이터를 저장하게 해봅시다.
6. **1/15(수) Day 6: async/await로 API 호출 리팩터링**
    - TMDB에서 기본으로 제공하는 **Promise chaining** 기반의 API 호출 코드를 **async/await** 문법으로 리팩터링하세요.
    - **중요 포인트**: 더 읽기 쉽고 유지보수하기 쉬운 코드로 리팩터링하는 것이 목표입니다. 비동기 작업을 더 직관적으로 처리할 수 있도록 합니다.
7. **1/16(목) Day 7: 디버깅 및 최종 제출 준비**
    - 전체 기능이 잘 동작하는지 확인하고, 모든 추가 기능들이 올바르게 작동하는지 확인하세요.
    - **최종 프로젝트 제출**을 위한 마무리 작업을 진행하세요.


    ### 트러블 슈팅 작성법

- **작성 순서**
    1. **문제발생** 
    실제로 무슨 일이 발생했는지 기록하고, 의도대로 동작하지 않는 부분을 구체적으로 설명합니다.
    2. **원인 추론**
    문제 발생 원인을 추측하고, 분석하는 과정을 기록합니다.
    3. **해결 방안** 
    문제를 해결하기 위해 시도한 접근 방법을 기록합니다. 어떤 방법으로 해결했는지, 어떤 수정을 적용했는지 설명합니다.
    4. **결과**
    최종적으로 해결 결과를 기록합니다. 해결 방법을 적용하고, 문제가 해결 됐는지, 어떻게 동작하는지 설명합니다.

