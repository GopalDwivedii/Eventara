interface ComingSoonProps {
  pageName: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{pageName}</h2>
        <p className="text-gray-600">This page is under construction</p>
      </div>
    </div>
  );
};
