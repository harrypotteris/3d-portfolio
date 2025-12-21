import React, { useRef, useState } from "react";

const DraggableProjects = ({ onClose }) => {
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  const [pos, setPos] = useState({ x: 180, y: 120 });
  const [size, setSize] = useState({ width: 820, height: 520 });

  const offset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const dragging = useRef(false);
  const resizing = useRef(false);

  /* ---------- DRAG ---------- */
  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopActions);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    setPos({
      x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - offset.current.y)),
    });
  };

  /* ---------- RESIZE ---------- */
  const onResizeDown = (e) => {
    e.stopPropagation();
    resizing.current = true;

    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };

    document.addEventListener("mousemove", onResizeMove);
    document.addEventListener("mouseup", stopActions);
  };

  const onResizeMove = (e) => {
    if (!resizing.current) return;

    setSize({
      width: Math.max(600, resizeStart.current.w + (e.clientX - resizeStart.current.x)),
      height: Math.max(380, resizeStart.current.h + (e.clientY - resizeStart.current.y)),
    });
  };

  const stopActions = () => {
    dragging.current = false;
    resizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousemove", onResizeMove);
    document.removeEventListener("mouseup", stopActions);
  };

  return (
    <div
      ref={dragRef}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: size.width,
        height: size.height,
      }}
      className="fixed z-50 bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      {/* HEADER */}
      <div
        onMouseDown={onMouseDown}
        className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center select-none"
      >
        <span className="font-semibold">Projects</span>
        <button onClick={onClose} className="text-lg">✕</button>
      </div>

      {/* CONTENT */}
      <div
        className="p-4 overflow-y-auto"
        style={{ height: size.height - 48 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">

          {/* CARD 1 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">Fruits Classifier</h3>
            <p className="text-xs text-gray-500">B.Tech 2nd Year, 2025</p>
            <p className="mt-2">Built a machine learning model to classify fruits.</p>
            <p><strong>Tools:</strong> Python, Streamlit</p>
            <a
              href="https://github.com/navyasripenmetsa/CSL2050_PRML_Major_Course_Project"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              View Project
            </a>
          </div>

          {/* CARD 2 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">E-commerce Platform</h3>
            <p className="text-xs text-gray-500">B.Tech 2nd Year, 2024</p>
            <p className="mt-2">Backend system in C++ connecting users and sellers.</p>
            <p><strong>Tools:</strong> C++, HTML, CSS</p>
            <a
              href="https://github.com/Levi477/E-Commerce-Backend-CPP"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              View Project
            </a>
          </div>

          {/* CARD 3 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">Water Level Identifying Sensor</h3>
            <p className="text-xs text-gray-500">2024–2025</p>
            <p className="mt-2">Water level detection using copper-clad laminate.</p>
            <a
              href="https://drive.google.com/drive/u/0/folders/1ALOcRa4FOBPQSU4jbspT7UakCxwl6puI"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              View Project
            </a>
          </div>

          {/* CARD 4 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">Anti-Sleeping Alarm</h3>
            <p className="text-xs text-gray-500">2023–2024</p>
            <p className="mt-2">Alert device to help users stay awake.</p>
            <a
              href="https://sites.google.com/iitj.ac.in/ed-2/a5_1-anti-sleep-alarm"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              View Project
            </a>
          </div>

          {/* CARD 5 */}
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">Areas Calculator</h3>
            <p className="text-xs text-gray-500">B.Tech 1st Year, 2023</p>
            <p className="mt-2">C program for geometric area calculations.</p>
            <a
              href="https://github.com/charithaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/areascalculator"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              View Project
            </a>
          </div>

        </div>
      </div>

      {/* RESIZE HANDLE */}
      <div
        ref={resizeRef}
        onMouseDown={onResizeDown}
        className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize bg-gray-300 rounded-sm"
      />
    </div>
  );
};

export default DraggableProjects;
