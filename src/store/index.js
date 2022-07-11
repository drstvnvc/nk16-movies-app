import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/slice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;

// const initialState = {
//   auth: null,
//   movies: [],
// };

// const setUserAction = {
//   type: "setActiveUser",
//   payload: {
//     id: 1,
//     email: "asdfa@asdf.com",
//     name: "asfesf",
//   },
// };
// store.dispatch(setUserAction);

// function deleteMovie(movieId) {
//   return {
//     type: "deleteMovie",
//     payload: movieId,
//   };
// }
// store.dispatch(deleteMovie(1));

// store.dispatch(deleteMovie(5));

// function reducer(state = initialState, action) {
//   const { type, payload } = action;
//   if (type == "logout") {
//     return {
//       ...state,
//       user: null,
//     };
//   }
//   if (type == "setActiveUser") {
//     return {
//       ...state,
//       user: payload,
//     };
//   }
//   if (type == "deleteMovie") {
//     return {
//       ...state,
//       movies: state.movies.filter((id) => id !== payload),
//     };
//   }
//   return state;
// }

// function authReducer(state = null, action) {
//   if (action.type == "setActiveUser") {
//     return action.payload;
//   }
//   if (action.type == "logout") {
//     return null;
//   }
//   return state;
// }

// function moviesReducer(state = [], action) {
//   if (action.type == "setMovies") {
//     return action.payload;
//   }
//   if (action.type == "addMovie") {
//     return [...state, action.payload];
//   }
//   if (action.type == "deleteMovie") {
//     return state.filter((movie) => movie.id !== action.payload.id);
//   }
//   return state;
// }
