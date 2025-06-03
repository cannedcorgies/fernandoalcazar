import { useState, useEffect } from "react";

export default function Typewriter({
  words = [],
  className = "",
  link = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
}) {
  const [index, setIndex] = useState(0); // word index
  const [subIndex, setSubIndex] = useState(0); // letter index
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {

    // if word typed out...
    if (subIndex === words[index]?.length + 1 && !deleting) {
      if (words.length === 1) return; // stop here if just one word
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    // repeat; delete top one
    if (subIndex === 0 && deleting) {
      if (words.length === 1) return; // again, stop here if just one
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }


    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  // outside of bank...
    useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setDeleting(false);
  }, [words]);

  // blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className={`font-serif ${className}`}>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline cursor-pointer"
        >
          {`${words[index]?.substring(0, subIndex) || ""}${blink ? "|" : " "}`}
        </a>
      ) : (
        <span>
          {`${words[index]?.substring(0, subIndex) || ""}${blink ? "|" : " "}`}
        </span>
      )}
    </div>
  );
}
