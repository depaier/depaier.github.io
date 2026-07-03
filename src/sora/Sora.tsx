import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import PhoneDemo from "./PhoneDemo";
import "./sora.css";

const rise = [0.22, 1, 0.36, 1] as const;

/**
 * 이메일 수집 엔드포인트.
 * Formspree(https://formspree.io)에서 폼을 만든 뒤 발급받은 주소로 교체하세요.
 * 예) "https://formspree.io/f/abcdwxyz"
 * (설정 방법은 대화 내 가이드 참고)
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrewogev";

type Status = "idle" | "sending" | "done" | "error";

export default function Sora() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setMessage("올바른 이메일 주소를 입력해 주세요.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
      setEmail("");
      setMessage("등록 완료! 출시되면 가장 먼저 알려드릴게요.");
    } catch {
      setStatus("error");
      setMessage("잠시 후 다시 시도해 주세요.");
    }
  };

  const done = status === "done";

  return (
    <div className="sora-page">
      <div className="sora-inner">
        <div className="sora-left">
          {/* 손글씨가 써지듯 좌→우로 나타남 */}
          <motion.h1
            className="sora-title"
            style={{ display: "inline-block" }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: [0.42, 0, 0.2, 1] }}
          >
            다시 오지 않을 순간을 기록하다
          </motion.h1>
          {/* 제목이 써지는 동안 부제가 올라옴 */}
          <motion.p
            className="sora-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: rise }}
          >
            사라질걸 알기에
            <br />
            순간을 아끼게 해주는 기록 앱
          </motion.p>

          {/* 시간차를 두고 이메일 폼이 올라옴 */}
          <motion.form
            className="sora-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: rise }}
          >
            <div className="sora-input-wrap">
              <input
                className="sora-input"
                type="email"
                inputMode="email"
                placeholder="abc@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending" || done}
                aria-label="이메일 주소"
              />
            </div>
            <button
              className="sora-submit"
              type="submit"
              disabled={status === "sending" || done}
              aria-label="waitlist 등록"
            >
              {done ? <Check size={22} /> : <ArrowRight size={22} />}
            </button>
          </motion.form>

          {message && (
            <p className={`sora-msg ${status === "error" ? "err" : "ok"}`}>
              {message}
            </p>
          )}
        </div>

        <div className="sora-right">
          <PhoneDemo />
        </div>
      </div>
    </div>
  );
}
