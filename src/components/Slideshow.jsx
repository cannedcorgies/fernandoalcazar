import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    title: "First Project Title",
    subtitle: "Something whimsical, emotional, tactile.",
    image: "https://picsum.photos/id/1018/1920/1080",
    link: "#",
  },
  {
    id: 2,
    title: "Second Showcase",
    subtitle: "A prototype about rain, memory, and bugs.",
    image: "https://picsum.photos/id/1025/1920/1080",
    link: "#",
  },
  {
    id: 3,
    title: "Recent Diary Entry",
    subtitle: "What I'm feeling lately as a dev & person.",
    image: "https://picsum.photos/id/1043/1920/1080",
    link: "#",
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const slideInterval = useRef(null);

  const pauseSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const startSlideTimer = () => {
    pauseSlideTimer();
    if (!isManual) {
      slideInterval.current = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsManual(true);
    pauseSlideTimer();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsManual(true);
    pauseSlideTimer();
  };

  const goToSlide = (idx) => {
    setCurrent(idx);
    setIsManual(true);
    pauseSlideTimer();
  };

  useEffect(() => {
    startSlideTimer();

    return () => pauseSlideTimer();
  }, [isManual]); // <- triggers once initially, then disables when isManual is true

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseLeave={startSlideTimer}
    >
      {slides.map((slide, index) => (
        <a
          href={slide.link}
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current
              ? "opacity-100 z-20"
              : "opacity-0 z-0 pointer-events-none"
          }`}
          aria-label={slide.title}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4 hover:bg-opacity-40 transition duration-300">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-white text-lg md:text-xl max-w-2xl">
              {slide.subtitle}
            </p>
          </div>
        </a>
      ))}

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl z-30"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl z-30"
        aria-label="Next Slide"
      >
        ❯
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
