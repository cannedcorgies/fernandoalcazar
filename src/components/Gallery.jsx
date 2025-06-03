import React, { useState, useMemo, useEffect } from 'react';
import projects from '../data/cardData.json';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import Typewriter from './Typewriter';
import Slideshow from './Slideshow';
// {"id": 1, "title": "some title", "skills": [], "subtitle": "some subtitle", "size": "small", "image": "images/someImage.jpg", "color": [0, 0, 0], "textColor": "white", "link": "https://cannedcorgies.itch.io", "text": "woah momma"}
const Gallery = () => {
  const [selectedId, setSelectedId] = useState(projects[0]?.id || -2);
  const [userHasSelected, setUserHasSelected] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const cardSpacing = 300;
  const jitter = 20;

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
  }, []);

  const handleSelect = (id) => {
    setUserHasSelected(true); // user took control
    setSelectedId(id);
    setShowDetail(false);
    const timeout = setTimeout(() => setShowDetail(true), 100);
    return () => clearTimeout(timeout);
  };

  const selectedProject = projects.find((p) => p.id === selectedId);

  useEffect(() => {
    setShowDetail(false);
    const timeout = setTimeout(() => setShowDetail(true), 100);
    return () => clearTimeout(timeout);
  }, [selectedId]);

  // autocycle the first 4 projects until user selects one
  useEffect(() => {
    if (userHasSelected) return;

    const interval = setInterval(() => {
      setSelectedId((prevId) => {
        const currentIndex = projects.findIndex(p => p.id === prevId);
        const nextIndex = (currentIndex + 1) % Math.min(3, projects.length);
        return projects[nextIndex].id;
      });
    }, 6000); // 4-second cycle

    return () => clearInterval(interval);
  }, [userHasSelected]);

  return (
    <div className="w-screen font-serif">

      {/* blurred background image */}
      <div className="fixed w-screen h-screen blur-lg">
        <img
          src={require(`./${selectedProject.image}`)}
          alt={selectedProject.title}
          className="w-screen h-screen object-cover"
        />
      </div>

      {/* dark overlays */}
      {/*<div className="absolute w-screen h-[125vh] bg-[linear-gradient(180deg,rgba(0,0,0,1)_60%,rgba(255,255,255,0)_100%)] pointer-events-none z-20" />*/}
      <div className="fixed w-screen h-screen bg-[linear-gradient(90deg,rgba(0,0,0,1)_30%,rgba(255,255,255,0)_100%)] pointer-events-none" />

      {/* text cues */}
      <Typewriter
        words={["fernando alcazar", "alcazarfjose", "cannedcorgies"]}
        link={"https://www.linkedin.com/in/alcazarfjose/"}
        className="fixed top-48 left-48 text-4xl font-bold text-center text-white z-30"
      />

      <Typewriter
        words={["start here"]}
        className={"absolute top-[2200px] left-[40%] text-4xl font-bold text-center text-white z-30"}
      />

      <Typewriter
        words={["click project names to play"]}
        className={"absolute top-[2500px] left-[45%] text-4xl font-bold text-center text-white z-30"}
      />

      <Typewriter
        words={["linkedIn"]}
        link={["https://www.linkedin.com/in/alcazarfjose"]}
        className={"absolute top-[11200px] left-96 text-4xl font-bold text-center text-white z-30"}
      />

      <Typewriter
        words={["itch.io"]}
        link={["https://cannedcorgies.itch.io/"]}
        className={"absolute top-[11300px] left-64 text-4xl font-bold text-center text-white z-30"}
      />

      <Typewriter
        words={["github"]}
        link={["https://github.com/cannedcorgies"]}
        className={"absolute top-[11400px] left-72 text-4xl font-bold text-center text-white z-30"}
      />

      {/* Project cards */}
      <div className="w-1/2 z-40">
        {projects.map((project, index) => {
          const style = {
            position: 'absolute',
            ...projectPositions[index],
          };

          return (
            <ProjectCard
              key={index}
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

      {/* project detail on the right */}
      <ProjectDetail
        key={selectedProject.id}
        project={selectedProject}
        show={showDetail}
      />

      {/* right-side title */}
      <Typewriter
        words={[selectedProject.title]}
        className="fixed text-center top-36 right-48 text-4xl font-bold z-10 text-white"
        link={selectedProject.link}
      />

      {/* skills typewriter at the bottom */}
      <Typewriter
        words={selectedProject.skills}
        className={`fixed bottom-8 right-10 text-xl text-right font-bold text-left w-[20%] z-10 text-${selectedProject.textColor}`}
      />
    </div>
  );
};

export default Gallery;
