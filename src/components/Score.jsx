const Score = ({ score }) => {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl font-bold text-white shadow-text">
      {score}
    </div>
  );
};

export default Score;