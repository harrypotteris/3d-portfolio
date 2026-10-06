import React, { useRef, useState } from "react";

const PROJECTS = [
  {
    title: "ScreenFusion: Multi-Phone Display System",
    year: "2026 · Ongoing",
    desc: "Turns phones on the same Wi-Fi into one synchronized display. Node.js and WebSocket server with QR joining and host failover; Expo client streams heading, tilt, battery and RSSI. LLM tile assignment and Bluetooth audio sync are in progress.",
    tools: "Expo (React Native), Node.js, WebSocket, LLM",
    links: [],
  },
  {
    title: "TrendAI: Multilingual YouTube Trend Analysis",
    year: "2026",
    desc: "Four-stage pipeline on 37K+ trending snapshots: multilingual embeddings, 159 topic clusters with UMAP and HDBSCAN, view-growth regression (R² 0.204) and a viral-spike classifier (ROC-AUC 0.879).",
    tools: "Python, XGBoost, scikit-learn, Sentence-Transformers, UMAP, HDBSCAN",
    links: [{ label: "GitHub", href: "https://github.com/harrypotteris/trendai/" }],
  },
  {
    title: "Visual Companion",
    year: "2026",
    desc: "Assistive web app for visually impaired users that combines vision-language model scene description with face recognition, served by a Node.js/Express REST backend with a voice-oriented interface.",
    tools: "JavaScript, Node.js, Express, vision-language models",
    course: "Ethical Issues with AI",
    links: [
      { label: "Live Demo", href: "https://visual-companion.vercel.app/" },
      { label: "GitHub", href: "https://github.com/harrypotteris/visual-companion" },
    ],
  },
  {
    title: "Underwater Image Enhancement",
    year: "2026",
    desc: "Hybrid pipeline of Sea-Thru-inspired preprocessing, FUnIE-GAN enhancement and Real-ESRGAN super-resolution, evaluated with UIQM, entropy, colorfulness, contrast and sharpness.",
    tools: "Python, FUnIE-GAN, Sea-Thru, Real-ESRGAN, OpenCV",
    course: "Computer Vision",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/harrypotteris/underwater-image-restoration_cv",
      },
    ],
  },
  {
    title: "Real-Time Embedded Systems on STM32",
    year: "2026",
    desc: "Bare-metal firmware with register-level GPIO, external interrupts, TIM2 timing and NVIC handlers (no HAL). Includes a Whack-a-Mole reaction game and a 3×3 grid navigation system.",
    tools: "Embedded C, STM32, GPIO, EXTI, TIM2, SPI, NVIC",
    links: [
      { label: "Wack-a-Mole", href: "https://github.com/harrypotteris/wack-a-mole-embedeed" },
      { label: "Drone Control", href: "https://github.com/harrypotteris/Drone-Control-Embedded" },
    ],
  },
  {
    title: "PRML Fruit Classifier",
    year: "B.Tech 2nd Year, 2025",
    desc: "Multi-class recognition on Fruits-360 (141 classes) using RGB histograms and HOG features. SVM reached 97.07% accuracy, and the model is deployed through a Streamlit app.",
    tools: "Python, scikit-learn, HOG, Streamlit",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/navyasripenmetsa/CSL2050_PRML_Major_Course_Project",
      },
    ],
  },
  {
    title: "E-Commerce Backend System",
    year: "B.Tech 2nd Year, 2024",
    desc: "Modular C++ backend with O(1) average user lookups using unordered_map and a min-heap Top-K trending-products feature in O(n log k). Buyer and seller workflows with JSON-backed persistence.",
    tools: "C++, JSON, data structures",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/charithaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/E-Commerce-Backend-CPP",
      },
    ],
  },
  {
    title: "Water Level Identifying Sensor",
    year: "2024–2025",
    desc: "Multi-level water detection circuit with BC548C NPN transistors and LED indicators, fabricated on copper-clad laminate by manual patterning, ferric-chloride etching and soldering.",
    tools: "Analog electronics, BC548C, PCB fabrication, soldering",
    links: [
      {
        label: "Drive folder",
        href: "https://drive.google.com/drive/u/0/folders/1ALOcRa4FOBPQSU4jbspT7UakCxwl6puI",
      },
    ],
  },
  {
    title: "Anti-Sleeping Alarm",
    year: "2023–2024",
    desc: "Alert device to help users stay awake.",
    links: [
      {
        label: "View Project",
        href: "https://sites.google.com/iitj.ac.in/ed-2/a5_1-anti-sleep-alarm",
      },
    ],
  },
  {
    title: "Areas Calculator",
    year: "B.Tech 1st Year, 2023",
    desc: "C program for geometric area calculations.",
    links: [
      {
        label: "View Project",
        href: "https://github.com/charithaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/areascalculator",
      },
    ],
  },
];

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
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.year}</p>
              <p className="mt-2">{p.desc}</p>
              {p.tools && (
                <p>
                  <strong>Tools:</strong> {p.tools}
                </p>
              )}
              {p.course && (
                <p>
                  <strong>Course:</strong> {p.course}
                </p>
              )}
              {p.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-1">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
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
