const NoteSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow animate-pulse space-y-3">
      
      {/* Title */}
      <div className="h-5 w-2/3 bg-gray-200 rounded"></div>

      {/* Content lines */}
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    </div>
  );
};

export default NoteSkeleton;
