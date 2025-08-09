const StepProgress = ({ current, steps, icons }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold
              ${
                index === current
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            {icons?.[index]}
          </div>
          <div
            className={`text-xs mt-1 ${
              index === current
                ? "text-indigo-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
