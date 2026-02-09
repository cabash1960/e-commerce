import React from "react";

function Design({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-6 gap-4 ${className}`}>
      {Array.from({ length: 54 }).map((_, i) => (
        <div
          key={i}
          className="dot w-2 h-2 bg-[#96897ed3] rounded-full"
          data-index={i}
        />
      ))}
    </div>
  );
}

export default Design;
