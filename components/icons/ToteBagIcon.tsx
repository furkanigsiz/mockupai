import React from 'react';

const ToteBagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 21V15" />
        <path d="M16 21V15" />
        <path d="M3.5 9H20.5" />
        <path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
        <path d="M8 9a4 4 0 0 1 8 0" />
    </svg>
);

export default ToteBagIcon;
