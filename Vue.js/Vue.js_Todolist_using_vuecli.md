# Vue

### Vue CLI



https://cli.vuejs.org/



* React-create-app 과 같은 것



###### 설치

`npm install -g @vue/cli`



설치 후 확인은 

`vue --version`

![2](https://user-images.githubusercontent.com/20276476/84347663-1b7d8b00-abee-11ea-8420-931c2666aca1.png)



###### 프로젝트 생성

`vue create cli-test`



###### 프로젝트 실행

생성된 프로젝트 로 들어가

`npm run serve` or`yarn serve`

![3](https://user-images.githubusercontent.com/20276476/84348076-14a34800-abef-11ea-85ca-bda53b0068ed.png)



* 실행 된 화면

![4](https://user-images.githubusercontent.com/20276476/84348079-15d47500-abef-11ea-9dd0-a87804a4bf0f.png)





###### 구조

![5](https://user-images.githubusercontent.com/20276476/84348907-20900980-abf1-11ea-8bb8-658b04ee65ac.png)



* App.vue의 구조

  ```vue
  <!-- render 되는 파트 -->
  <template>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </template>
  
  <!-- SFC(single File component) 형식 -->
  <script>
  import HelloWorld from './components/HelloWorld.vue'
  
  export default {
    name: 'App',
    components: {
      HelloWorld
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



###### 이걸로 TodoList를 만들어 보자



1. component폴더 밑 todolist.vue를 만든다-> <vue 만 치고 enter 누르면 폼이 다 만들어짐

   ```vue
   <template>
       <div>
           <h1>Todo List의 List</h1>
           <p>{{ title }}</p>
       </div>
   </template>
   
   <script>
   export default {
       name: 'TodoList',
       data() {
           return {
               title: 'This is title'
           }
       },
   }
   </script>
   
   <style scoped>
   
   </style>
   ```

   



2. 그 다음 App.vue에서 todolist.vue를 추가해주자

   ```vue
   <template>
     <div id="app">
       <HelloWorld msg="Welcome to the jungle"/>
       <!-- 3.컴포넌트를 넣어 주면 됨 -->
       <TodoList />
     </div>
   </template>
   
   <script>
   import HelloWorld from './components/HelloWorld.vue'
   // 1. TodoList.vue를 import 함
   import TodoList from './components.todolist.vue'
   
   export default {
     name: 'App',
     components: {
       HelloWorld,
       // 2. 컴포넌트를 등록한다
       TodoList
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

   ![6](https://user-images.githubusercontent.com/20276476/84351799-048f6680-abf7-11ea-93a3-dbd67df3fa4b.png)





###### 할일 목록을 추가해 보자

1. todolist.vue 수정

   ```vue
   <template>
       <div>
           <h1>Todo List의 List</h1>
           <p>{{ title }}</p>
           <ul>
              <li v-for="todo in todos" v-bind:key="todo.id">{{ todo.content }}</li> 
           </ul>
       </div>
   </template>
   
   <script>
   export default {
       name: 'TodoList',
       data() {
           return {
               title: 'This is title',
               todos: [
                   { id: 1, content: 'Vue.js 복습', isCompleted: false },
                   { id: 2, content: 'js 복습', isCompleted: false },
                   { id: 3, content: '알고리즘 학습', isCompleted: false },
                   { id: 4, content: 'react 복습', isCompleted: false },
               ]
           }
       },
   }
   </script>
   
   <style scoped>
   
   </style>
   ```

   ![7](https://user-images.githubusercontent.com/20276476/84352161-c777a400-abf7-11ea-9984-39108cb25a47.png)



###### 부모 컴포넌트에 데이터를 놓고 자식 컴포넌트에게 넘겨주도록 만들자

1. App.vue 수정

   ```vue
   <template>
     <div id="app">
       <HelloWorld msg="Welcome to the jungle"/>
       <!-- 3.컴포넌트를 넣어 주면 됨 -->
       <!-- v-bind:todos로 자식 컴포넌트에 건네어 주면 됨 -->
       <TodoList :todos="todos" />
     </div>
   </template>
   
   <script>
   import HelloWorld from './components/HelloWorld.vue'
   // 1. TodoList.vue를 import 함
   import TodoList from './components/todolist.vue'
   
   export default {
     name: 'App',
     components: {
       HelloWorld,
       // 2. 컴포넌트를 등록한다
       TodoList
     },
     data (){
       return {
         todos: [
                   { id: 1, content: 'Vue.js 복습', isCompleted: false },
                   { id: 2, content: 'js 복습', isCompleted: false },
                   { id: 3, content: '알고리즘 학습', isCompleted: false },
                   { id: 4, content: 'react 복습', isCompleted: false },
         ]
       }
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



2. todolist.vue 수정

   ```vue
   <template>
       <div>
           <h1>Todo List의 List</h1>
           <p>{{ title }}</p>
           <ul>
              <li v-for="todo in todos" v-bind:key="todo.id">{{ todo.content }}</li> 
           </ul>
       </div>
   </template>
   
   <script>
   export default {
       name: 'TodoList',
       // 이런식으로 받음
       props: {
           todos: Array
       },
       data() {
           return {
               title: 'This is title',
           }
       },
   }
   </script>
   
   <style scoped>
   
   </style>
   ```

   



*****



###### vue CLI의 패키지 매니저 변경하기

cmd창에서 `vue config`를 치면 다음과 같이 나옴

```text
Resolved path: 경로
 {
  "useTaobaoRegistry": true,
  "packageManager": "yarn"
}

```



경로의 파일로 가서 packageManager의 yarn을 npm으로 바꾼 후 프로젝트르 만들면 됨



*****

###### Dog API를 사용한 개발



1. `vue create dogs`



2. `npm run serve`로 서버 돌아가는지 확인



3. src/components의 HelloWorld.vue 삭제



4. src/components에 DogImage.vue 생성

   ```vue
   <template>
       <div>
           <h1>{{ title }}</h1>
       </div>
   </template>
   
   <script>
   export default {
       // 파일의 이름과 동일하게 만드는게 관례
       name: 'DogImage',
       // 실제 데이터는 return 안에 들어감
       data() {
           return {
               title: 'Dog Image Generator'
           }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```

   

5. App.vue의 다음 부분을 수정

   ```vue
   <template>
     <div id="app">
       <DogImage />
     </div>
   </template>
   
   <script>
   import DogImage from './components/DogImage.vue'
   
   export default {
     name: 'App',
     components: {
       DogImage
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

   

6. DogImage.vue 수정

   ```vue
   <template>
       <div>
           <h1>{{ title }}</h1>
           <!-- v-on은 @로 대체 가능 -->
           <button @click="getDog">강아지 사진 겟또</button>
           <div>
               <img v-for="DogImgUrl in DogImgUrls" :key="DogImgUrl" :src="DogImgUrl" alt="그런 건 없다" width="200dp" height="200dp" />
           </div>
       </div>
   </template>
   
   <script>
   // import
   import axios from 'axios'
   
   export default {
       // 파일의 이름과 동일하게 만드는게 관례
       name: 'DogImage',
       // 실제 데이터는 return 안에 들어감
       data() {
           return {
               title: '옛다 강아지 사진이나 봐라',
               DogImgUrls: [],
           }
       },
       methods :{
           async getDog() {
               // 1. dog.ceo API에 요청을 보내어 JSON응답 받아
               const result = await axios.get('https://dog.ceo/api/breeds/image/random')
               // 2. Image url을 가져와 
               if(result.data.status === "success"){
                   // 3. <img src=""> 넣어줌
                   this.DogImgUrls.push(result.data.message)
               }
           }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```

   

7. `npm i axios`로 axios 설치



![8](https://user-images.githubusercontent.com/20276476/84459352-2eea2e00-aca2-11ea-9e83-2276bfb916ee.png)



*****



###### 한 컴포넌트에 데이터를 몰아주자



1. Buttons.vue를 만들기

   ```vue
   <template>
       <div>
           <!-- 부모에게 이벤트를 전달해 주는 법 -->
           <button @click="dogClicked">강아지 사진 겟또</button>
           <button @click="catClicked">고양이 사진 겟또</button>
       </div>
   </template>
   
   <script>
   export default {
       name: 'Buttons',
       methods: {
          	// 이벤트 등록을 한다
           dogClicked(){ this.$emit("dogBtnClicked", "") },
           catClicked(){ this.$emit("catBtnClicked", "") }
       }
   }
   </script>
   
   <style>
   
   </style>
   ```



2. app.vue 고치기

   ```vue
   <template>
     <div id="app">
       <h1>강아지와 고양이의 콜라보 무대</h1>
       <!-- 자식이 준 이벤트를 받아서 할일 하기 -->
       <Buttons @dogBtnClicked="getDog" @catBtnClicked="getCat" />
       <DogImage :Dogs="dogImages" />
       <CatImage :Cats="catImages" />
     </div>
   </template>
   
   <script>
   import DogImage from './components/DogImage.vue'
   import CatImage from './components/CatImage.vue'
   import Buttons from './components/Buttons.vue'
   import axios from 'axios'
   
   export default {
     name: 'App',
     components: {
       DogImage,
       CatImage,
       Buttons,
     },
     data() {
         return {
             key: 0,
             catImages: [],
             dogImages: []
         }
     },
     methods :{
       async getCat() {
           const result = await axios.get('https://api.thecatapi.com/v1/images/search')
           this.catImages.push({id: ++this.key, url: result.data[0].url})
       },
       async getDog() {
           const result = await axios.get('https://dog.ceo/api/breeds/image/random')
           if(result.data.status === "success"){
               this.dogImages.push({id: ++this.key, url: result.data.message})
           }
       }
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



3. Image뷰 고치기

   * dogImage.vue

     ```vue
     <template>
         <div>
             <div>
                 <img v-for="Dog in Dogs" :key="Dog.url" :src="Dog.url" alt="그런 건 없다" width="200dp" height="200dp" />
             </div>
         </div>
     </template>
     
     <script>
     export default {
         name: 'DogImage',
         props:{
             Dogs: Array
         }
     }
     </script>
     
     <style>
     
     </style>
     ```

     

   * catImage.vue

     ```vue
     <template>
         <div>
             <div>
                 <img v-for="Cat in Cats" :key="Cat.id" :src="Cat.url" alt="그런 건 없다" width="200dp" height="200dp" />
             </div>
         </div>
     </template>
     
     <script>
     export default {
         name: 'CatImage',
         props:{
             Cats: Array
         }
     }
     </script>
     
     <style>
     
     </style>
     ```

     ![9](https://user-images.githubusercontent.com/20276476/84466663-d8d2b600-acb4-11ea-9f5e-0a3215f47fd0.png)

     

