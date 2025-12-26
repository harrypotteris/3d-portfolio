import React, { useRef, useState } from "react";
import meImage from "../assets/images/Me.png";


const DraggableAbout = ({ onClose }) => {
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 120, y: 100 });
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
      x: Math.max(0, Math.min(window.innerWidth - 600, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 350, e.clientY - offset.current.y)),
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
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="fixed z-50 w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      {/* HEADER */}
      <div
        onMouseDown={onMouseDown}
        className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center"
      >
        <span className="font-semibold">About Me</span>
        <button onClick={onClose} className="text-lg">✕</button>
      </div>

      {/* CONTENT */}
      <div className="flex p-4 gap-4">
        
        {/* IMAGE */}
        <div className="w-1/3">
          <img
            src="src/assets/images/Me.png"
            alt="Charitha"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* ABOUT TEXT */}
        <div className="w-2/3 text-sm text-gray-700">
          <p className="mb-2">
            Hi, I'm <span className="font-semibold">Charitha</span>.
          </p>
          <p className="mb-2">
            I’m a B.Tech student with a strong interest in technology,
            creativity, and self-expression.
          </p>
          <p>
            I enjoy exploring new ideas and working on projects that challenge
            and inspire me. Outside academics, I love photography, drawing,
            and other creative pursuits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraggableAbout;
