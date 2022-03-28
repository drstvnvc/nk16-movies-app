import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import movieService from "../services/MovieService";

export default function AppMovies() {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  const handleDelete = async (id) => {
    await movieService.delete(id);

    setMovies(movies.filter((movie) => movie.id !== id));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await movieService.getAll();

      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ marginLeft: 5 }}>
      <h2>Movies</h2>
      {movies.map((movie) => (
        <div
          key={movie.id}
          style={{
            border: "3px solid orange",
            width: 300,
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>
            <strong>Title:</strong> {movie.title}
          </p>
          <p>
            <strong>Text:</strong> {movie.text}
          </p>
          <Link to={`/movies/${movie.id}`}>View movie</Link>
          <button onClick={() => history.push(`/edit/${movie.id}`)}>
            Edit
          </button>
          <button onClick={() => handleDelete(movie.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
