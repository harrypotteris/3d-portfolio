import React, { useState, useRef } from "react";

const Wemail = () => {
  const [open, setOpen] = useState(false);
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: window.innerWidth - 400, y: window.innerHeight - 300 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const resizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Drag logic
  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (dragging.current) {
      setPos({
        x: Math.max(size.width / 2, Math.min(window.innerWidth - size.width / 2, e.clientX - offset.current.x)),
        y: Math.max(size.height / 2, Math.min(window.innerHeight - size.height / 2, e.clientY - offset.current.y)),
      });
    } else if (resizing.current) {
      const newWidth = Math.max(300, resizeStart.current.width + (e.clientX - resizeStart.current.x));
      const newHeight = Math.max(200, resizeStart.current.height + (e.clientY - resizeStart.current.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const onMouseUp = () => {
    dragging.current = false;
    resizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Resize handle
  const onResizeMouseDown = (e) => {
    e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY, width: size.width, height: size.height };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return alert("Please fill both fields");
    const mailtoLink = `mailto:${email}?subject=Contact&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:bg-blue-600 transition overflow-hidden"
      >
        <img
          src="../assets/images/Write.png"
          alt="Write Email"
          className="w-full h-full object-cover rounded-full"
        />
      </button>

      {/* Draggable & Resizable Popup */}
      {open && (
        <div
          ref={dragRef}
          style={{
            left: pos.x,
            top: pos.y,
            width: size.width,
            height: size.height,
            transform: "translate(-50%, -50%)",
          }}
          className="fixed z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div
            onMouseDown={onMouseDown}
            className="cursor-move bg-gray-900 text-white px-4 py-2 flex justify-between items-center"
          >
            <span className="font-semibold">Contact Me :) </span>
            <button onClick={() => setOpen(false)} className="text-lg">✕</button>
          </div>

          {/* Content */}
          <form
            onSubmit={handleSubmit}
            className="p-4 flex flex-col gap-3 text-gray-700 flex-1 overflow-auto"
          >
            <input
              type="email"
              placeholder="Your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none flex-1"
              rows={6}
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Send
            </button>
          </form>

          {/* Resize handle */}
          <div
            onMouseDown={onResizeMouseDown}
            className="absolute bottom-2 right-2 w-4 h-4 bg-gray-400 cursor-se-resize rounded"
          />
        </div>
      )}
    </>
  );
};

export default Wemail;
