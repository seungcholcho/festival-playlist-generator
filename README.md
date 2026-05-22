# 🎵 Festival Playlist Generator

페스티벌 라인업 포스터 사진을 올리면, 아티스트 목록을 자동으로 추출하고 Spotify / YouTube Music 플레이리스트를 생성해주는 웹앱입니다.

**🔗 Live Demo:** [festival-playlist-generator.vercel.app](https://festival-playlist-generator.vercel.app)

---

## 📱 주요 기능

- **라인업 자동 분석** — 페스티벌 포스터 이미지를 업로드하면 Claude Vision AI가 날짜별 아티스트 목록을 자동 추출
- **관심 아티스트 선택** — 날짜별 탭으로 분류된 아티스트 목록에서 원하는 아티스트만 선택
- **대표곡 플레이리스트 생성** — Last.fm API 기반 실제 재생수 데이터로 각 아티스트의 대표곡 2~3곡 자동 추천
- **Spotify Export** — OAuth 인증 후 선택한 곡들로 Spotify 플레이리스트 자동 생성
- **YouTube Music Export** — Google OAuth 인증 후 YouTube Music 플레이리스트 자동 생성
- **모바일 최적화** — 모바일 우선 반응형 UI

---

## 🛠 기술 스택

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Python + FastAPI
- Anthropic Claude API (Vision)
- Last.fm API
- Spotify Web API
- YouTube Data API v3

### Infra
- Vercel (Frontend)
- Render (Backend)
- GitHub

---

## 🚀 로컬 실행 방법

### 1. 레포 클론
```bash
git clone https://github.com/seungcholcho/festival-playlist-generator.git
cd festival-playlist-generator
```

### 2. 백엔드 설정
```bash
cd backend
pip install -r requirements.txt
```

`backend/.env` 파일 생성:
```
ANTHROPIC_API_KEY=your_key
LAST_FM_API_KEY=your_key
SPOTIFY_CLIENT_ID=your_key
SPOTIFY_CLIENT_SECRET=your_key
SPOTIFY_REDIRECT_URI=http://127.0.0.1:5173/callback
YOUTUBE_CLIENT_ID=your_key
YOUTUBE_CLIENT_SECRET=your_key
YOUTUBE_REDIRECT_URI=http://127.0.0.1:5173/callback/youtube
```

백엔드 실행:
```bash
uvicorn main:app --reload
```

### 3. 프론트엔드 설정
```bash
cd frontend
npm install
```

`frontend/.env` 파일 생성:
```
VITE_API_URL=http://127.0.0.1:8000
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:5173/callback
VITE_YOUTUBE_CLIENT_ID=your_youtube_client_id
VITE_YOUTUBE_REDIRECT_URI=http://127.0.0.1:5173/callback/youtube
```

프론트엔드 실행:
```bash
npx vite --host 127.0.0.1
```

---

## 🔑 API 키 발급

| 서비스 | 발급 URL |
|---|---|
| Anthropic Claude | [console.anthropic.com](https://console.anthropic.com) |
| Last.fm | [last.fm/api](https://www.last.fm/api) |
| Spotify | [developer.spotify.com](https://developer.spotify.com) |
| YouTube Data API | [console.cloud.google.com](https://console.cloud.google.com) |

---

## 📁 프로젝트 구조

```
festival-playlist-generator/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── routers/
│   │   └── lineup.py
│   └── services/
│       ├── vision.py      # Claude Vision API
│       ├── lastfm.py      # Last.fm API
│       ├── spotify.py     # Spotify API
│       └── youtube.py     # YouTube API
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── UploadSection.jsx
    │   │   ├── LineupSection.jsx
    │   │   ├── PlaylistSection.jsx
    │   │   └── ExportSection.jsx
    │   ├── hooks/
    │   │   ├── useLineup.js
    │   │   ├── usePlaylist.js
    │   │   ├── useSpotify.js
    │   │   └── useYoutube.js
    │   └── pages/
    │       ├── SpotifyCallback.jsx
    │       └── YoutubeCallback.jsx
    └── vercel.json
```

---

## 🔄 서비스 흐름

```
1. 이미지 업로드
      ↓
2. Claude Vision API → 날짜별 아티스트 추출
      ↓
3. 관심 아티스트 선택
      ↓
4. Last.fm API → 대표곡 조회
      ↓
5. Spotify / YouTube Music OAuth 로그인
      ↓
6. 플레이리스트 자동 생성
```

---

## ⚠️ 제한 사항

- Spotify Development Mode: 최대 5명의 등록 유저만 사용 가능
- YouTube OAuth: 테스트 유저만 사용 가능 (Google 심사 전)
- Render 무료 플랜: 15분 미사용 시 서버 슬립 (첫 요청 30초~1분 소요)

---

## 👨‍💻 개발자

조승철 — [GitHub](https://github.com/seungcholcho)
