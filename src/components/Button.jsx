import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ title, containerClass, leftIcon, rightIcon, id }) => {
  return (
    <button
      id={id}
      className={twMerge(
        `group relative flex space-x-1 items-cent justify-center z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black`,
        containerClass,
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>

      {rightIcon}
    </button>
  );
};
export default Button;
