export function selectCounterValue(state) {
  console.log("selectCounterValue", state);
  return state.counter.value;
}
