import { SplitSquareVertical } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <SplitSquareVertical size={40} className="text-primary-600 animate-pulse-slow" />
        <h2 className="mt-4 text-xl font-display font-semibold text-gray-800">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;