import React from "react";

const Arrow = () => {
  return (
    <svg
      width="36px"
      height="15px"
      viewBox="0 0 36 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-125.000000, -20.000000)"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <g transform="translate(126.000000, 21.000000)">
            <path d="M0,6.5 L31.4857143,6.5" strokeLinecap="square"></path>
            <polyline
              transform="translate(27.149591, 6.500000) rotate(45.000000) translate(-27.149591, -6.500000) "
              points="22.8114963 2.17142857 31.4876867 2.16190476 31.4781629 10.8380952"
            ></polyline>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Arrow;
