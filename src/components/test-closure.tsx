import React, { useEffect, useState } from "react";
import { useMount } from "utils";

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useMount(() => {
    setInterval(() => {
      console.log("num in setInterval", num);
    }, 1000);
  });

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, []);
  return (
    <div>
      <button onClick={add}>add</button>
      <p>{num}</p>
    </div>
  );
};
