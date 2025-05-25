import { useState, useEffect } from "react";

/**
 * Renders the current time, updating every second.
 */
export default function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };

    // Update time immediately on mount
    updateTime();

    // Set up interval to update time every second
    const interval = setInterval(updateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="text-md text-gray-600">
      Current Time: {currentTime}
    </div>
  );
}