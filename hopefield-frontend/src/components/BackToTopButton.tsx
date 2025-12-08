import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // show button after 300px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-[#EAC30E] text-white p-4 rounded-full shadow-lg hover:bg-[#1E792C] transition-colors z-50"
      aria-label="Back to Top"
    >
      ↑
    </button>
  );
}
