import React, { useRef, useState } from "react";

const images = import.meta.glob("../assets/images/Photographs/*.jpg", { eager: true });
const photos = Object.values(images).map(img => img.default || img);

const DraggablePhotography = ({ onClose }) => {
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  const [pos, setPos] = useState({ x: 180, y: 140 });
  const [size, setSize] = useState({ w: 520, h: 420 });
  const [fullScreenImg, setFullScreenImg] = useState(null);

  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const resizing = useRef(false);

  /* ---------------- DRAG ---------------- */
  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
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
      <div
        ref={dragRef}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, width: size.w, height: size.h }}
        className="fixed z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div onMouseDown={onMouseDown} className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
          <span className="font-semibold">Photography</span>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow hover:scale-105 transition cursor-pointer"
                onClick={() => setFullScreenImg(photo)}
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={resizeRef}
          onMouseDown={onResizeDown}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize bg-gray-400 opacity-70"
        />
      </div>

      {fullScreenImg && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
          <button onClick={() => setFullScreenImg(null)} className="absolute top-4 right-4 text-white text-3xl font-bold">✕</button>
          <img src={fullScreenImg} alt="Full Photography" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </>
  );
};

export default DraggablePhotography;
