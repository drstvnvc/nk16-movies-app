import { takeLatest } from "redux-saga/effects";

import { increment, decrement } from "./slice";
// workers - do not export!
function* incrementHandler(action) {
  console.log("Increment saga worker", { action });
}

// watchers - export!

export function* watchIncrement() {
  yield takeLatest(
    increment.type, // action type
    incrementHandler // saga worker
  );
}
