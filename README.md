# Letmein-Front
![제목을-입력해주세요_-001](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/fe4ea166-b409-4659-867d-7cc73c32dd9b)

### 렛미인에서 react.js로 개발한 프로젝트 프론트

### 제작 기간 : 24.02.01 ~ 24.02.28

### `npm install`
- package.json에 저장되어 있는 의존성 패키지를 설치
- 프로젝트를 다운로드 받은 다음 VSCode에서 npm install을 실행하여 패키지 설치

## 1. 서비스 소개

   ###  yolo 기반 체형확인 및 패션 스타일러  플랫폼

    1. 업로드한 사진에서 사용자의 체형을 분석하는 서비스 제공
    2. 여러가지 체형의 아바타에 추천 의상을 가상피팅하는 서비스 제공
    3. 코디를 공유할 수 있는 커뮤티니 제공

# 2. 주요 기능
<details>
    <summary>기능 보기</summary>

   ### 2-1 체형 분석 기능
   
   ![제목을-입력해주세요_-001 (1)](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/27ec85ab-81ac-4c5a-ad8d-f1533022278e)
   
   ![image](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/b95fe8d5-e11d-410b-8a2a-31f870ac9613)

   - 업로드한 사진에서 Face Detecting 수행하여 얼굴부분 추출
   - 추출한 사진에서 Gender Detecting을 사용하여 성별 분류
   - YOLOv8 Segment와 Mediapipe을 사용하여 체형 분석
   - 어깨와 골반 너비를 비교해 체형 등록 후 해당 체형에 해당하는 아바타 생성 
     - 어깨 > 골반 : 역삼각형
     - 어깨 = 골반 : 직사각형/모래시계형
     - 어깨 < 골반 : 삼각형

   ### 2-2 아바타 기능

   ![제목을-입력해주세요_-001 (2)](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/1a7a829d-097a-48d1-8713-fc802da35e65)

- Avatar에 masking, parse, openpose을 수행
- Cloth에 masking을 수행
- GMM 모델을 사용하여 옷을 아바타의 크기와 위치에 맞추고 자세에 따라 변형
- TOM 모델을 사용하여 매끄럽게 처리
- 체형에 맞는 아바타를 생성
- 체형에 베스트 코디 가상 피팅 서비스
   
### 2-3 커뮤니티 기능
- 무한스크롤 기능 -> 모바일에 최적화
- 인기순 / 최신순 정렬
- 작성자 / 제목 기준 검색
- 로그인 시 자유롭게 코디/아바타 등의 글 업로드 -> 마이페이지에서 확인 가능
- 좋아요 기능 구현 -> 마이페이지에서 확인 가능
- 이미지 업로드 시 AWS S3에 저장
  
### 2-4 마이페이지 기능

![001](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/f65c6bd3-871a-42d7-944d-33b1030b031a)

![002](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/2c414416-61c1-4fbf-8822-0d52f1116e5b)

- 1. 프로필 수정 기능
- 2. 고객문의 페이지 이동
- 작성한 글 목록 확인
- 좋아요 누른 글 목록 확인
- 3. 고객센터 1:1 문의글 작성
- 4. 문의글 답변 확인
 
### 2-5 관리자 페이지 기능

![제목을-입력해주세요_-018](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/037287cd-f1f6-47db-bee4-ac691fea132d)

- 1. 회원탈퇴 기능
- 2. 답변전 문의글 확인
- 3. 문의글 답변 기능

</details>


# 3. 사용 언어 및 도구
| 구분         | 내용               |
|--------------|-------------------|
| LANGUAGE    | <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" /> <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white" /> |
| DB  | <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black" />|
| Collaboration |<img src="https://bookface-images.s3.amazonaws.com/logos/1f147b7526b12554a4ea7cd2312a694892459acc.png?1630010761" width="90"> |
| BACK-END  |  ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)|
| FRONT-END  | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)|
| storage   | ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) |
| Framework | <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />  ![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)  |
| WebServer    | ![Apache Tomcat](https://img.shields.io/badge/apache%20tomcat-%23F8DC75.svg?style=for-the-badge&logo=apache-tomcat&logoColor=black) <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />   |
| IDE   | <img src="https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white" /> ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)|



# 4. 시스템 흐름도

![제목을 입력해주세요_-001](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/fba40d8b-1ac1-43f9-a72d-9ef4198d56b3)



# 5. ER 다이어그램

![2](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/123911778/7ad2409c-7309-4c30-93e2-094589d994c4)




# 6. 시스템 아키텍처

![제목을-입력해주세요_-014](https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/assets/142488306/153acd97-7efd-4569-9ab5-cbe95bde1e3c)



# 7. 화면 구성

<details>
    <summary>화면구성 보기</summary>
