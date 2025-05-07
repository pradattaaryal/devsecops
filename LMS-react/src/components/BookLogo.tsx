import React from 'react';

interface BookIconProps {
  color?: string;
}

const BookIcon: React.FC<BookIconProps> = ({ color = "black" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill={color}>
      <path d="M100 40 L160 20 L160 140 L100 160 L40 140 L40 20 L100 40" fill="none" stroke={color} strokeWidth="8" />
      <path d="M100 40 L100 160" stroke={color} strokeWidth="8" />
      <path d="M40 20 C60 30, 80 35, 100 40 C120 35, 140 30, 160 20" fill="none" stroke={color} strokeWidth="8" />
      <path d="M40 60 C60 70, 80 75, 100 80" fill="none" stroke={color} strokeWidth="4" />
      <path d="M40 80 C60 90, 80 95, 100 100" fill="none" stroke={color} strokeWidth="4" />
      <path d="M40 100 C60 110, 80 115, 100 120" fill="none" stroke={color} strokeWidth="4" />
    </svg>
  );
};

export default BookIcon;