# 배포 가이드

이 프로젝트는 GitHub Actions를 쓰지 않습니다. 로컬에서 빌드한 결과물을
`gh-pages` npm 패키지로 `gh-pages` 브랜치에 직접 push하는 방식입니다.

## 배포 명령어

```bash
npm run deploy
```

이 한 줄로 끝입니다. 내부적으로 다음이 순서대로 실행됩니다.

1. `predeploy` 훅 자동 실행 → `npm run build` (`tsc -b && vite build`) → `dist/` 생성
2. `echo 'depaier.com' > ./dist/CNAME` → 커스텀 도메인 파일 생성
3. `gh-pages -d dist` → `dist/` 내용을 `gh-pages` 브랜치에 커밋하고 origin에 push
   (매번 새로 덮어쓰는 방식이라 브랜치 히스토리를 신경 쓸 필요 없음)

## 배포 전 체크리스트

- [ ] `main` 브랜치에 배포하려는 변경사항이 커밋되어 있는지 확인
      (배포 자체엔 필수는 아니지만, 나중에 "뭘 배포했었는지" 추적하려면 필요)
- [ ] `npm run build`가 로컬에서 에러 없이 도는지 확인하고 싶으면
      `npm run build` 먼저 단독 실행해봐도 됨

## 배포 후 확인

- https://depaier.com 접속해서 확인 (커스텀 도메인)
- 또는 https://depaier.github.io/depaier.github.io
- 반영까지 1~2분 정도 걸릴 수 있음 (GitHub Pages 캐시/CDN)

## GitHub 저장소 설정 (한 번만 확인하면 되는 것들)

Settings → Pages 에서:
- **Source**: `gh-pages` 브랜치, `/ (root)` 경로로 되어 있어야 함
- **Custom domain**: `depaier.com`으로 설정되어 있어야 하고, 배포 시 생성되는
  `dist/CNAME` 파일 내용과 일치해야 함 (안 그러면 GitHub이 커스텀 도메인 설정을 리셋할 수 있음)

## 문제 생겼을 때

- 배포 결과가 이상하면: `npm run deploy`를 다시 실행 (gh-pages 브랜치를 새로 덮어씀)
- 사이트가 404거나 도메인이 풀렸으면: Settings → Pages에서 Source/Custom domain 설정이
  위 내용과 일치하는지 확인
- 로컬 build 결과를 미리 보고 싶으면: `npm run build && npm run preview`
