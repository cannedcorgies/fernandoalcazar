import React, { useState, useMemo, useEffect } from 'react';
import projects from '../data/cardData.json';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import Typewriter from './Typewriter';

const Gallery = () => {
  const [selectedId, setSelectedId] = useState(1);
  const cardSpacing = 300;
  const jitter = 20;

  // Stable position generation
  const projectPositions = useMemo(() => {
    return projects.map((_, index) => {
      const randomX = Math.floor(Math.random() * 30);
      const baseY = index * cardSpacing;
      const randomJitter = Math.floor(Math.random() * jitter);
      const finalY = baseY + randomJitter + window.innerHeight * 1.45;

      return {
        left: `${randomX}%`,
        top: `${finalY}px`,
      };
    });
  }, []); // Only generated once

  const handleSelect = (id) => {
    setSelectedId((prevId) => (prevId = id));
    setShowDetail(false); // reset
    const timeout = setTimeout(() => setShowDetail(true), 100); // slight delay to trigger transition
    return () => clearTimeout(timeout);
  };

  const selectedProject = projects.find((p) => p.id === selectedId);

  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setShowDetail(false); // reset
    const timeout = setTimeout(() => setShowDetail(true), 100); // slight delay to trigger transition
    return () => clearTimeout(timeout);
  }, [selectedId]);

  return (
    <div className="w-screen font-serif">

      <div className="fixed w-screen h-screen blur-lg">
        <img
          src={require(`./${selectedProject.image}`)}
          alt={selectedProject.title}
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="absolute w-screen h-[125vh] bg-[linear-gradient(180deg,rgba(0,0,0,1)_60%,rgba(255,255,255,0)_100%)] pointer-events-none z-20" />
      <div className="fixed w-screen h-screen bg-[linear-gradient(90deg,rgba(0,0,0,1)_30%,rgba(255,255,255,0)_100%)] pointer-events-none" />

      {/*<h1 className="fixed text-center top-48 left-48 text-4xl font-bold ">fernando jose alcazar</h1>*/}
      <Typewriter
        words={["fernando alcazar", "alcazarfjose", "cannedcorgies"]}
        link={"https://www.linkedin.com/in/alcazarfjose/"}
        className="fixed top-48 left-48 text-4xl font-bold text-center text-white z-30"
      />

      {/* Left column: cards */}
      <div className="w-1/2 z-40">
        {projects.map((project, index) => {
          const style = {
            position: 'absolute',
            ...projectPositions[index],
          };

          return (
            <ProjectCard
              key={project.id}
              title={project.title}
              image={require(`./${project.image}`)}
              color={project.color}
              textColor={project.textColor}
              style={style}
              isSelected={selectedId === project.id}
              link={project.link}
              onClick={() => handleSelect(project.id)}
            />
          );
        })}
      </div>

      {/* Right column: detail view */}
      <ProjectDetail
        key={selectedProject.id}  // 👈 this forces React to re-mount on project change
        project={selectedProject}
        show={showDetail}
      />

      <Typewriter
        words={[selectedProject.title]}
        className="fixed text-center top-36 right-48 text-4xl font-bold z-10 text-white"
        link = {selectedProject.link}
      />

      <Typewriter
        words={selectedProject.skills}
        className={`fixed bottom-8 right-10 text-xl text-right font-bold text-left w-[20%] z-10 text-${selectedProject.textColor}`}
      />
    </div>
  );
};

export default Gallery;
