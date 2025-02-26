const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Scrolling clouds */}
      <div className="absolute inset-0 animate-scroll">
        <div className="absolute inset-0 flex items-center whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-32 h-16 bg-white opacity-80 rounded-full mx-16" />
          ))}
        </div>
      </div>
      
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-b from-green-800 to-green-900">
        <div className="absolute top-0 w-full h-4 bg-green-700"></div>
      </div>
    </div>
  );
};

export default Background;