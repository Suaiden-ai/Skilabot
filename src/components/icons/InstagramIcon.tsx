import React from "react";

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 512 512" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <defs>
      <linearGradient id="insta-gradient" gradientUnits="userSpaceOnUse" x1="328.27" x2="183.73" y1="508.05" y2="3.95">
        <stop offset="0" stopColor="#ffdb73"/>
        <stop offset="0.08" stopColor="#fdad4e"/>
        <stop offset="0.15" stopColor="#fb832e"/>
        <stop offset="0.19" stopColor="#fa7321"/>
        <stop offset="0.23" stopColor="#f6692f"/>
        <stop offset="0.37" stopColor="#e84a5a"/>
        <stop offset="0.48" stopColor="#e03675"/>
        <stop offset="0.55" stopColor="#dd2f7f"/>
        <stop offset="0.68" stopColor="#b43d97"/>
        <stop offset="0.97" stopColor="#4d60d4"/>
        <stop offset="1" stopColor="#4264db"/>
      </linearGradient>
    </defs>
    <rect fill="url(#insta-gradient)" height="465.06" rx="107.23" ry="107.23" width="465.06" x="23.47" y="23.47"/>
    <path fill="#fff" d="M331,115.22a66.92,66.92,0,0,1,66.65,66.65V330.13A66.92,66.92,0,0,1,331,396.78H181a66.92,66.92,0,0,1-66.65-66.65V181.87A66.92,66.92,0,0,1,181,115.22H331m0-31H181c-53.71,0-97.66,44-97.66,97.66V330.13c0,53.71,44,97.66,97.66,97.66H331c53.71,0,97.66-44,97.66-97.66V181.87c0-53.71-43.95-97.66-97.66-97.66Z"/>
    <path fill="#fff" d="M256,198.13A57.87,57.87,0,1,1,198.13,256,57.94,57.94,0,0,1,256,198.13m0-31A88.87,88.87,0,1,0,344.87,256,88.87,88.87,0,0,0,256,167.13Z"/>
    <circle fill="#fff" cx="346.81" cy="163.23" r="21.07"/>
  </svg>
);

export default InstagramIcon; 