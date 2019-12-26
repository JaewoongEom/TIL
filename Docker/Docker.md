# docker

### docker란?

* 2013년 3월 Docker, Inc(구 dotCloud)에서 출시한 오픈소시 컨테이너 프로젝트

* 컨테이너 기반의 오픈소스 가상화 플랫폼

* Container :  프로그램 작동을 위한 최소한의 기능들을 묶어 패키징한 단위

  * 다양한 실행환경을 위해 추상화 된 단위
  * 어떤 환경에서도 동일한 인터페이스를 제공한다
  * 프로그램의 배포 및 관리를 단순하게 해준다

  

#### 환경의 변화

* 초기에는 물리적인 서버를 여러대로 사용

  * 서버 구축 비용이 높고, 설치 시간이 길다

* 2010년 클라우드 환경으로 넘어오면서 가상 서버를 사용하게 됨

  * 생성된 가상 서버가 늘어날 수록 __소프트웨어 설치와 설정 관리에 어려움을 겪음__
  * 리눅스/유닉스의 __셸 스크립트로는 중앙 관리기능이나 복잡한 기능을 구현하기 어려움__
  * 리눅스 환경은 설치해야할 응용프로그램이 많고,  설정이 복잡하다

* 가상 머신의 등장

  * Host pc에 여러 가상 OS를 설치하여 서비스를 실행 할 수 있다
  * 가상머신 이미지를 다른 PC, 서버에 복사해서 실행하여 사용이 가능하다 - __복제 가능__
  * 덩치가 크다. 즉 배포가 느리다. - __이미지 안에 OS가 들어있기 때문__

* Docker

  * image에 프로그램과 라이브러리만 격리해서 설치
  * OS자원은 호스트와 공유
  * 이미지 용량이 크게 줄어듦
  * 가상 머신에 비해 월등한 성능을 자랑함 - __호스트와 비슷한 성능__
  * 이미지 생성, 배포에 특화됨 - __Docker hub__(github와 비슷)

  

#### Docker 설치

* 공식 문서에서 보이는 설치 방법은 우분투 최신버전만 된다

  ~~실습해보고 여기다 정리하기~~

1. 도커 저장소 추가

   * gedit /etc/apt/sources.list 로 연 후 아래에 내용 추가 후 저장

     deb https://apt.dockerproject.org/repo ubuntu-xenial main

2. apt-get update

3. HTTPS 통신을 위한 패키지설치

   * apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

4. 공개키 설치

   * apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

5. linux-image extra, docker-engine 패키지 설치

   * apt-get install linux-image-extra-$(uname -r)

   * apt-get install docker-engine - _전부 Y_

     

     ![docker_version](.\image\docker_version.jpg)