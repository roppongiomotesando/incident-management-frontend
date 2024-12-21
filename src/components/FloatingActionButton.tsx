import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors duration-300"
      onClick={onClick}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}

