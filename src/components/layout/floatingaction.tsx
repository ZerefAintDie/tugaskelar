import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, ArrowUp, X } from "lucide-react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setShowBubble(true), 3000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp tooltip bubble */}
      <AnimatePresence>
        {showBubble && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative flex items-start gap-2 px-4 py-3 rounded-2xl max-w-xs shadow-xl"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(37,211,102,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#004146", lineHeight: 1.3 }}>
                Butuh bantuan?
              </p>
              <p style={{ fontSize: "0.775rem", color: "#6b7280", marginTop: 2, lineHeight: 1.5 }}>
                Chat tim kami di WhatsApp. <br /> Akan kami balas dalam 15 menit!
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#f3f4f6" }}
            >
              <X size={10} color="#9ca3af" />
            </button>
            {/* Arrow */}
            <div
              className="absolute -bottom-2 right-6 w-4 h-2 overflow-hidden"
              style={{ transform: "translateY(0)" }}
            >
              <div
                className="w-3 h-3 rotate-45"
                style={{ background: "#fff", border: "1.5px solid rgba(37,211,102,0.25)", marginTop: -6, marginLeft: 2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons row */}
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
            >
              <ArrowUp size={18} style={{ color: "var(--foreground)" }} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.a
          href="https://wa.me/6281234567890?text=Hello!%20I'd%20like%20to%20know%20more%20about%20your%20academic%20assistance%20services."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 px-4 h-12 rounded-2xl font-bold shadow-xl"
          style={{
            background: "linear-gradient(135deg, #25D166, #1da851)",
            color: "#fff",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.875rem",
            boxShadow: "0 8px 24px rgba(37,209,102,0.4)",
            textDecoration: "none",
          }}
          onClick={() => setDismissed(true)}
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">WhatsApp</span>
        </motion.a>
      </div>
    </div>
  );
}
