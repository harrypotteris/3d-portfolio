import React, { useRef, useState } from "react";
import img1 from "../assets/images/Art/img1.jpg";
import img2 from "../assets/images/Art/img2.jpg";
import img3 from "../assets/images/Art/img3.jpg";
import img4 from "../assets/images/Art/img4.jpg";

const images = [img1, img2, img3, img4];

const DraggableArt = ({ onClose }) => {
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  const [pos, setPos] = useState({ x: 140, y: 120 });
  const [size, setSize] = useState({ w: 520, h: 420 });
  const [fullScreenImg, setFullScreenImg] = useState(null);

  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const resizing = useRef(false);

  /* ---------------- DRAG ---------------- */
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
      x: Math.max(0, Math.min(window.innerWidth - size.w, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - size.h, e.clientY - offset.current.y)),
    });
  };

  /* ---------------- RESIZE ---------------- */
  const onResizeDown = (e) => {
    e.stopPropagation();
    resizing.current = true;
    offset.current = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", onResizeMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onResizeMove = (e) => {
    if (!resizing.current) return;
    const dx = e.clientX - offset.current.x;
    const dy = e.clientY - offset.current.y;

    setSize((prev) => ({
      w: Math.min(window.innerWidth - 40, Math.max(320, prev.w + dx)),
      h: Math.min(window.innerHeight - 40, Math.max(260, prev.h + dy)),
    }));

    offset.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    dragging.current = false;
    resizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousemove", onResizeMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      {/* ---------------- DRAGGABLE WINDOW ---------------- */}
      <div
        ref={dragRef}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: size.w,
          height: size.h,
        }}
        className="fixed z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* HEADER */}
        <div
          onMouseDown={onMouseDown}
          className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center"
        >
          <span className="font-semibold">Art</span>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow hover:scale-105 transition cursor-pointer"
                onClick={() => setFullScreenImg(img)}
              >
                <img
                  src={img}
                  alt={`Art ${index + 1}`}
                  className="w-full h-36 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RESIZE HANDLE */}
        <div
          ref={resizeRef}
          onMouseDown={onResizeDown}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize bg-gray-400 opacity-70"
        />
      </div>

      {/* ---------------- FULL SCREEN MODAL ---------------- */}
      {fullScreenImg && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
          <button
            onClick={() => setFullScreenImg(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            ✕
          </button>
          <img
            src={fullScreenImg}
            alt="Full Art"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
};

export default DraggableArt;
