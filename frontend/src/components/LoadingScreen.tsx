import { useEffect, useState } from "react";

function LoadingDots() {
  return (
    <div className="flex space-x-1 justify-center items-center">
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}

function LoadingScreen() {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const dots = ".".repeat(dotCount);

  return (
    <div className="flex items-center justify-center p-4">
      <div className=" p-12 text-center">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-4 tracking-wide">
            Connecting to the room{dots}
          </h1>
          <p className="mb-8 text-sm font-medium">
            Preparing your chat experience
          </p>
          <div className="mb-6">
            <LoadingDots />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
