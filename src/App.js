import React from 'react';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="flex w-screen h-screen">
      <Gallery />
      <div className="w-1/2 bg-white">{/* Detail view goes here */}</div>
    </div>
  );
}

export default App;