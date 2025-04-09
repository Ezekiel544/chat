import { useEffect, useState } from "react";

const Counter = ({ from, to, symbol, isVisible, duration = 5 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isVisible) return; // Only start counting when visible

    let start = from;
    const steps = duration * 30; // Adjusted steps for better control
    const increment = Math.max(1, Math.ceil((to - from) / steps));

    const interval = setInterval(() => {
      start += increment;
      if (start >= to) {
        start = to;
        clearInterval(interval);
      }
      setCount(start);
    }, 50); // Faster interval for 100%, slower for others

    return () => clearInterval(interval);
  }, [isVisible, from, to, duration]);

  return (
    <span className="text-5xl font-bold text-green-500">
      {count}
      <span className="text-gray-500">{symbol}</span>
    </span>
  );
};

export default Counter;
