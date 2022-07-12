import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
  deleteMovie() {},
  addMovie() {},
  editMovie() {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    page: {
      currentPage: 1,
      data: [],
    },
    movie: null,
    movieErrors: null,
  },
  reducers: {
    setMovies(state, action) {
      state.page = action.payload;
    },
    setMovie(state, action) {
      state.movie = action.payload;
    },
    deleteMovieSuccess(state, action) {
      state.page.data = state.page.data.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setMovieErrors(state, action) {
      state.movieErrors = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  getMovies,
  setMovies,
  getMovie,
  setMovie,
  deleteMovie,
  deleteMovieSuccess,
  addMovie,
  editMovie,
  setMovieErrors,
} = moviesSlice.actions;
export default moviesSlice.reducer;
