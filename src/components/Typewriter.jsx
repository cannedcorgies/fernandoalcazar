import { useState, useEffect, useRef } from "react";

export default function Typewriter({
  words = [],
  className = "",
  link = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  const prevWordsRef = useRef([]);

  // Reset ONLY if words truly change in content
  useEffect(() => {
    const prevWords = prevWordsRef.current;
    const hasChanged =
      prevWords.length !== words.length ||
      prevWords.some((w, i) => w !== words[i]);

    if (hasChanged) {
      setIndex(0);
      setSubIndex(0);
      setDeleting(false);
      prevWordsRef.current = words;
    }
  }, [words]);

  // Main typing logic
  useEffect(() => {
    if (subIndex === words[index]?.length + 1 && !deleting) {
      if (words.length === 1) return;
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (subIndex === 0 && deleting) {
      if (words.length === 1) return;
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  // Cursor blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const content = `${words[index]?.substring(0, subIndex) || ""}${blink ? "|" : " "}`;

  return (
    <div className={`font-serif ${className}`}>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline cursor-pointer"
        >
          {content}
        </a>
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
}
