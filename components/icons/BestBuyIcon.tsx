
import React from 'react';

const BestBuyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="200" height="40" rx="4" fill="#FFC107"/>
        <text fill="#000" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" x="10" y="28">
            BEST
        </text>
        <text fill="#000" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" x="90" y="28">
            BUY
        </text>
    </svg>
);

export default BestBuyIcon;
