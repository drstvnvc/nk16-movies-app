export function selectCounterValue(state) {
  console.log("selectCounterValue", state);
  return state.counter.value;
}

export function selectMovies(state) {
    return state.movies.allMovies;
}