<!-- summary 아래 한칸 공백 두고 내용 삽입 -->
   
   #### 7-1 메인 페이지
   ![제목 없는 동영상 - Clipchamp로 제작](https://github.com/yusuyeon1111/portfolio/assets/142488306/e94a754c-fa5c-4b7a-b925-be1531f704f0)

   #### 7-2 회원가입 & 로그인 페이지
   ![제목 없는 동영상 - Clipchamp로 제작](https://github.com/yusuyeon1111/portfolio/assets/142488306/f06b7c39-26ac-47eb-af1f-bc2d8ed32edc)
   
   #### 7-3 커뮤니티 페이지
 ![-Clipchamp3-ezgif com-video-to-gif-converter](https://github.com/yusuyeon1111/portfolio/assets/142488306/b5dfbf08-3f8d-4344-bc32-18f00510663f)
 
   #### 7-4 마이페이지 & 고객센터 페이지
![-Clipchamp5-ezgif com-video-to-gif-converter](https://github.com/yusuyeon1111/portfolio/assets/142488306/3d90494b-3cd9-4401-8763-cca21fa97364)

#### 7-5 이미지 업로드 & 체형 분석 결과 페이지
![제목 없는 동영상 - Clipchamp로 제작 (1)](https://github.com/yusuyeon1111/portfolio/assets/142488306/f3d0c30a-822e-4ffa-9381-7b83d1868d7b)

#### 7-6 사이즈 등록 페이지
![제목 없는 동영상 - Clipchamp로 제작 (1)](https://github.com/yusuyeon1111/portfolio/assets/142488306/f2eb06b4-19fb-4061-9660-477c28c7c9d0)

#### 7-7 아바타 페이지
![제목 없는 동영상 - Clipchamp로 제작 (3)](https://github.com/yusuyeon1111/portfolio/assets/142488306/7ac9ad8e-718b-4b45-930a-8e6966b6eed4)

#### 7-8 관리자 페이지
 ![image](https://github.com/yusuyeon1111/portfolio/assets/142488306/919ebf59-9f54-4013-976c-cf189de56682)
 
</details>

# 8. 트러블 슈팅
<details>
   <summary> 1. 모델링 성능 이슈 </summary>
   
- opencv에 내장되어있는 caffe 모델을 사용했을 때 모든 아바타를 남성으로 판단하는 문제가 발생 -> keras로 변경해 98.58%까지 정확도를 개선함.
- YOLO segment 모델은 사람을 판별하는데 특화된 모델이 아니어서 성능이 높지 않은 문제가 발생함 -> roboflow를 사용해 직접 학습시켜 44.5% 였던 정확도를 92.4%까지 개선함.
</details>

# 9. 참고문헌

- Virtual Try on을 사용한 가상피팅
(https://github.com/minar09/cp-vton-plus)


# 10. 개발환경
|                     분류 | 설명                                                              |
|-------------------------:|-------------------------------------------------------------------|
| 운영체제                 | Windows10                                                         |
| 버전 관리 시스템         | Github                                                            |
| 개발 도구                | Eclipse IDE (2023-06), Jupyter notebook, vs code                  |
| 개발 언어 및 프레임 워크 | Java 1.8.0_202, Js, Python 3.11.4, conda 23.7.2                   |
| 데이터 베이스            | ORACLE 11                                                         |
| 하드웨어                 | NVIDIA GeForce RTX 2070,Intel(R) Core(TM) i7-10700 CPU,RAM 16.0GB |



# 11. 팀원소개
| <a href="https://github.com/kkksssmmmm"><img src="https://avatars.githubusercontent.com/u/105231826?v=4" width="100px;" height="100px;" alt=""/><br /><sub><b> 팀장 : 김성민</b></sub></a> | <a href="https://github.com/Jinkyun0328"><img src="https://avatars.githubusercontent.com/u/123911778?v=4" width="100px;" alt=""/><br /><sub><b> 부팀장 : 최진균</b></sub></a> | <a href="https://github.com/ggody2"><img src="https://avatars.githubusercontent.com/u/117277864?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 유수연</b></sub></a> | <a href="https://github.com/phc1235"><img src="https://avatars.githubusercontent.com/u/142488051?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 하동철</b></sub></a> |
|:----------------:|---------------------|------------------------ |------------------------|
| 프로젝트 기획     | AI 모델링            | BACK-END 개발           | 데이터 수집 및 전처리    |
| BACK-END 개발    | AWS 클라우스 서비스   | FRONT-END 개발          | DB 모델링               |
| FRONT-END 개발   | Flask 서버 구축      |                         |                         |                                            

# 12. 링크
|                     이름 | 설명                                                              | 링크                                                                |
|-------------------------:|-------------------------------------------------------------------:|-------------------------------------------------------------------|
| Letmein                  | Spring Boot  |      https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein/tree/main                                                              |
| Letmein-Front            | React           |     https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein-front                                                               |
| Letmein-Flask            | Flask            |    https://github.com/2023-SMHRD-IS-CLOUD-1/Letmein-Flask                                                               |







