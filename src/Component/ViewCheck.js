import React from "react";

const View = ({ data }) => {
  return (
    <div>
        <input type={"text"} value={data.priceUnitary}></input>
      <p>Name: {data?.name}</p>
      <p>priceUnitary: {data?.priceUnitary}</p>
      <p>description: {data?.description}</p>
    </div>
  );
};

export default View;