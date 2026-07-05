import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play } from "lucide-react";
import CloudsScreen from "./CloudsScreen";

type Phase = "idle" | "capture" | "write" | "result";
type Tab = "home" | "clouds";

// 하단 네비게이션 아이콘 (svg 원본 크기 유지)
const NAV_ITEMS = [
  { id: "home", src: "/sora/home.svg", w: 17 },
  { id: "clouds", src: "/sora/cloud.svg", w: 20 },
  { id: "doc", src: "/sora/doc.svg", w: 14 },
  { id: "setting", src: "/sora/setting.svg", w: 16 },
] as const;

// 타이밍(ms)
const START_DELAY_MS = 1000; // 버튼 클릭 후 시작까지
const TIMER_MS = 60000; // 60초 촬영 타이머(시각용)
const FLASH_MS = 350; // 셔터 플래시

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhoneDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [tab, setTab] = useState<Tab>("home");
  const [cycle, setCycle] = useState(0); // 타이머 애니메이션 재시작용
  const [flash, setFlash] = useState(false);
  const [secs, setSecs] = useState(60);
  const [note, setNote] = useState("");
  const busy = useRef(false);
  const startRef = useRef<number | undefined>(undefined);

  // "테스트해보기" → 1초 뒤 촬영 모드로 시작 (자동 시작 아님)
  const start = () => {
    window.clearTimeout(startRef.current);
    busy.current = false;
    setNote("");
    setTab("home");
    setPhase("idle"); // 홈으로 리셋 (사진 제거)
    startRef.current = window.setTimeout(() => {
      setCycle((c) => c + 1);
      setPhase("capture");
    }, START_DELAY_MS);
  };

  // 네비게이션 탭 전환 (home/clouds만 동작)
  const onNav = (id: (typeof NAV_ITEMS)[number]["id"]) => {
    if (id !== "home" && id !== "clouds") return;
    window.clearTimeout(startRef.current);
    busy.current = false;
    setFlash(false);
    setPhase("idle");
    setTab(id);
  };

  useEffect(() => () => window.clearTimeout(startRef.current), []);

  // 셔터: 플래시 후 감정 기록 화면으로
  const triggerCapture = () => {
    if (busy.current) return;
    busy.current = true;
    setFlash(true);
    window.setTimeout(() => {
      setFlash(false);
      setPhase("write");
    }, FLASH_MS);
  };

  // 구름(사진 조각 버튼) 클릭 처리
  const onCloud = () => {
    if (phase === "capture") triggerCapture();
    else if (phase === "write") setPhase("result"); // 기록 완료 → 홈으로
  };

  // 촬영 타이머 카운트다운(시각적 표시용)
  useEffect(() => {
    setSecs(60);
    if (phase !== "capture") return;
    const id = window.setInterval(
      () => setSecs((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => window.clearInterval(id);
  }, [phase, cycle]);

  const inCapture = phase === "capture";
  const inWrite = phase === "write";
  const inButton = inCapture || inWrite; // 구름이 작은 버튼 상태
  const viewportOpen = inCapture || inWrite; // 상단 뷰포트 펼침
  const showPhoto = inWrite || phase === "result";

  return (
    <div className="phone-demo">
      <div className="phone">
        {/* 앱 화면 (프레임 뒤, 유리 영역에 배치) */}
        <div className="phone-screen">
          {tab === "clouds" ? (
            /* 두 번째 탭: 내 구름들 */
            <CloudsScreen />
          ) : (
            <>
          {/* 앱 헤더 */}
          <div className="app-header">
            <div className="app-date">06.19</div>
            <div className="app-time">18:00</div>
          </div>

          {/* 상단 뷰포트: 촬영 사진(앞) + 감정 기록 화면(뒤) */}
          <motion.div
            className="sky-panel"
            initial={false}
            animate={{ height: viewportOpen ? 290 : 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* 감정 기록 화면 (뒤) */}
            <div className="write-screen">
              <AnimatePresence>
                {inWrite && (
                  <motion.div
                    key="write-inner"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.35, duration: 0.4, ease }}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <p className="write-prompt">
                      지금 느낀 감정을
                      <br />한 줄로 적어주세요
                    </p>
                    <input
                      className="write-input"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="예) 오늘 하늘은 유난히 맑았다"
                      maxLength={40}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 촬영 사진 (앞) — 기록 단계에서 위로 슬라이드 */}
            <motion.img
              className="sky-shot"
              src="/sora/sky.png"
              alt="촬영 화면"
              initial={false}
              animate={{ y: inWrite ? "-100%" : "0%" }}
              transition={{ duration: 0.7, ease }}
            />
          </motion.div>

          {/* 구름: 촬영 버튼 ↔ 홈(사진 조각 품음) */}
          <div className="cloud-anchor">
            <motion.div
              className={`cloud${inButton ? " is-button" : ""}`}
              initial={false}
              animate={{ y: inButton ? 190 : 0, scale: inButton ? 0.42 : 1 }}
              transition={{ duration: 0.7, ease }}
              onClick={onCloud}
              whileTap={inButton ? { scale: 0.38 } : undefined}
            >
              {/* 촬영된 작은 정사각형 조각 (구름 실루엣으로 클리핑) */}
              <div className="cloud-photo-clip">
                <motion.img
                  className="cloud-photo"
                  src="/sora/sky.png"
                  alt="촬영된 하늘"
                  initial={false}
                  animate={{
                    opacity: showPhoto ? 1 : 0,
                    scale: showPhoto ? 1 : 0.5,
                    // 홈으로 올라올 때 관성으로 늦게 따라오며 흔들려 정착
                    y: phase === "result" ? [16, -5, 0] : 0,
                    rotate: phase === "result" ? [-9, 4, 0] : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { type: "spring", stiffness: 500, damping: 18 },
                    y: { duration: 0.8, ease: "easeOut", delay: 0.12 },
                    rotate: { duration: 0.8, ease: "easeOut", delay: 0.12 },
                  }}
                />
              </div>
              <img className="cloud-img" src="/sora/cloud-face.png" alt="구름" />
            </motion.div>
          </div>

          {/* 안내 */}
          <AnimatePresence>
            {inButton && (
              <motion.span
                className="cloud-hint"
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                {inCapture ? "탭하여 촬영" : "구름을 눌러 완료"}
              </motion.span>
            )}
          </AnimatePresence>

          {/* 셔터 플래시 */}
          <AnimatePresence>
            {flash && (
              <motion.div
                className="capture-flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: FLASH_MS / 1000, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
            </>
          )}

          {/* 하단 바: 네비게이션바 ↔ 타이머 */}
          <div className="bottom-bar">
            <motion.nav
              className="bar-nav"
              initial={false}
              animate={{ opacity: inButton ? 0 : 1, y: inButton ? 10 : 0 }}
              transition={{ duration: 0.4, ease }}
              style={{ pointerEvents: inButton ? "none" : "auto" }}
            >
              {NAV_ITEMS.map((item) => {
                const active =
                  (item.id === "home" && tab === "home") ||
                  (item.id === "clouds" && tab === "clouds");
                return (
                  <button
                    key={item.id}
                    className={`bar-nav-item${active ? " active" : ""}`}
                    onClick={() => onNav(item.id)}
                    aria-label={item.id}
                  >
                    {active && (
                      <motion.span
                        className="bar-nav-dot"
                        layoutId="bar-nav-dot"
                        transition={{ duration: 0.35, ease }}
                      />
                    )}
                    <img src={item.src} alt="" style={{ width: item.w }} />
                  </button>
                );
              })}
            </motion.nav>
            <motion.div
              className="bar-timer"
              initial={false}
              animate={{ opacity: inCapture ? 1 : 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <motion.div
                key={cycle}
                className="bar-timer-fill"
                initial={{ width: "100%" }}
                animate={{ width: inCapture ? "0%" : "100%" }}
                transition={{
                  duration: inCapture ? TIMER_MS / 1000 : 0.3,
                  ease: "linear",
                }}
              />
              <div className="bar-timer-label">{secs}s</div>
            </motion.div>
          </div>
        </div>

        {/* 아이폰 프레임 (유리 영역 투명 → 콘텐츠 위에 올림) */}
        <img className="phone-frame" src="/sora/frame.png" alt="" />
      </div>

      <button className="test-btn" onClick={start}>
        <Play size={16} fill="currentColor" strokeWidth={0} />
        앱에서 테스트해보기
      </button>
    </div>
  );
}
