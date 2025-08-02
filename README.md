# 📝 Similarity Worksheet Tool

프리윌린 채용 과제 프로젝트 입니다.

---

## 🚀 실행 방법

```bash
pnpm install
pnpm dev
```

> 본 프로젝트는 pnpm을 기반으로 구성되어 있습니다.

---

## ⚙️ 기술 스택

- **React** + **TypeScript**
- **Zustand** – 전역 상태 관리
- **SWR** – 데이터 요청 및 캐시 유지
- **Tailwind CSS** – 스타일링
- **Vite** – 번들링
- **pnpm** – 패키지 매니저

---

## 📁 디렉토리 구조

```
src/
├── api/                    # API 요청 및 타입 정의
│   ├── hooks/             # SWR 기반 커스텀 훅
│   └── types/             # API 응답 타입
├── components/            # UI 컴포넌트
│   ├── features/          # 기능별 컴포넌트 (WorksheetDetail, WorksheetSimilarity)
│   └── ui/                # 재사용 가능한 UI 컴포넌트 (IconButton, ProblemCard)
├── stores/                # Zustand 상태 관리
├── types/                 # 공통 타입 정의 (common.types.ts)
├── utils/                 # 유틸리티 함수
└── pages/                 # 진입 컴포넌트 (Home.tsx)
```

---

## 💡 주요 기능

📋 워크시트(WorksheetDetail)

- 문제 리스트 조회 및 표시
- 활성 문제 선택 시 파란색 테두리로 시각적 표시
- 유사 문제 조회
- 문제 삭제 기능 (활성 문제 삭제 시 자동 해제)

🔄 유사 문제(WorksheetSimilarity)

- 활성 문제 기준 유사 문제 목록 조회
- 현재 워크시트 문제는 제외 처리 (excludedProblemIds에 미포함)
- 문제 교체 (Swap) 기능 - 두 문제의 위치 서로 변경
- 문제 추가 기능 - 활성 문제 앞에 삽입 후 유사 문제 에서는 삭제

📊 통계 정보

난이도별 문제 수 실시간 집계 (하/중하/중/상/최상)
전체 문제 수 표시

---

## 🔍 고민한 점

- **비동기 요청 타이밍**: SWR의 `enabled` + `problemId` 조합으로 유연하게 요청 여부를 판단하며 삭제 시에는 빈 상태로 초기화되도록 구성했습니다.
- **상태 관리 최적화**: 전체 워크시트는 `Zustand`로 전역 관리하고, 비동기 fetch 여부 등은 컴포넌트 내부에서 로컬 상태로 처리했습니다.
- **UI 일관성 유지**: 버튼, 텍스트 박스 등 공통 컴포넌트를 재사용 가능하게 구성하고, tailwind 기반으로 `ellipsis`, `hover`, `flex` 등 유틸 클래스를 적극 활용했습니다.

---

## 🖼️ 추가

> favicon 설정 시, 귀여운 검은 고양이 이미지를 배경 제거 후 `.ico`로 변환해 적용했습니다.

---

## ✅ 마무리

간결하지만 사용자 경험에 초점을 맞춘 구조로 문제 추가/교체 흐름이 자연스럽게 이어지도록 설계했습니다. API 요청과 상태 관리 흐름에 집중하였고
실사용 환경에서도 유지보수가 쉽도록 고민한 프로젝트입니다.
