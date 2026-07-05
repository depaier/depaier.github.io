import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";

type View = "grid" | "detail" | "spread" | "list";

const ease = [0.22, 1, 0.36, 1] as const;

// 스크린(288×622px 고정) 기준 좌표 — 앱2-3 시안에서 추출
// 배열 순서 = 리스트 순서 (첫 사진이 06.19, 하루씩 증가)
const PHOTOS = [
  { src: "/sora/sky.png", x: 65, y: 375, w: 56 },
  { src: "/sora/photo-1.png", x: 39, y: 169, w: 83 },
  { src: "/sora/photo-2.png", x: 169, y: 191, w: 59 },
  { src: "/sora/photo-3.png", x: 136, y: 307, w: 36 },
  { src: "/sora/photo-4.png", x: 182, y: 346, w: 28 },
];

const dateFor = (i: number) => `06.${19 + i}`;

// 구름 안 사진 콜라주 배치(% — 구름 실루엣으로 클리핑됨)
const COLLAGE = [
  { src: "/sora/photo-1.png", left: 3, top: 26, w: 37 },
  { src: "/sora/photo-2.png", left: 36, top: 22, w: 33 },
  { src: "/sora/photo-3.png", left: 65, top: 32, w: 26 },
  { src: "/sora/photo-4.png", left: 46, top: 52, w: 21 },
  { src: "/sora/sky.png", left: 10, top: 48, w: 31 },
];

// 상세 화면 큰 구름의 위치/크기 (spread 시 위로 올라가며 축소)
const CLOUD_BIG = { top: 226, width: 176 };
const CLOUD_SMALL = { top: 72, width: 56 };
const CLOUD_CENTER = {
  x: 144,
  y: CLOUD_BIG.top + CLOUD_BIG.width / 2,
};

/** 사진 조각이 채워진 구름 (그리드 썸네일용) */
function CloudCollage() {
  return (
    <div className="cc">
      <div className="cc-clip">
        {COLLAGE.map((p) => (
          <img
            key={p.src}
            className="cc-photo"
            src={p.src}
            alt=""
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.w}%` }}
          />
        ))}
      </div>
      <img className="cc-outline" src="/sora/cloud-face.png" alt="" />
    </div>
  );
}

// 그리드에서 아래 줄(오래된 구름)일수록 흐려짐
const tileFade = (i: number) =>
  i < 3
    ? undefined
    : i < 6
    ? { opacity: 0.5, filter: "grayscale(0.4)" }
    : { opacity: 0.35, filter: "grayscale(0.7)" };

export default function CloudsScreen() {
  const [view, setView] = useState<View>("grid");
  const [sel, setSel] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselReady = useRef(false);

  // AnimatePresence(mode="wait")로 인해 리스트 DOM은 이전 화면 퇴장 후 마운트됨
  // → 마운트되는 순간 ref 콜백에서 클릭한 사진 위치로 즉시 이동
  const attachCarousel = (el: HTMLDivElement | null) => {
    carouselRef.current = el;
    if (el && !carouselReady.current) {
      carouselReady.current = true;
      el.scrollLeft = sel * el.clientWidth;
    }
  };

  // 좌우 스크롤에 맞춰 현재 사진 인덱스 갱신 (날짜/도트 표시용)
  const onCarouselScroll = () => {
    const box = carouselRef.current;
    if (!box) return;
    const i = Math.round(box.scrollLeft / box.clientWidth);
    if (i !== sel && i >= 0 && i < PHOTOS.length) setSel(i);
  };

  const goTo = (i: number) =>
    carouselRef.current?.scrollTo({
      left: i * carouselRef.current.clientWidth,
      behavior: "smooth",
    });

  const spread = view === "spread";
  const branch = view === "grid" ? "grid" : view === "list" ? "list" : "cloud";

  return (
    <div className="clouds-screen">
      <AnimatePresence mode="wait">
        {branch === "grid" && (
          <motion.div
            key="grid"
            className="cg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <h3 className="cg-title">내 구름들</h3>
            <div className="cg-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  className="cg-tile"
                  onClick={() => setView("detail")}
                >
                  <div className="cg-tile-cloud" style={tileFade(i)}>
                    <CloudCollage />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {branch === "cloud" && (
          <motion.div
            key="cloud"
            className="cd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* 제목/부제 — 사진이 퍼지면 사라짐 */}
            <motion.div
              className="cd-head"
              initial={false}
              animate={{ opacity: spread ? 0 : 1, y: spread ? -10 : 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <h3 className="cg-title">내 구름</h3>
              <p className="cd-sub">이전 구름은 9일 후 사라집니다</p>
            </motion.div>

            {/* 구름: 탭하면 위로 올라가며 사진들이 퍼져 나옴 */}
            <motion.div
              className="cd-cloud"
              initial={false}
              animate={spread ? CLOUD_SMALL : CLOUD_BIG}
              transition={{ duration: 0.65, ease }}
              onClick={() => setView(spread ? "detail" : "spread")}
            >
              <div className="cc-clip">
                <motion.div
                  className="cc-fill"
                  initial={false}
                  animate={{ opacity: spread ? 0 : 1 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {COLLAGE.map((p) => (
                    <img
                      key={p.src}
                      className="cc-photo"
                      src={p.src}
                      alt=""
                      style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.w}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              <img className="cc-outline" src="/sora/cloud-face.png" alt="구름" />
            </motion.div>

            {/* 퍼져 나온 사진들 */}
            <AnimatePresence>
              {spread &&
                PHOTOS.map((p, i) => {
                  const fromX = CLOUD_CENTER.x - (p.x + p.w / 2);
                  const fromY = CLOUD_CENTER.y - (p.y + p.w / 2);
                  return (
                    <motion.img
                      key={p.src}
                      className="cd-photo"
                      src={p.src}
                      alt=""
                      style={{ left: p.x, top: p.y, width: p.w, height: p.w }}
                      initial={{ x: fromX, y: fromY, scale: 0.2, opacity: 0 }}
                      animate={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        transition: {
                          delay: 0.12 + i * 0.06,
                          duration: 0.65,
                          ease,
                        },
                      }}
                      exit={{
                        x: fromX,
                        y: fromY,
                        scale: 0.2,
                        opacity: 0,
                        transition: { duration: 0.35, ease },
                      }}
                      onClick={() => {
                        carouselReady.current = false;
                        setSel(i);
                        setView("list");
                      }}
                    />
                  );
                })}
            </AnimatePresence>
          </motion.div>
        )}

        {branch === "list" && (
          <motion.div
            key="list"
            className="cl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <button
              className="cl-back"
              aria-label="뒤로가기"
              onClick={() => setView("spread")}
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>
            <div className="cl-head">
              <div className="app-date">{dateFor(sel)}</div>
              <div className="app-time">18:00</div>
            </div>
            {/* 좌우 스와이프 캐러셀 */}
            <div
              className="cl-carousel"
              ref={attachCarousel}
              onScroll={onCarouselScroll}
            >
              {PHOTOS.map((p) => (
                <img key={p.src} className="cl-photo" src={p.src} alt="" />
              ))}
            </div>
            <div className="cl-dots">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  className={i === sel ? "on" : ""}
                  aria-label={`사진 ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
