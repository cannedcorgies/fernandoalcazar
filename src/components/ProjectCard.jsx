import React from 'react';

const ProjectCard = ({ title, image, style }) => {
    console.log("Loading image:", image);
  return (
    <div
      className="absolute w-24 h-24 bg-white border rounded shadow-sm cursor-pointer overflow-hidden"
      style={style}
    >
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ProjectCard;