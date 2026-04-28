import React from 'react'

type   ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  };

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button
