import React, { useEffect, useState } from 'react';
import { fetchTutorial } from '../utils/fetchTutorials';
import YouTubeVideo from './YouTubeVideo';

const TutorialDetail = ({ match }) => {
  const [tutorial, setTutorial] = useState(null);
  const tutorialId = match.params.id;

  useEffect(() => {
    const getTutorial = async () => {
      const fetchedTutorial = await fetchTutorial(tutorialId);
      setTutorial(fetchedTutorial);
    };
    getTutorial();
  }, [tutorialId]);

  if (!tutorial) return <div>Loading...</div>;

  return (
    <div className="tutorial-detail">
      <h2>{tutorial.title}</h2>
      <YouTubeVideo videoId={tutorial.videoId} />
      <p>{tutorial.content}</p>
    </div>
  );
};

export default TutorialDetail;
