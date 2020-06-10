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
            text-decoration: line-through;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Todo List</h1>
        <input v-on:keypress.enter="createTodo" v-model="newInput" type="text">
        <button v-on:click="createTodo">추가</button>
        <ul>
            <!--
                v-bind="{조건부로 적용할 클래스 이름 : boolean}"
            -->
            <li v-bind:class="{completed : todo.isCompleted}" v-for="todo in todos">
                <input v-model="todo.isCompleted" type="checkbox" >
                {{ todo.content }}
            </li>
        </ul>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                name: 'john',
                newInput: '',
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false},
                ]
            },
            methods: {
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



* Baas : Backend as a Service



*****



###### 아무것도 없을때 추가 되는 것을 막자

```vue
new Vue({
            el: '#app',
            data: {
                name: 'john',
                newInput: '',
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false},
                ]
            },
            methods: {
                createTodo() {
                    // 입력값이 있을때만 넣게 함
                    if(this.newInput){
                        this.todos.push({content: this.newInput, isCompleted: false})
                        this.newInput = ""
                    } else {
                        alert("no value")    
                    }
                }
            }
        })
```



*****



###### 완료된 버튼을 누르면 완료된 일들을 숨길수 있도록 하기

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
            text-decoration: line-through;
        }
        .hide{
            display: none;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Todo List</h1>
        <input v-on:keypress.enter="createTodo" v-model="newInput" type="text">
        <button v-on:click="createTodo">추가</button>
        <ul>
            <!-- hide class를 추가해줌 -->
            <li v-bind:class="{completed : todo.isCompleted, hide: buttonPress && todo.isCompleted}" v-for="todo in todos">
                <input v-model="todo.isCompleted" type="checkbox" >
                {{ todo.content }}
            </li>
        </ul>
        <button v-on:click="hideTodo">완료된 할 일 지우기</button>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                name: 'john',
                newInput: '',
                buttonPress: false,
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false},
                ],
                completedTodo: []
            },
            methods: {
                createTodo() {
                    if(this.newInput){
                        this.todos.push({content: this.newInput, isCompleted: false})
                        this.newInput = ""
                    } else {
                        alert("no value")    
                    }
                },

                hideTodo() {
                    this.buttonPress = this.buttonPress? false : true
                }
            }
        })
    </script>
</body>
</html>
```



*****



###### 상태에 따라 할일이 다르게 보이게 만들자

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
            text-decoration: line-through;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Todo List</h1>
        <select v-model="status">
            <option value="showAll">모두보기</option>
            <option value="showCompleted">완료된 것만 보기</option>
            <option value="showIncompleted">미완료된 것만 보기</option>
        </select>
        <input v-on:keypress.enter="createTodo" v-model="newInput" type="text">
        <button v-on:click="createTodo">추가</button>
        <ul>
            <!-- 여기다 상태 함수를 받게 하기 -->
            <li v-bind:class="{completed : todo.isCompleted}" v-for="todo in todosByStatus()">
                <input v-model="todo.isCompleted" type="checkbox" >
                {{ todo.content }}
            </li>
        </ul>
        <button>완료된 할 일 지우기</button>
    </div>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                name: 'john',
                newInput: '',
                // status를 넣어준다
                status: 'showAll',  // showCompleted, showIncompleted
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false},
                ],
                completedTodo: []
            },
            methods: {
                createTodo() {
                    if(this.newInput){
                        this.todos.push({content: this.newInput, isCompleted: false})
                        this.newInput = ""
                    } else {
                        alert("no value")    
                    }
                },

                // status에 따른 상태를 바꾸기 위한 함수
                todosByStatus() {
                    // status == "showCompleted"
                    if(this.status === 'showCompleted'){
                        return this.todos.filter(todo => todo.isCompleted)
                    } else if(this.status === 'showIncompleted') {
                        return this.todos.filter(todo => !todo.isCompleted)
                    }

                    // status = 'showAll'
                    return this.todos
                }
            }
        })
    </script>
</body>
</html>
```



*****



###### 메서드를 불러 낭비를 하게 하지않고 캐싱된 데이터로 나오게 만들자

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
            text-decoration: line-through;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Todo List</h1>
        <select v-model="status">
            <option value="showAll">모두보기</option>
            <option value="showCompleted">완료된 것만 보기</option>
            <option value="showIncompleted">미완료된 것만 보기</option>
        </select>
        <input v-on:keypress.enter="createTodo" v-model="newInput" type="text">
        <button v-on:click="createTodo">추가</button>
        <ul>
            <li v-bind:class="{completed : todo.isCompleted}" v-for="todo in todosByStatus">
                <input v-model="todo.isCompleted" type="checkbox" >
                {{ todo.content }}
            </li>
        </ul>
        <button>완료된 할 일 지우기</button>

        <h1>Computed vs Method 비교</h1>
        <div v-if="visible">
            <p>method : {{ methodDate() }}</p>
            <p>computed : {{ computedDate }}</p>
        </div>
        <button v-on:click="visible = !visible">눌러</button>
    </div>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                visible: true,
                name: 'john',
                newInput: '',
                searchInput: '',
                // status를 넣어준다
                status: 'showAll',  // showCompleted, showIncompleted
                todos: [
                    { content: 'Vue Js 복습', isCompleted: false},
                    { content: 'Javascript 복습', isCompleted: true},
                    { content: '코딩 테스트 준비', isCompleted: false},
                    { content: 'Node.js 복습', isCompleted: false},
                ],
                completedTodo: []
            },
            methods: {
                createTodo() {
                    if(this.newInput){
                        this.todos.push({content: this.newInput, isCompleted: false})
                        this.newInput = ""
                    } else {
                        alert("no value")    
                    }
                },

                methodDate(){
                    return new Date()
                }
            },
            computed :{
                 // status에 따른 상태를 바꾸기 위한 함수
                 todosByStatus() {
                    // status == "showCompleted"
                    if(this.status === 'showCompleted'){
                        return this.todos.filter(todo => todo.isCompleted)
                    } else if(this.status === 'showIncompleted') {
                        return this.todos.filter(todo => !todo.isCompleted)
                    }

                    // status = 'showAll'
                    return this.todos
                },
                
                computedDate(){
                    return new Date()
                }
            }
        })
    </script>
</body>
</html>
```

computed는 값을 캐싱해서 가지고 있음 -> method는 계속 시간이 변하지만 computed는 그렇지 않다



