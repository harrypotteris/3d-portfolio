import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Loader from "../components/Loader";
import VendingMachine from "../models/VendingMachine";

import DraggableAbout from "../pages/About";
import DraggableArt from "../pages/Art";
import DraggableProjects from "../pages/Projects";
import DraggablePhotography from "../pages/Photography";
import DraggableContact from "../pages/Contact";
import AvailableItems from "../pages/AvailableItems";
import Help from "../pages/Help";
import Wemail from "../pages/Wemial";


const Home = () => {
  const [openPanels, setOpenPanels] = useState({
    about: false,
    art: false,
    projects: false,
    photography: false,
    contact: false,
    items: false, // AvailableItems panel
    help: false, // Help panel
  });

  const open = (panel) =>
    setOpenPanels((prev) => ({ ...prev, [panel]: true }));

  const close = (panel) =>
    setOpenPanels((prev) => ({ ...prev, [panel]: false }));

  return (
    <section className="w-full h-screen relative">

      {/* ===== DRAGGABLE FLOATING WINDOWS ===== */}
      {openPanels.about && <DraggableAbout onClose={() => close("about")} />}
      {openPanels.art && <DraggableArt onClose={() => close("art")} />}
      {openPanels.projects && <DraggableProjects onClose={() => close("projects")} />}
      {openPanels.photography && <DraggablePhotography onClose={() => close("photography")} />}
      {openPanels.contact && <DraggableContact onClose={() => close("contact")} />}
      {openPanels.items && <AvailableItems onClose={() => close("items")} />}
      {openPanels.help && <Help onClose={() => close("help")} />}

      {/* ===== BUTTONS TO OPEN PANELS ===== */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded"
        onClick={() => open("items")}
      >
        Show Items
      </button>

      {/* ===== ROUND HELP BUTTON ===== */}
          <button
        className="absolute bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-blue-500 text-white text-2xl flex items-center justify-center shadow-lg"
        onClick={() => open("help")}
      >
        ?
      </button>

      {/* ===== 3D SCENE ===== */}
      <Canvas camera={{ position: [0, 1.2, 35] }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={2} />

          <OrbitControls
            enableZoom
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            enableDamping
          />

          <VendingMachine
            onOpenAbout={() => open("about")}
            onOpenProjects={() => open("projects")}
            onOpenArt={() => open("art")}
            onOpenPhotography={() => open("photography")}
            onOpenContact={() => open("contact")}
            onOpenItems={() => open("items")}
          />
        </Suspense>
      </Canvas>
      <Wemail />
    </section>
  );
};

export default Home;
