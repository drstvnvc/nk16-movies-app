import { call, put, takeLatest } from "redux-saga/effects";

import {
  addMovie,
  deleteMovie,
  deleteMovieSuccess,
  getMovie,
  getMovies,
  setMovie,
  setMovies,
  setMovieErrors,
} from "./slice";
import movieService from "../../services/MovieService";

function* getMoviesHandler() {
  try {
    const movies = yield call(movieService.getAll);
    yield put(
      setMovies({
        currentPage: movies.current_page,
        data: movies.data,
      })
    );
  } catch (e) {
    console.error(e);
  }
}

function* getMovieHandler({ payload }) {
  try {
    const movie = yield call(movieService.get, payload.id);
    yield put(setMovie(movie));
    if (payload.meta.onSuccess) {
      yield call(payload.meta.onSuccess);
    }
  } catch (e) {
    console.error(e);
    if (payload.meta.onError) {
      yield call(payload.meta.onError);
    }
  }
}

function* deleteMovieHandler({ payload: movieId }) {
  try {
    yield call(movieService.delete, movieId);
    yield put(deleteMovieSuccess(movieId));
  } catch (e) {
    console.log(e);
  }
}

function* handleAddMovie({ payload }) {
  const { meta, movie } = payload;
  try {
    const newMovie = yield call(movieService.add, movie);
    if (meta.onSuccess) {
      yield call(meta.onSuccess, newMovie);
    }
  } catch (e) {
    console.log(e);
    if (e.response.status == 422) {
      yield put(setMovieErrors(e.response.data.errors));
    }
  }
}

export function* watchGetMovies() {
  yield takeLatest(getMovies.type, getMoviesHandler);
}
export function* watchGetMovie() {
  yield takeLatest(getMovie.type, getMovieHandler);
}
export function* watchDeleteMovie() {
  yield takeLatest(deleteMovie.type, deleteMovieHandler);
}
export function* watchAddMovie() {
  yield takeLatest(addMovie.type, handleAddMovie);
}
