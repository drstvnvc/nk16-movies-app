import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect, useParams } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";
import { selectMovie } from "../store/movies/selectors";
import { getMovie } from "../store/movies/slice";

export default function SingleMovie() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const movie = useSelector(selectMovie);

  const formattedDate = useFormattedDate(
    movie ? movie.release_date : "",
    "yyyy-MM-dd"
  );

  useEffect(() => {
    if (id) {
      dispatch(
        getMovie({
          id,
          meta: {
            onError: () => history.push("/movies"),
          },
        })
      );
    }
  }, [id]);

  if (!movie) {
    return null;
  }
  return (
    <div style={{ marginLeft: 5 }}>
      <h2>{movie.title}</h2>
      <h4>{movie.director}</h4>
      <img src={movie.image_url} width="300" height="300" />
      <p>Genre: {movie.genre}</p>
      <p>Release date: {formattedDate}</p>
    </div>
  );
}
