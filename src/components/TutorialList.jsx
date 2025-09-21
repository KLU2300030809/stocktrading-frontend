import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Use Link for routing without reloading the page
import { fetchTutorials } from '../utils/fetchTutorials';

const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const getTutorials = async () => {
      const fetchedTutorials = await fetchTutorials();  // Fetch all tutorials
      setTutorials(fetchedTutorials);
    };
    getTutorials();
  }, []);

  return (
    <div className="tutorial-list">
      <h2>Stock Trading Tutorials</h2>
      <ul>
        {tutorials.map((tutorial) => (
          <li key={tutorial.id}>
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
            <Link to={`/tutorials/${tutorial.id}`}>Read more</Link>  {/* Link to the tutorial detail */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorialList;
