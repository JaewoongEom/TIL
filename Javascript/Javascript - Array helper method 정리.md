# Javascript

### Javascript Array helper Method 정리
```javascript
/*
 * Array Helper Method
 */

const colors = ['read', 'blue', 'green']

// 1. forEach

// 전통적 for 방식
for(let i = 0; i < colors.length; i++){
    console.log(colors[i])
}

// 좀 더 진화된 과정
for(let color of colors){
    console.log(color)
}

// forEach
colors.forEach((value) => {
    console.log(value)
})

// 2. filter
const numbers = [-20, -15, 5, 10]

// forEach로 거르기
const positiveNumber = []
numbers.forEach(number => {
    if(number > 0){
        positiveNumber.push(number)
    }
})
console.log(positiveNumber)

const positiveNumber2 = numbers.filter(number => number > 0)
console.log(positiveNumber2)

// 3. map
// 순회를 하며, 내부의 모든 요소에 동일한 작업을 해야 하는 경우
// ex) 숫자 <-> 글자, 동일한 데이터 적용
inputs = ['1', '5', '3', '5', '6']
const numberInputs = inputs.map(value => parseInt(value))
console.log(numberInputs)

let sum = 0
numberInputs.forEach((num) =>{
    sum += num
})
console.log(sum)

// 4. reduce
// 순회를 하며, 내부의 모든 요소를 하나의 값으로 환원해야하는 경우
sum = numberInputs.reduce((acc, cur) => acc + cur)
console.log(sum)

// 5. find
// 순회를 하며, 해당 조건에 맞는 값을 반환해줌
// filter와의 차이점은 find는 값을 찾고 바로 리턴됨
findVal = numberInputs.find((num) => num == 5)
console.log(findVal)

// 6. every
// 순회를 하며 배열의 값들이 기준에 맞는지 검사함(검사만 함)
everyVal = numberInputs.every((num) => num > 0)
console.log(everyVal)

// 7. some
// 순회를 하며 하나라도 조건에 맞으면 참을 반환
someVal = numberInputs.some((num) => num > 5)
console.log(someVal)
```



*****



###### 연습문제

```javascript
// 1. images 배열안에 있는 정보(height, width)를 곱해 넓이를 구하여 areas 배열에 저장하세요.

const images = [
    { height: 10, width: 30 },
    { height: 20, width: 90 },
    { height: 54, width: 32 }
  ]
  
  const areas = images.map((val) => val.height * val.width)
  console.log(areas);
  
  
  // 2. 아래 함수에서 for 를 forEach 로 바꾸세요.
  function handlePosts() {
      const posts = [
        { id: 23, title: 'Daily JS News' },
        { id: 52, title: 'Code Refactor City' },
        { id: 105, title: 'The Brightest Ruby' }
      ]
  
      for (let i = 0; i < posts.length; i++){
          console.log(posts[i]) 
      console.log(posts[i].id)
      console.log(posts[i].title)
      }
  }
  
  handlePosts = () => {
    const posts = [
        { id: 23, title: 'Daily JS News' },
        { id: 52, title: 'Code Refactor City' },
        { id: 105, title: 'The Brightest Ruby' }
      ]
  
      posts.forEach(val => {
        console.log(val) 
        console.log(val.id)
        console.log(val.title)
      })
  }
  handlePosts()
  
  
  // 3. 숫자가 담긴 배열로 각 숫자들의 제곱근이 들어있는 새로운 배열 roots를 만드세요.
  const newNumbers = [4, 9, 16]
  const powNumbers = newNumbers.map((val) => val * val)
  console.log(powNumbers)
  
  // 4. 속도(distance/time)를 저장하는 배열 speeds 를 만드세요.
  const trips = [
    { distance: 34, time: 10 },
    { distance: 90, time: 50 },
    { distance: 59, time: 25 },
  ]
  const v = trips.map(val =>  val.distance / val.time)
  console.log(v)
  
  
  // 5. numbers 배열중 50보다 큰 값들만 모은 배열 filteredNumbers 을 만드세요.
  const numbers = [15, 25, 35, 45, 55, 65, 75, 85, 95]
  const filteredNumbers = numbers.filter(val => val > 50)
  console.log(filteredNumbers)
  
  
  // 6. 배열에 담긴 중복된 이름을 {'이름': 수} 형태의 object로 반환하세요. (map)
  const names = ['harry', 'jason', 'tak', 'tak', 'justin']
  const nameNum = [];
  names.map((val)=> {
      if(nameNum[val])
        nameNum[val] += 1 
      else
        nameNum[val] = 1  
  })
  console.log(nameNum)
  
  // 7. people에서 admin 권한을 가진 요소를 찾으세요. (find)
  const people = [
    { id: 1, admin: false },
    { id: 2, admin: false },
    { id: 3, admin: true },
  ]
  
  const findPeople = people.find(val => val.admin)
  console.log(findPeople)
  
  
  // 8. accounts에서 잔액이 24,000인 사람을 찾으세요. (find)
  const accounts = [
      { name: 'justin', balance: 1200 },
      { name: 'harry', balance: 50000 },
      { name: 'jason', balance: 24000 },
  ]
  const findAccounts = accounts.find(val => val.balance === 24000)
  console.log(findAccounts)
  
  
  
  // 9. requests 배열에서 status가 pending인 요청이 있는지 확인하세요. (some)
  const requests = [
    { url: '/photos', status: 'complete' },
    { url: '/albums', status: 'pending' },
    { url: '/users', status: 'failed' },
  ]
  const isRequestPending = requests.some(val => val.status === 'pending')
  console.log(isRequestPending)
  
  
  // 10. users 배열에서 모두가 submmited 인지 여부를 hasSubmitted 에 저장하세요. (every)
  const users = [
      { id: 21, submmited: true },
      { id: 33, submmited: false },
      { id: 712, submmited: true},
  ]
  const allisUsers = users.every(val => val.submmited)
  console.log(allisUsers)
```

