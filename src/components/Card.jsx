import React, { useState } from "react";

export default function Card({ title, size, image, color, link, description, date, skills, isOpen, onToggle }) {
  const [rgbOverlay] = useState(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`);
  const isLarge = size === "large";

  return (
    <div
      className={`${
        (isOpen&&isLarge) ? "col-span-4 row-span-4" : (isOpen) ? "col-span-2 row-span-3" :isLarge ? "col-span-4 row-span-2" : "col-span-2 row-span-1"
      }  transition-all duration-300`}
    >
      {/* Thumbnail */}
      <div
        className={`${
            (isOpen) ? "h-1/2" :  "h-full"
        } w-full cursor-pointer relative`}
        onClick={onToggle}
      >
        <img
          src={require(image)}
          alt={title}
          className="object-cover w-full h-full rounded-lg"
        />
        {/* Overlay */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-lg transition-opacity duration-300"
            style={{ backgroundColor: rgbOverlay }}
          />
        )}
        <div className="absolute bottom-2 left-2 text-white text-sm font-bold drop-shadow">
          {title}
        </div>
      </div>

      {/* Expanded Detail Panel */}
      {isOpen && (
        <div className="mt-2 bg-white shadow-xl rounded-xl p-6 text-sm w-full h-1/2 transition-all duration-500 ease-in-out relative">
          <p className="text-gray-600 italic mb-1">{date}</p>
          <p className="text-gray-800 mb-2 whitespace-pre-line">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center rounded"
            title="Open Project"
          >
            ↗
          </a>
        </div>
      )}
    </div>
  );
}
