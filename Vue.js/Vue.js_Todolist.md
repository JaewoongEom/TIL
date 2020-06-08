# Vue.js

### Toto app 만들기





1. 01_vue_todo_list.html 파일 만들어서 다음과 같이 작성(간단한 예시)

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
       <title>Document</title>
   </head>
   <body>
       <div id="app">	<!-- Vue 객체에 mapping 되는 거인듯 -->
           {{ name }}
       </div>
       <script>
           // 해당 element안에서만 data를 사용 가능
           new Vue({
               el: '#app',	// element 지정
               data: {		// 사용될 데이터인듯
                   name: 'john'
               }
           })
       </script>
   </body>
   </html>
   ```

   ![9](https://user-images.githubusercontent.com/20276476/83995007-18d32980-a993-11ea-80b7-1dc68c7033e8.png)

###### 만들어봅시다

![10](https://user-images.githubusercontent.com/20276476/83995141-8e3efa00-a993-11ea-9e82-62fb097ab64b.png)

레이아웃은 이런식으로 만들어 질 것이다



###### 일단 보이게 안보이게	

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app">
        <h1>Todo List</h1>
        <input type="text" />
        <ul>
            <!-- vue.js의 directive(지시자) 중 하나 -->
            <!-- 
                foreach 사용 방법
                ""안에 foreach처럼 쓰면 됨 
                (배열 순회)
            -->
            <!--
                if 사용 방법
                ""안의 값은 boolean값이 온다
                (조건부 렌더링)
            -->
            <li 
                v-for="todo in todos"
                v-if="!todo.isCompleted"
            >{{ todo.content }}</li>
        </ul>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                name: 'john',
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false}
                ]
            }
        })
    </script>
</body>
</html>
```





###### 항목을 클릭했을 때 줄이 가게 만들자

1. checkbox를 통해 사라지게 하기

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
       <title>Document</title>
   </head>
   <body>
       <div id="app">
           <h1>Todo List</h1>
           <input type="text" />
           <ul>
               <!-- vue.js의 directive(지시자) 중 하나 -->
               <!-- 
                   foreach 사용 방법
                   ""안에 foreach처럼 쓰면 됨 
                   (배열 순회)
               -->
               <!--
                   if 사용 방법
                   ""안의 값은 boolean값이 온다
                   (조건부 렌더링)
               -->
               <!--
                   v-on -> 이벤트 바인딩
                   addOnClickListener()
               -->
               <li 
                   v-for="todo in todos"
                   v-if="!todo.isCompleted"
               >
                   <!--
                       v-model
                       양방향 데이터 바인딩
                   -->
                   <input v-model="todo.isCompleted" type="checkbox" />
                   {{ todo.content }}</li>
           </ul>
       </div>
       <script>
           new Vue({
               el: '#app',
               data: {
                   name: 'john',
                   todos: [
                       { content: 'Vue Js 복습', isCompleted: false},
                       { content: 'Javascript 복습', isCompleted: true},
                       { content: '코딩 테스트 준비', isCompleted: false},
                       { content: 'Node.js 복습', isCompleted: false}
                   ]
               }
           })
       </script>
   </body>
   </html>
   ```

2. checkbox를 누르면 완료글자가 나오도록 바꾸기

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
       <title>Document</title>
   </head>
   <body>
       <div id="app">
           <h1>Todo List</h1>
           <input type="text" />
           <ul>
               <li v-for="todo in todos" v-if="!todo.isCompleted">
                   <input v-model="todo.isCompleted" type="checkbox" />
                   {{ todo.content }}</li>
               <!--
                   v-else 
                   if가 아닐 때 (조건부 렌더링)
               -->
               <li v-else>완료</li>
           </ul>
       </div>
       <script>
           new Vue({
               el: '#app',
               data: {
                   name: 'john',
                   todos: [
                       { content: 'Vue Js 복습', isCompleted: false},
                       { content: 'Javascript 복습', isCompleted: true},
                       { content: '코딩 테스트 준비', isCompleted: false},
                       { content: 'Node.js 복습', isCompleted: false}
                   ]
               }
           })
       </script>
   </body>
   </html>
   ```

   



###### 값을 입력하면 추가되게 해보자

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
    <style>
        .completed{
            
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Todo List</h1>
        <!-- 동기화 되어서 여기서 문자를 치면 newInput에 들어간다 -->
        <input v-on:keypress:enter="createTodo" v-model="newInput" type="text" />
        <!-- v-on:이벤트="함수"-->
        <button v-on:click="createTodo">추가</button>
        <ul>
            <li v-for="todo in todos" v-if="!todo.isCompleted">
                <input v-model="todo.isCompleted" type="checkbox" />
                {{ todo.content }}</li>
            <li v-else>완료</li>
        </ul>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                name: 'john',
                // 이걸 textbox랑 연결
                newInput: '',
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false},
                ]
            },
            // 함수 정의
            method: {
                createTodo() {
                    this.todos.push({content: this.newInput, isCompleted: false})
                    this.newInput = ""
                }
            }
        })
    </script>
</body>
</html>
```





###### 완료되면 사라지게 하는대신 줄을 긋게 해보기

