import React from "react";

const Routes = () => {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details" element={<Weather_Details />} />
      </Routes>
    </div>
  );
};

export default Routes;
