import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 border border-pink-100 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
