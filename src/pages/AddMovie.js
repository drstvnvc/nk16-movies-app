import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import movieService from "../services/MovieService";

export default function AddMovie() {
  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    image_url: "",
    duration: 0,
    release_date: "",
    genre: "",
  });

  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null;

    if (id) {
      data = await movieService.edit(id, movieData);
      history.push("/movies");
    } else {
      data = await movieService.add(movieData);
      history.push(`movies/${data.id}`);
    }

    if (!data) {
      alert("The new movie is not created");
      return;
    }
  };

  const handleReset = () => {
    setMovieData({
      title: "",
      director: "",
      image_url: "",
      duration: 0,
      release_date: "",
      genre: "",
    });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const { id: _, created_at, ...restData } = await movieService.get(id);

      setMovieData(restData);
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add new"} </h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          minLength={2}
          value={movieData.title}
          placeholder="Title"
          onChange={({ target }) =>
            setMovieData({ ...movieData, title: target.value })
          }
        />
        <input
          required
          minLength={2}
          value={movieData.director}
          placeholder="Director"
          onChange={({ target }) =>
            setMovieData({ ...movieData, director: target.value })
          }
        />
        <input
          required
          minLength={2}
          value={movieData.image_url}
          placeholder="Image url"
          onChange={({ target }) =>
            setMovieData({ ...movieData, image_url: target.value })
          }
        />
        <input
          required
          type="number"
          min={1}
          max={600}
          value={movieData.duration}
          placeholder="Duration"
          onChange={({ target }) =>
            setMovieData({ ...movieData, duration: target.value })
          }
        />
        <input
          required
          type="date"
          value={movieData.release_date}
          placeholder="Release date"
          onChange={({ target }) =>
            setMovieData({ ...movieData, release_date: target.value })
          }
        />
        <input
          required
          minLength={2}
          value={movieData.genre}
          placeholder="Genre"
          onChange={({ target }) =>
            setMovieData({ ...movieData, genre: target.value })
          }
        />
        <button>{id ? "Save" : "Add"}</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
