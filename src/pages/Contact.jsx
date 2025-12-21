import React, { useRef, useState } from "react";
import profilePic from "../assets/images/Me.png"; // replace with your image path

const DraggableContact = ({ onClose }) => {
  const dragRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  // Set initial position on the right immediately
  const initialX = window.innerWidth - 380; // 360 width + 20px margin
  const [pos, setPos] = useState({ x: initialX, y: 180 });

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
      x: Math.max(0, Math.min(window.innerWidth - 360, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 440, e.clientY - offset.current.y)),
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
      className="fixed z-50 w-[360px] h-[440px] bg-white rounded-xl shadow-2xl flex flex-col items-center overflow-auto"
    >
      {/* HEADER */}
      <div
        onMouseDown={onMouseDown}
        className="cursor-move bg-gray-900 text-white px-4 py-2 rounded-t-xl flex justify-between items-center w-full"
      >
        <span className="font-semibold">Contact</span>
        <button onClick={onClose} className="text-lg">✕</button>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col items-center text-center text-gray-700">
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 shadow-md object-cover"
        />
        <h2 className="text-xl font-semibold mb-2">Contact Me</h2>
        <p>Email: <a href="mailto:charithagattu248@example.com" className="text-blue-600 hover:underline">charithagattu248@example.com</a></p>
        <p>College Email: <a href="mailto:b23ee1021@iitj.ac.in" className="text-blue-600 hover:underline">b23ee1021@iitj.ac.in</a></p>
        <p>Phone: +91 99085 91319</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/charitha-gattu" target="_blank" className="text-blue-600 hover:underline">linkedin.com/in/charitha-gattu</a></p>
        <p>GitHub: <a href="https://github.com/harrypotteris" target="_blank" className="text-blue-600 hover:underline">github.com/harrypotteris</a></p>
      </div>
    </div>
  );
};

export default DraggableContact;
