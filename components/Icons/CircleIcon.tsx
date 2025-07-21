import React from "react";
type PropsType = {
  color: "active" | "inactive";
};

const CircleIcon = ({ color }: PropsType) => {
  return (
    <svg width="7px" height="7px" viewBox="0 0 7 7" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-19.000000, -23.000000)"
          fill={color === "active" ? "#000000" : "#bfc0bf"}
          fillOpacity={color === "active" ? "1" : "0.3"}
        >
          <circle cx="22.5" cy="26.5" r="3.5"></circle>
        </g>
      </g>
    </svg>
  );
};

export default CircleIcon;
