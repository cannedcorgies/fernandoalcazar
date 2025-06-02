import { useState, useEffect } from "react";

export default function Typewriter({
  words = [],
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
}) {
  const [index, setIndex] = useState(0); // word index
  const [subIndex, setSubIndex] = useState(0); // letter index
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index]?.length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  // blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className={`font-serif ${className}`}>
      {`${words[index]?.substring(0, subIndex) || ""}${blink ? "|" : " "}`}
    </div>
  );
}
