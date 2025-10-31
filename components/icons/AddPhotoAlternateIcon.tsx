import React from 'react';

const AddPhotoAlternateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8.5c0-.83-.67-1.5-1.5-1.5H5.5c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V11h-1v6H5V8h9v3z"/>
  </svg>
);

export default AddPhotoAlternateIcon;