import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Demo = () => {
  const { weather } = useSelector((state) => state.weather);
  const aa = () => {
    console.log(weather);
  };
  return (
    <div>
      <button onClick={aa}>fdgs</button>
    </div>
  );
};

export default Demo;
