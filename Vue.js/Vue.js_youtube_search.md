# Vue.js

### Youtube Browser



###### Youtube API를 이용하여 YOUTUBE와 비슷하게 만들 것이다

![10](https://user-images.githubusercontent.com/20276476/84621148-c6ef4e00-af14-11ea-8242-6d1ff90a84c6.png)

컴포넌트 베이스로 만들거임



1. cmd창에서 다음을 입력

   `vue create youtube-search`

   `code .`



2. components 폴더 밑에 SearchBar.vue 생성 후 다음과 같이 작성

   ```vue
   <template>
     <div>
         <input type="text" />
     </div>
   </template>
   
   <script>
   export default {
       name: 'SearchBar',
   }
   </script>
   
   <style>
   
   </style>
   ```

   

3. app.vue에 다음과 같이 수정(HelloWorld.vue 파일 삭제)

   ```vue
   <template>
     <div id="app">
       <h1>Youtube Search</h1>
       <SearchBar />
     </div>
   </template>
   
   <script>
   import SearchBar from './components/SearchBar.vue'
   
   export default {
     name: 'App',
     components: {
       SearchBar,
     }
   }
   </script>
   
   <style>
   #app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 60px;
   }
   </style>
   
   ```

   

   ![1](https://user-images.githubusercontent.com/20276476/84621487-a1af0f80-af15-11ea-88d1-ad530bbac682.png)

*****



###### 검색어가 입력되면 Youtube api를 이용하여 결과가 오도록 하자



1. SearchBar.vue 에 다음을 추가

   ```vue
   <template>
     <div>
         <input @keypress.enter="input" type="text" />
     </div>
   </template>
   
   <script>
   export default {
       name: 'SearchBar',
       methods: {
           input() {
               // 1. 입력된 검색어를 가지고, 
               // 2. Youtube API에 요청을 보내어
               // 3. 검색어로 검색한 결과를 가져옴
               console.log('검색어 입력 되었음')
           }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```

   ![2](https://user-images.githubusercontent.com/20276476/84621743-50535000-af16-11ea-9f73-11c84228d7d3.png)

   검색어를 친 후 엔터를 누르면 위의 결과가 나온다



2. SearchBar.vue 을 수정

   ```vue
   <template>
     <div>
         <input v-model="searchStr" @keypress.enter="input" type="text" />
     </div>
   </template>
   
   <script>
   import axios from "axios"
   
   export default {
       name: 'SearchBar',
       data() {
           return {
               searchStr: ""
           }
       },
       methods: {
           async input() {
               // 1. 입력된 검색어를 가지고,
               const baseURL="https://www.googleapis.com/youtube/v3/search"
               const API_KEY = "AIzaSyCNxPMPkbPcLX6dxnfqWM4K3OMFqpBQwRI"
   
               // 2. Youtube API에 요청을 보내어
               axios.get(baseURL, {
                   params: {
                       key: API_KEY,
                       part: 'snippet',
                       type: 'video',
                       q: this.searchStr,
                   }
               })
               // 3. 검색어로 검색한 결과를 가져옴
               .then(response => {
                   console.log(response.data)
               })
           }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```

   ![3](https://user-images.githubusercontent.com/20276476/84625027-69133400-af1d-11ea-84ff-c091dfe4eef6.png)



3. 다시 바꿔보기

   ```vue
   <template>
     <div>
         <input v-model="searchStr" @keypress.enter="input" type="text" />
         <ul>
             <li v-for="result in results" :key="result.id.videoId">{{ result.snippet.title }}</li>
         </ul>
     </div>
   </template>
   
   <script>
   import axios from "axios"
   
   export default {
       name: 'SearchBar',
       data() {
           return {
               searchStr: "",
               results: [],
           }
       },
       methods: {
           async input() {
               // 1. 입력된 검색어를 가지고,
               const baseURL="https://www.googleapis.com/youtube/v3/search"
               const API_KEY = "############################"
   
               // 2. Youtube API에 요청을 보내어
               axios.get(baseURL, {
                   params: {
                       key: API_KEY,
                       part: 'snippet',
                       type: 'video',
                       q: this.searchStr,
                   }
               })
               // 3. 검색어로 검색한 결과를 가져옴
               .then(response => {
                   this.results = response.data.items
               })
           }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```

   ![4](https://user-images.githubusercontent.com/20276476/84625623-9e6c5180-af1e-11ea-988c-7148a660fb11.png)



*****



###### 첫번째는 영상이 나오게, 나머지 요소들은 썸네일이 나오도록 만들기

1. SearchBar.vue를 수정

   ```vue
   <template>
     <div>
         <input v-model="searchStr" @keypress.enter="input" type="text" />
         <ul style="list-style:none;">
             <li v-for="(result, index) in results" :key="result.id.videoId">
                   <iframe v-if="index==0" width="720" height="480"
                       :src="player+result.id.videoId">
                   </iframe>
                   <img v-else :src="result.snippet.thumbnails.high.url" width="720" height="480" alt="안나오네?" />
             </li>
         </ul>
         
         <ul>
             <li v-for="result in results" :key="result.id.videoId">{{ result.snippet.title }}</li>
         </ul>
     </div>
   </template>
   
   <script>
   import axios from "axios"
   
   export default {
       name: 'SearchBar',
       data() {
           return {
               searchStr: "",
               results: [],
               player : "https://www.youtube.com/embed/"
           }
       },
       methods: {
           async input() {
               // 1. 입력된 검색어를 가지고,
               const baseURL="https://www.googleapis.com/youtube/v3/search"
               const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
   
               // 2. Youtube API에 요청을 보내어
               axios.get(baseURL, {
                   params: {
                       key: API_KEY,
                       part: 'snippet',
                       type: 'video',
                       q: this.searchStr,
                       maxResults: 50,
                   }
               })
               // 3. 검색어로 검색한 결과를 가져옴
               .then(response => {
                   console.log(response.data)
                   this.results = response.data.items
               })
           }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```

   ![5](https://user-images.githubusercontent.com/20276476/84628668-0cffde00-af24-11ea-98db-7e71d8d08659.png)

   

*****



###### API key를 숨기자



1. 프로젝트 루트 폴더에 .env 파일 만들기

   ```text
   VUE_APP_YOUTUBE_API_KEY="#################################"
   ```

   

2. SearchBar.vue에 다음부분 수정

   ```vue
   <script>
   import axios from "axios"
   
   export default {
       name: 'SearchBar',
       data() {
           return {
               searchStr: "",
               results: [],
           }
       },
       methods: {
           async input() {
               // 1. 입력된 검색어를 가지고,
               const baseURL="https://www.googleapis.com/youtube/v3/search"
               const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
   
               // 2. Youtube API에 요청을 보내어
               axios.get(baseURL, {
                   params: {
                       key: API_KEY,
                       part: 'snippet',
                       type: 'video',
                       q: this.searchStr,
                       maxResults: 50,
                   }
               })
               // 3. 검색어로 검색한 결과를 가져옴
               .then(response => {
                   this.results = response.data.items
               })
           }
       }
   }
   </script>
   ```

   







*****



###### 





*****



###### API 사용을 위한 Key 발급 받기



1. google api를 쳐서 들어감



2. 프로젝트 이름(유니크하게) 만들고 위의 검색창에 youtube data api v3 클릭후 사용

   그리고 만들었던 프로젝트 이름에 추가



3. 사용자 인증 정보 만들기 클릭 후 다음과 같이 설정

   ![11](https://user-images.githubusercontent.com/20276476/84621150-c8207b00-af14-11ea-8f04-231e5b3ed4e9.png)

   

4. 다음을 눌러 API를 어디다 복사해놓음

   그 후 완료

