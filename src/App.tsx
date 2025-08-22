import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, MessageCircle, ExternalLink, Mail } from "lucide-react";
import { Button } from "./components/ui/button";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

interface Dot {
  id: number;
  x: number;
  y: number;
  delay: number;
}

type Section = "intro" | "about" | "projects" | "contact";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [dots, setDots] = useState<Dot[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Generate random dots for opening animation
    const newDots: Dot[] = [];
    for (let i = 0; i < 50; i++) {
      newDots.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 1.5,
      });
    }
    setDots(newDots);

    // Hide intro after dot animation completes
    const hideTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  const projects = [
    {
      title: "miniFilm",
      description: "작은 필름 카메라",
      tech: "Swift, CoreData, LUT기반 필터",
      status: "출시됨",
      iconUrl: "/miniFilm_logo.png",
      linkUrl:
        "https://apps.apple.com/kr/app/minifilm-%EC%9E%91%EC%9D%80-%ED%95%84%EB%A6%84-%EC%B9%B4%EB%A9%94%EB%9D%BC/id6742413203",
    },
    {
      title: "DIEI",
      description: "영양제 복용 관리 앱",
      tech: "SwiftUI, CoreData",
      status: "출시됨",
      iconUrl: "/DIEI_icon.png",
      linkUrl:
        "https://apps.apple.com/us/app/diei-%EC%98%81%EC%96%91%EC%A0%9C-%EB%B3%B5%EC%9A%A9-%EA%B4%80%EB%A6%AC-%EC%95%B1/id6748877177",
    },
    {
      title: "Melater",
      description: "미래의 나에게 쓰는 일기",
      tech: "Swift, SwiftUI, Supabase, FCM",
      status: "출시됨",
      iconUrl: "/melater_logo.png",
      linkUrl:
        "https://apps.apple.com/kr/app/melater-diary-for-future-me/id6748441398",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      ref={containerRef}
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {/* Dots Animation */}
            {dots.map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{
                  x: dot.x - windowSize.width / 2,
                  y: dot.y - windowSize.height / 2,
                  scale: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: dot.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Explosion Effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 20] }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="w-full h-full bg-background rounded-full opacity-80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          {/* Navigation */}
          <motion.nav
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-card/80 backdrop-blur-md rounded-full px-3 sm:px-6 py-3 border border-border">
              <div className="flex space-x-2 sm:space-x-6 relative">
                {[
                  { key: "intro", label: "홈" },
                  { key: "about", label: "소개" },
                  { key: "projects", label: "프로젝트" },
                  { key: "contact", label: "연락처" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setCurrentSection(item.key as Section)}
                    className={`px-2 sm:px-4 py-2 rounded-full transition-all duration-300 relative z-10 text-sm sm:text-base whitespace-nowrap ${
                      currentSection === item.key
                        ? "text-primary-foreground"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {currentSection === item.key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* Main Content */}
          <div className="flex items-center justify-center min-h-screen p-8">
            <AnimatePresence mode="wait">
              {currentSection === "intro" && (
                <motion.div
                  key="intro"
                  className="text-center max-w-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {/* Name with delayed animation - Main hierarchy */}
                  <motion.h1
                    className="text-7xl md:text-9xl mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "backOut",
                      delay: 0.3,
                    }}
                  >
                    depaier
                  </motion.h1>

                  {/* App Developer with delayed animation - Secondary hierarchy */}
                  <motion.h2
                    className="text-2xl md:text-3xl mb-8 text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    App Developer
                  </motion.h2>

                  {/* Slogan text - Tertiary hierarchy */}
                  <motion.p
                    className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
                    layoutId="slogan-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    작은 아이디어로 제품을 만들자
                  </motion.p>

                  {/* Buttons with delayed animation */}
                  <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      onClick={() => setCurrentSection("projects")}
                      className="group text-base px-8 py-3"
                      size="lg"
                    >
                      프로젝트 보기
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSection("about")}
                      className="text-base px-8 py-3"
                      size="lg"
                    >
                      더 알아보기
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {currentSection === "about" && (
                <motion.div
                  key="about"
                  className="text-center max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-border"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "backOut",
                    }}
                  >
                    <ImageWithFallback
                      src="/profile.png"
                      alt="depaier profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <h2 className="text-5xl md:text-7xl mb-2">depaier</h2>
                  <p className="text-xl text-muted-foreground mb-8">
                    App Developer
                  </p>

                  <div className="space-y-6 text-lg text-muted-foreground">
                    <p>
                      안녕하세요! 작은 아이디어로 제품을 만드는 앱 개발자
                      depaier입니다.
                    </p>
                    <p>
                      사용자 경험을 최우선으로 생각하며, 간단하지만 강력한 앱을
                      만들기 위해 노력합니다.
                    </p>
                  </div>
                  <motion.div
                    className="mt-8 flex justify-center space-x-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">3</div>
                      <div className="text-sm text-muted-foreground">
                        출시된 앱
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">3년</div>
                      <div className="text-sm text-muted-foreground">
                        개발 경험
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">100+</div>
                      <div className="text-sm text-muted-foreground">
                        다운로드
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {currentSection === "projects" && (
                <motion.div
                  key="projects"
                  className="max-w-6xl w-full mx-auto mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <h2 className="text-5xl md:text-7xl text-center mb-12">
                    Projects
                  </h2>
                  <div className="grid grid-cols-1 gap-6 pb-8 max-w-4xl mx-auto">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() =>
                          project.linkUrl &&
                          window.open(
                            project.linkUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                            <ImageWithFallback
                              src={project.iconUrl}
                              alt={`${project.title} icon`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs flex-shrink-0 ${
                                  project.status === "출시됨"
                                    ? "bg-green-100 text-green-800"
                                    : project.status === "개발중"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {project.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {project.tech}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  project.linkUrl &&
                                    window.open(
                                      project.linkUrl,
                                      "_blank",
                                      "noopener,noreferrer"
                                    );
                                }}
                                className="p-1 hover:bg-accent rounded transition-colors group/link"
                              >
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover/link:text-primary transition-colors" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentSection === "contact" && (
                <motion.div
                  key="contact"
                  className="text-center max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <h2 className="text-5xl md:text-7xl mb-8">Get In Touch</h2>
                  <p className="text-xl text-muted-foreground mb-12">
                    새로운 프로젝트나 협업에 관심이 있으시다면 언제든
                    연락주세요!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.a
                      href="mailto:depaier@depaier.com"
                      className="flex items-center space-x-2 bg-card border border-border rounded-full px-6 py-3 hover:shadow-lg transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
                      <span>이메일</span>
                    </motion.a>
                    <motion.a
                      href="https://instagram.com/depaier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-card border border-border rounded-full px-6 py-3 hover:shadow-lg transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-5 h-5 group-hover:text-primary transition-colors" />
                      <span>인스타그램</span>
                    </motion.a>
                    <motion.a
                      href="https://threads.net/@depaier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-card border border-border rounded-full px-6 py-3 hover:shadow-lg transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
                      <span>스레드</span>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Background Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
