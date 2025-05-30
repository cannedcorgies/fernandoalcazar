import React from 'react';
import projects from '../data/projects';
import ProjectCard from './ProjectCard';

const Gallery = () => {
  const cardSpacing = 100; // base vertical spacing between cards (px)
  const jitter = 20; // vertical randomness (px)

  return (
    <div className="relative w-1/2 h-screen bg-neutral-100 overflow-hidden">
      {projects.map((project, index) => {
        const randomX = Math.floor(Math.random() * 50); // 0–49%
        const baseY = index * cardSpacing;
        const randomJitter = Math.floor(Math.random() * jitter); // 0–19px
        const finalY = baseY + randomJitter;

        const style = {
          left: `${randomX}%`,
          top: `${finalY}px`,
        };

        return (
          <ProjectCard
            key={project.id}
            title={project.title}
            image={require (`.${project.image}`)}
            style={style}
          />
        );
      })}
    </div>
  );
};

export default Gallery;
