import React from 'react';
import Typewriter from './Typewriter';

const ProjectDetail = ({ project, show }) => {
  if (!project) return null;

  const baseClasses = "fixed transition-all duration-[2000ms] ease-in-out transform";
  const enterClasses = show
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-10";
  console.log(show);

  return (
    <div>
      <h2 className={`${baseClasses} top-64 right-24 text-xl italic z-10 text-${project.textColor} ${enterClasses}`}>{project.subtitle}</h2>
      <p className={`${baseClasses} bottom-48 right-10 text-sm z-10 text-${project.textColor} ${enterClasses}`}>{project.date}</p>
      <p className={`${baseClasses} text-wrap top-80 right-24 text-sm w-[30%] z-10 text-${project.textColor} ${enterClasses}`}>"{project.text}"</p>
    </div>
  );
};

export default ProjectDetail;
