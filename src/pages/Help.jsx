import React, { useRef, useState } from "react";

const Help = ({ onClose }) => {
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    setPos({
      x: Math.max(160, Math.min(window.innerWidth - 160, e.clientX - offset.current.x + 160)),
      y: Math.max(130, Math.min(window.innerHeight - 130, e.clientY - offset.current.y + 130)),
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={dragRef}
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
      className="fixed z-50 w-[320px] h-[260px] bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      {/* HEADER */}
      <div
        onMouseDown={onMouseDown}
        className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center"
      >
        <span className="font-semibold">How to Use</span>
        <button onClick={onClose} className="text-lg">✕</button>
      </div>
        <div className="p-4 text-sm text-gray-700 bg-center">
        <p>
          To use this vending machine, click on the number of the item you want. 
          The item will drop and appear in front of you. When clicked, it opens the corresponding page.
          Hope you enjoy exploring!
        </p>  
      </div>
    </div>
  );
};

export default Help;
