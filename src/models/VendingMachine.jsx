import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useEffect } from "react";



import VendingMachineScene from "../assets/3d/vending_machine.glb";

export default function VendingMachine({
  onOpenAbout,
  onOpenArt,
  onOpenProjects,
  onOpenPhotography,
  onOpenContact,
}) {

  const { nodes, materials } = useGLTF(VendingMachineScene);

  /* ===================== REFS & STATE ===================== */
  const productRefs = useRef({});
  const [falling, setFalling] = useState(null);

  const [focusedProduct, setFocusedProduct] = useState(null);
  const focusProgress = useRef(0);

  const [resetting, setResetting] = useState(false);

  const resetFocus = () => {
  setResetting(true);
};


  /* ===================== REGISTER FUNCTION ===================== */
const register = (name) => (el) => {
  if (el && !productRefs.current[name]) {
    productRefs.current[name] = {
      ref: el,
      startY: el.position.y,
      startZ: el.position.z,
      startScale: el.scale.clone(),
    };
  }
};

  
  
  /* ===================== FALL ANIMATION ===================== */
  let speed = 0.02;

  useFrame(() => {
    if (!falling) return;

    const obj = productRefs.current[falling];
    if (!obj) return;

    speed += 0.002;
    obj.ref.position.y -= speed;

    let distanceMultiplier = 1;

    if (falling.startsWith("B")) distanceMultiplier = 1.8;
    if (falling.startsWith("A")) distanceMultiplier = 2.5;

    if (obj.ref.position.y < obj.startY - 3 * distanceMultiplier) {
      speed = 0.02;
      setFalling(null);
      setFocusedProduct(falling);
      focusProgress.current = 0;
    }
  });

  useFrame(() => {
    if (!focusedProduct) return;

    const obj = productRefs.current[focusedProduct];
    if (!obj) return;

    // move to center screen
    obj.ref.position.y += (1 - obj.ref.position.y) * 0.15;
    obj.ref.position.z += (-5 - obj.ref.position.z) * 0.15;

    // scale up
    obj.ref.scale.x += (1.8 - obj.ref.scale.x) * 0.15;
    obj.ref.scale.y += (1.8 - obj.ref.scale.y) * 0.15;
    obj.ref.scale.z += (1.8 - obj.ref.scale.z) * 0.15;
  
  
  });
  
  

useEffect(() => {
  const handler = () => resetFocus();
  window.addEventListener("resetProduct", handler);
  return () => window.removeEventListener("resetProduct", handler);
}, []);


  /* ===================== JSX ===================== */
  return (
      <group

  dispose={null}
  rotation={[0, Math.PI, 0]}

>


      {/* ========== MACHINE BODY ========== */}
      <mesh geometry={nodes.walls.geometry} material={materials.Material} />
      <mesh geometry={nodes.VendingMachine.geometry} material={materials["Material.001"]} />

      {/* ROWS */}
      <mesh geometry={nodes.row.geometry} material={materials["Material.002"]} />
      <mesh geometry={nodes.row001.geometry} material={materials["Material.003"]} />
      <mesh geometry={nodes.row002.geometry} material={materials["Material.004"]} />

      {/* SCREEN */}
      <mesh geometry={nodes.Screen.geometry} material={materials["Material.006"]} />

      {/* BUTTON BOX */}
      <mesh geometry={nodes.BottonBox.geometry} material={materials["Material.005"]} />

      {/* ========== BUTTONS ========== */}
      <mesh geometry={nodes.A.geometry} material={materials["Material.007"]} onClick={() => setFalling("A1")} />
      <mesh geometry={nodes.A001.geometry} material={materials["Material.008"]} onClick={() => setFalling("A2")} />
      <mesh geometry={nodes.A002.geometry} material={materials["Material.009"]} onClick={() => setFalling("A3")} />

      <mesh geometry={nodes.B.geometry} material={materials["Material.012"]} onClick={() => setFalling("B1")} />
      <mesh geometry={nodes.B001.geometry} material={materials["Material.011"]} onClick={() => setFalling("B2")} />
      <mesh geometry={nodes.B002.geometry} material={materials["Material.010"]} onClick={() => setFalling("B3")} />

      <mesh geometry={nodes.C002.geometry} material={materials["Material.013"]} onClick={() => setFalling("C1")} />
      <mesh geometry={nodes.C001.geometry} material={materials["Material.014"]} onClick={() => setFalling("C2")} />
      <mesh geometry={nodes.C.geometry} material={materials["Material.015"]} onClick={() => setFalling("C3")} />

      {/* ========== PRODUCTS ========== */}

<group
  ref={register("A1")}
  onClick={() => {
    if (focusedProduct === "A1") onOpenAbout();
  }}
>
  <mesh geometry={nodes.icecream_mat0__Instance_024_0_1.geometry} material={materials["mat0__Instance_.024"]} />
  <mesh geometry={nodes.icecream_mat0__Instance_024_0_2.geometry} material={materials["Material.016"]} />
  </group>
  <mesh geometry={nodes.icecream_mat0__Instance_024_0001_1.geometry} material={materials["mat0__Instance_.001"]} />
  <mesh geometry={nodes.icecream_mat0__Instance_024_0001_2.geometry} material={materials["Material.017"]} />
  <mesh geometry={nodes.icecream_mat0__Instance_024_0003_1.geometry} material={materials["mat0__Instance_.003"]} />
  <mesh geometry={nodes.icecream_mat0__Instance_024_0003_2.geometry} material={materials["Material.019"]} />


      {/* A2 – FRIES */}
<group
  ref={register("A2")}
  onClick={() => {
    if (focusedProduct === "A2") {
      onOpenProjects(); // or onOpenProjects later
    }
  }}
>

        <mesh geometry={nodes.Potatoes_mat0__Instance_019_0_1.geometry} material={materials["mat0__Instance_.019"]} />
        <mesh geometry={nodes.Potatoes_mat0__Instance_019_0_2.geometry} material={materials["mat0__Instance_.011"]} />
      </group>
      <group ref={register("A2")}>
        <mesh geometry={nodes.Potatoes_mat0__Instance_019_0001_1.geometry} material={materials["mat0__Instance_.012"]} />
        <mesh geometry={nodes.Potatoes_mat0__Instance_019_0001_2.geometry} material={materials["mat0__Instance_.013"]} />
      </group>
      <group ref={register("A2")}>
        <mesh geometry={nodes.Potatoes_mat0__Instance_019_0002_1.geometry} material={materials["mat0__Instance_.014"]} />
        <mesh geometry={nodes.Potatoes_mat0__Instance_019_0002_2.geometry} material={materials["mat0__Instance_.015"]} />
      </group>

      {/* A3 – DONUTS */}
      <group ref={register("A3")}>
        <mesh geometry={nodes.Donut_Material015_0_1.geometry} material={materials["Material.032"]} />
        <mesh geometry={nodes.Donut_Material015_0_2.geometry} material={materials["mat0__Instance_.016"]} />
      </group>
      <group ref={register("A3")}>
        <mesh geometry={nodes.Donut_Material015_0001_1.geometry} material={materials["Material.033"]} />
        <mesh geometry={nodes.Donut_Material015_0001_2.geometry} material={materials["mat0__Instance_.017"]} />
      </group>
      <group ref={register("A3")}>
        <mesh geometry={nodes.Donut_Material015_0002_1.geometry} material={materials["Material.035"]} />
        <mesh geometry={nodes.Donut_Material015_0002_2.geometry} material={materials["mat0__Instance_.018"]} />
      </group>

      {/* B1 – APPLE */}
      
 <group
  ref={register("B3")}
  onClick={() => {
    if (focusedProduct === "B3") {
      onOpenArt();
    }
  }}
>

        <mesh geometry={nodes.Apple2_Material026_0_1.geometry} material={materials["Material.034"]} />
        <mesh geometry={nodes.Apple2_Material026_0_2.geometry} material={materials["mat0__Instance_.009"]} />
      </group>
      <group ref={register("B3")}>
        <mesh geometry={nodes.Apple2_Material026_0001_1.geometry} material={materials["Material.020"]} />
        <mesh geometry={nodes.Apple2_Material026_0001_2.geometry} material={materials["mat0__Instance_.004"]} />
      </group>
      <group ref={register("B3")}>
        <mesh geometry={nodes.Apple2_Material026_0002_1.geometry} material={materials["Material.021"]} />
        <mesh geometry={nodes.Apple2_Material026_0002_2.geometry} material={materials["mat0__Instance_.005"]} />
      </group>

      {/* B2 – CROISSANT */}
<group
  ref={register("B2")}
  onClick={() => {
    if (focusedProduct === "B2") {
      onOpenPhotography();
    }
  }}
>

        <mesh geometry={nodes.croissant_mat0__Instance__0.geometry} material={materials.mat0__Instance} />
      </group>
      <group ref={register("B2")}>
        <mesh geometry={nodes.croissant_mat0__Instance__0001.geometry} material={materials["mat0__Instance.001"]} />
      </group>
      <group ref={register("B2")}>
        <mesh geometry={nodes.croissant_mat0__Instance__0002.geometry} material={materials["mat0__Instance.002"]} />
      </group>

      {/* B3 – BOTTLE */}
      <group ref={register("B1")}>
        <mesh geometry={nodes.Bottle3_mat0__Instance_032_0.geometry} material={materials["mat0__Instance_.032"]} />
      </group>
      <group ref={register("B1")}>
        <mesh geometry={nodes.Bottle3_mat0__Instance_032_0001.geometry} material={materials["mat0__Instance_.021"]} />
      </group>
      <group ref={register("B1")}>
        <mesh geometry={nodes.Bottle3_mat0__Instance_032_0002.geometry} material={materials["mat0__Instance_.022"]} />
      </group>

      {/* C1 – CAKE */}
      <group ref={register("C1")}>
        <mesh geometry={nodes.Cake2_Material009_0_1.geometry} material={materials["Material.022"]} />
        <mesh geometry={nodes.Cake2_Material009_0_2.geometry} material={materials["mat0__Instance_.008"]} />
        <mesh geometry={nodes.Cake2_Material009_0_3.geometry} material={materials["Material.023"]} />
        <mesh geometry={nodes.Cake2_Material009_0_4.geometry} material={materials["Material.025"]} />
      </group>
      <group ref={register("C1")}>
        <mesh geometry={nodes.Cake2_Material009_0001_1.geometry} material={materials["Material.024"]} />
        <mesh geometry={nodes.Cake2_Material009_0001_2.geometry} material={materials["mat0__Instance_.006"]} />
        <mesh geometry={nodes.Cake2_Material009_0001_3.geometry} material={materials["Material.026"]} />
        <mesh geometry={nodes.Cake2_Material009_0001_4.geometry} material={materials["Material.027"]} />
      </group>

      {/* C2 – CAKE */}
   <group
  ref={register("C2")}
  onClick={() => {
    if (focusedProduct === "C2") {
      onOpenContact();
    }
  }}
>

        <mesh geometry={nodes.Cake_Material003_0_2.geometry} material={materials["mat0__Instance_.007"]} />
        <mesh geometry={nodes.Cake_Material003_0_1.geometry} material={materials["Material.028"]} />
        <mesh geometry={nodes.Cake_Material003_0_3.geometry} material={materials["Material.029"]} />
      </group>
      <group ref={register("C2")}>
        <mesh geometry={nodes.Cake_Material003_0001_1.geometry} material={materials["Material.030"]} />
        <mesh geometry={nodes.Cake_Material003_0001_2.geometry} material={materials["mat0__Instance_.010"]} />
        <mesh geometry={nodes.Cake_Material003_0001_3.geometry} material={materials["Material.031"]} />
      </group>

      {/* C3 – COKE */}
      <group ref={register("C3")}>
        <mesh geometry={nodes.Coke_Tin_mat0__Instance_026_0001_1.geometry} material={materials["mat0__Instance_.023"]} />
        <mesh geometry={nodes.Coke_Tin_mat0__Instance_026_0001_2.geometry} material={materials["Material.038"]} />
      </group>
      <group ref={register("C3")}>
        <mesh geometry={nodes.Coke_Tin_mat0__Instance_026_0_1.geometry} material={materials["mat0__Instance_.026"]} />
        <mesh geometry={nodes.Coke_Tin_mat0__Instance_026_0_2.geometry} material={materials["Material.037"]} />
      </group>
      <group ref={register("C3")}>
        <mesh geometry={nodes.Coke_Tin_mat0__Instance_026_0002_1.geometry} material={materials["mat0__Instance_.025"]} />
        <mesh geometry={nodes.Coke_Tin_mat0__Instance_026_0002_2.geometry} material={materials["Material.039"]} />
      </group>

    </group>
  );
}

useGLTF.preload(VendingMachineScene);

