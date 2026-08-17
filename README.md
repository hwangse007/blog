# 블로그 자동 글쓰기 도우미 — 배포 방법 (초보자용, Vercel 무료 배포)

이 앱은 사용자가 사진과 메모만 넣으면 블로그 초안(제목/본문/해시태그)을 만들어줍니다.
API 키는 **운영자(당신)만** 등록하면 되고, 가족/친구는 그냥 **공용 비밀번호**만 입력해서 사용합니다.

---

## 준비물

1. Claude API 키 — https://console.anthropic.com 가입 후 "API Keys" 메뉴에서 발급 (`sk-ant-...` 형태)
   - 유료 사용량 기준 결제수단 등록이 필요해요. 소규모 사용(가족 몇 명)이면 한 달에 몇 천 원~1만 원 내외로 예상돼요.
   - 콘솔에서 "사용량 한도(Spend limit)"를 설정해두면 예상 밖의 과금을 막을 수 있어요.
2. 가족/친구에게 알려줄 **공용 비밀번호** 하나 (예: `우리가족블로그2026`)
3. GitHub 계정 (무료 가입)
4. Vercel 계정 (https://vercel.com — GitHub 계정으로 바로 로그인 가능, 무료)

---

## 배포 단계

### 1) GitHub에 이 폴더 올리기
1. https://github.com 에서 새 저장소(Repository)를 만듭니다. (예: `naver-blog-writer`)
2. 이 `app` 폴더 안의 파일 전체(`index.html`, `api/generate.js`, `package.json`)를 그 저장소에 업로드합니다.
   - GitHub 웹사이트에서 "Add file → Upload files"로 드래그해서 올려도 됩니다. 터미널 명령어를 쓸 필요 없어요.

### 2) Vercel에서 배포
1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. "Add New... → Project" 클릭
3. 방금 만든 `naver-blog-writer` 저장소 선택 → "Import"
4. 별다른 설정 없이 "Deploy" 클릭 (자동으로 인식됩니다)

### 3) 환경변수(비밀 정보) 등록
1. 배포된 프로젝트 페이지에서 "Settings → Environment Variables" 로 이동
2. 아래 두 개를 추가합니다.
   - `ANTHROPIC_API_KEY` = 1번에서 발급받은 Claude API 키
   - `ACCESS_PASSWORD` = 가족/친구에게 알려줄 공용 비밀번호
3. 저장 후, "Deployments" 탭에서 가장 최근 배포 옆 "..." 메뉴 → **Redeploy** 를 눌러 환경변수를 반영합니다.

### 4) 완성!
- `https://naver-blog-writer-xxxx.vercel.app` 같은 주소가 생성됩니다.
- 이 주소와 비밀번호만 가족/친구에게 알려주면, 그들은 API 키가 뭔지 몰라도 바로 사용할 수 있어요.

---

## 비용 관리 팁

- Anthropic 콘솔(console.anthropic.com) → Settings → Limits 에서 월 사용 한도를 설정해두세요.
- 사용자가 5명 이하, 하루 몇 번씩 쓰는 정도면 월 비용은 크지 않은 편입니다 (사진 개수와 글 길이에 따라 달라짐).
- 비밀번호는 주기적으로 바꾸고 싶으면 Vercel 환경변수에서 `ACCESS_PASSWORD` 값만 바꾸고 Redeploy 하면 됩니다.

## 문제가 생기면

- "비밀번호가 틀렸어요" 오류 → Vercel 환경변수의 `ACCESS_PASSWORD`와 실제 입력값이 일치하는지 확인
- "서버에 ANTHROPIC_API_KEY 환경변수가 설정되지 않았어요" → 환경변수 등록 후 Redeploy를 안 했을 가능성이 높아요
- API 오류(401/403) → API 키가 유효한지, 결제수단이 등록됐는지 console.anthropic.com에서 확인
