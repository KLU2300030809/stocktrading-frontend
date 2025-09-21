// This file will contain the fetchTutorial function.

// Static data mockup
export const fetchTutorial = (id) => {
  const tutorials = [
    { id: '1', title: 'Intro to Stock Trading', description: 'Learn the basics of stock trading', content: 'Content goes here...' },
    { id: '2', title: 'Advanced Stock Trading', description: 'Advanced strategies for traders', content: 'Content goes here...' },
    // Add more tutorials as needed
  ];

  return tutorials.find((tutorial) => tutorial.id === id);
};

// If you were using an API, it would look like this:
/*
export const fetchTutorial = async (id) => {
  const response = await fetch(`/api/tutorials/${id}`);
  const data = await response.json();
  return data;
};
*/
