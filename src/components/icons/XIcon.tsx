import React from 'react';

type XIconProps = {
  className?: string;
};

const XIcon: React.FC<XIconProps> = ({ className }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M19.7526 4.65852C20.1163 4.24288 20.0742 3.61112 19.6585 3.24744C19.2429 2.88375 18.6111 2.92587 18.2474 3.34151L12.639 9.75114L13.9307 11.3121L19.7526 4.65852Z" fill="currentColor"/>
      <path d="M11.3609 14.249L10.0692 12.688L4.24744 19.3415C3.88375 19.7571 3.92587 20.3889 4.34151 20.7526C4.75715 21.1163 5.38891 21.0742 5.75259 20.6585L11.3609 14.249Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.46443 6.27506C2.38544 4.97116 3.31282 3 5.00527 3H7.40942C8.00539 3 8.57032 3.26579 8.95027 3.72494L20.5353 17.7249C21.6143 19.0288 20.6869 21 18.9944 21H16.5904C15.9944 21 15.4295 20.7342 15.0495 20.2751L3.46443 6.27506ZM5.00527 5L5.00528 5L16.5904 19L18.9944 19L7.40942 5H5.00527Z" fill="currentColor"/>
    </svg>
  );
};

export default XIcon;
