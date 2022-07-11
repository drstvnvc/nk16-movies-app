import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { increment, decrement } from "../store/counter/slice";
import { selectCounterValue } from "../store/counter/selectors";

export default function Counter() {
  const dispatch = useDispatch();
  const counterValue = useSelector(selectCounterValue);

  function handleIncrement() {
    dispatch(increment());
  }
  function handleDecrement() {
    dispatch(decrement());
  }
  return (
    <div>
      <h1>Counter</h1>
      <div>value: {counterValue}</div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}
