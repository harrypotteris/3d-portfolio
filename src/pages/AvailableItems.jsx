import React, { useRef, useState } from "react";

const itemsList = [
  { id: "A1", name: "Icecream", description: "About" },
  { id: "A2", name: "Fries", description: "Art " },
  { id: "A3", name: "Donuts", description: "coming soon.." },
  { id: "B1", name: "Apple", description: "Projects" },
  { id: "B2", name: "Croissant", description: "Photogarphy" },
  { id: "B3", name: "Bottle", description: "Coming soon.." },
  { id: "C1", name: "Chocolate Cake", description: "Coming soon.." },
  { id: "C2", name: "Strawberry Cake", description: "Contact Details" },
  { id: "C3", name: "Coke", description: "Coming soon.." },
];

const DraggableAvailableItems = ({ onClose }) => {
  const dragRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const [pos, setPos] = useState({ x: 180, y: 100 });
  const [collapsed, setCollapsed] = useState(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    setPos({
      x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 300, e.clientY - offset.current.y)),
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
      className="fixed z-50 w-[300px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
    >
      {/* HEADER */}
      <div
        onMouseDown={onMouseDown}
        className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center"
      >
        <span className="font-semibold">Available Items</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white font-bold"
          >
            {collapsed ? "▸" : "▾"}
          </button>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>
      </div>

      {/* CONTENT */}
      {!collapsed && (
        <ul className="p-4 flex flex-col gap-2 text-gray-700">
          {itemsList.map((item) => (
            <li key={item.id} className="border-b border-gray-200 pb-1">
              <span className="font-semibold">{item.id} — {item.name}</span>
              <p className="text-sm text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DraggableAvailableItems;
