import React from 'react';

const ProjectCard = ({ title, image, color, textColor, style, isSelected, onClick }) => {
  return (
    <div
      className={`content-center rounded-lg cursor-pointer overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105 ${
          isSelected ? "h-64 z-50" : "w-48 h-48 blur-sm z-40"}`}
      style={style}
      onClick={onClick}
      
    >
      <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      <div className="relative w-full h-full">
        {!isSelected && (
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;