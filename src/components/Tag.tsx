import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  active?: boolean;
}

export function Tag({ children, active = false }: TagProps) {
  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-medium ${
        active
          ? "bg-purple-600 text-white"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {children}
    </span>
  );
}
