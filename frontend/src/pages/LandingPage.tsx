import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Import the image from its local path
import mediumStoryImage from './Medium Story Image.webp';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo">The Blog App</div>
        <nav className="nav-links">
          <Link to="/signup" className="btn btn-dark">Get started</Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="text-content">
          <h1>Human stories & ideas</h1>
          <p>A place to read, write, and deepen your understanding.</p>
          <Link to="/signup" className="btn btn-dark-solid">Start reading</Link>
        </div>

        {/* The div for graphics is now replaced with your image */}
        <div className="image-container">
            <img 
              src={mediumStoryImage} 
              alt="An artistic representation of storytelling" 
              className="landing-image"
            />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;