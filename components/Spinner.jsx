const LoadingSpinner = ({ color = "white" }) => {
  return (
    <div
      className={`h-8 w-8 border-4 border-${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};

export default LoadingSpinner;