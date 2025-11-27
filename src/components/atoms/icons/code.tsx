import React from 'react';

interface Props {
  className?: string;
}

const CodeIcon: React.FC<Props> = ({ className }) => (
  <svg
    className={`icon icon-tabler icons-tabler-outline icon-tabler-code ${className || ''}`}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-roledescription="Code Icon"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l4 4l-4 4" />
    <path d="M14 4l-4 16" />
  </svg>
);

export default CodeIcon;
