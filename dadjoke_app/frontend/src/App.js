import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/joke');
      setJoke(res.data.joke_text);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke('Could not fetch a joke. Please try again later.');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card text-center" style={{ width: '30rem' }}>
        <div className="card-header">
          Dad Joke of the Moment
        </div>
        <div className="card-body">
          <p className="card-text fs-4">{joke}</p>
          <button onClick={fetchJoke} className="btn btn-primary">Get Another Joke</button>
        </div>
        <div className="card-footer text-muted">
          So bad, it's good.
        </div>
      </div>
    </div>
  );
}

export default App;
