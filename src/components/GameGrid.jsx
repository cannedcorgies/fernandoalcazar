import React, { useState } from "react";
import Card from "./Card";
import cardData from './cardData.json';

const cards = [
  {
    id: 1,
    title: "Watering Simulator",
    image: "https://picsum.photos/id/1050/600/400",
    size: "small",
    color: { r: 173, g: 216, b: 230 },
    link: "https://example.com/rainwalk",
    description: "I wanted to capture the feeling of walking through a soft rain, with puddles forming and the soft squish under your feet.",
    date: "April 2024",
    skills: ["Unity", "Shaders", "Sound Design"]
  },
  {
    id: 2,
    title: "Rainwalk",
    image: "https://picsum.photos/id/1062/600/400",
    size: "large",
    color: { r: 135, g: 206, b: 250 },
    link: "https://example.com/bugparade",
    description: "This was a joy to make. It began with a beetle animation I liked and turned into a story about celebration and hidden rhythms.",
    date: "March 2024",
    skills: ["Animation", "Narrative Design", "FMOD"]
  },
  {
    id: 3,
    title: "Ladybug Logic",
    image: "https://picsum.photos/id/1027/600/400",
    size: "small",
    color: { r: 255, g: 192, b: 203 },
    link: "https://example.com/umbrelladrift",
    description: "Inspired by the idea of using an umbrella as a boat, this game is about directionless floating and choosing when to paddle.",
    date: "February 2024",
    skills: ["Physics", "Rapid Prototyping", "Exploration"]
  },
  {
    id: 4,
    title: "Memory Crawl",
    image: "https://picsum.photos/id/1040/600/400",
    size: "small",
    color: { r: 135, g: 206, b: 250 },
    link: "https://example.com/rainwalk",
    description: "I wanted to capture the feeling of walking through a soft rain, with puddles forming and the soft squish under your feet.",
    date: "April 2024",
    skills: ["Unity", "Shaders", "Sound Design"]
  },
  {
    id: 5,
    title: "Umbrella World",
    image: "https://picsum.photos/id/1076/600/400",
    size: "large",
    color: { r: 255, g: 192, b: 203 },
    link: "https://example.com/bugparade",
    description: "This was a joy to make. It began with a beetle animation I liked and turned into a story about celebration and hidden rhythms.",
    date: "March 2024",
    skills: ["Animation", "Narrative Design", "FMOD"]
  },
  {
  id: 6,
    title: "Watering Simulator",
    image: "https://picsum.photos/id/1050/600/400",
    size: "small",
    color: { r: 173, g: 216, b: 230 },
    link: "https://example.com/rainwalk",
    description: "I wanted to capture the feeling of walking through a soft rain, with puddles forming and the soft squish under your feet.",
    date: "April 2024",
    skills: ["Unity", "Shaders", "Sound Design"]
  },
  {
    id: 7,
    title: "Rainwalk",
    image: "https://picsum.photos/id/1062/600/400",
    size: "small",
    color: { r: 135, g: 206, b: 250 },
    link: "https://example.com/bugparade",
    description: "This was a joy to make. It began with a beetle animation I liked and turned into a story about celebration and hidden rhythms.",
    date: "March 2024",
    skills: ["Animation", "Narrative Design", "FMOD"]
  },
  {
    id: 8,
    title: "Ladybug Logic",
    image: "https://picsum.photos/id/1027/600/400",
    size: "small",
    color: { r: 255, g: 192, b: 203 },
    link: "https://example.com/umbrelladrift",
    description: "Inspired by the idea of using an umbrella as a boat, this game is about directionless floating and choosing when to paddle.",
    date: "February 2024",
    skills: ["Physics", "Rapid Prototyping", "Exploration"]
  },
  {
    id: 9,
    title: "Memory Crawl",
    image: "https://picsum.photos/id/1040/600/400",
    size: "small",
    color: { r: 135, g: 206, b: 250 },
    link: "https://example.com/rainwalk",
    description: "I wanted to capture the feeling of walking through a soft rain, with puddles forming and the soft squish under your feet.",
    date: "April 2024",
    skills: ["Unity", "Shaders", "Sound Design"]
  },
  {
    id: 10,
    title: "Umbrella World",
    image: "https://picsum.photos/id/1076/600/400",
    size: "large",
    color: { r: 255, g: 192, b: 203 },
    link: "https://example.com/bugparade",
    description: "This was a joy to make. It began with a beetle animation I liked and turned into a story about celebration and hidden rhythms.",
    date: "March 2024",
    skills: ["Animation", "Narrative Design", "FMOD"]
  },
];

export default function GameGrid() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full px-0 py-8 grid grid-cols-10 auto-rows-[150px] gap-4">
      {cardData.cards.map((card, index) => (
        <Card
            key={index}
            title={card.name}
            date={card.date}
            size={card.size}
            image={card.image}
            link={card.link}
            color={card.color}
            description={card.text}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
