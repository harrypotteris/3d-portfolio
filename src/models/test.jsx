import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import VendingMachineScene from "../assets/3d/vending_machine.glb";

export default function VendingMachine(props) {
  const { nodes, materials } = useGLTF(VendingMachineScene);

    
  const productRefs = useRef({});
  const [falling, setFalling] = useState(null);

    // register product refs safely
    const register = (name) => (el) => {
    if (el && !productRefs.current[name]) {
        productRefs.current[name] = {
        ref: el,
        startY: el.position.y,
        };
    }
    };
    let speed = 0.02;

    useFrame(() => {
    if (!falling) return;

    const obj = productRefs.current[falling];
    if (!obj) return;

    speed += 0.002;          // acceleration
    obj.ref.position.y -= speed;

    if (obj.ref.position.y < obj.startY - 3) {
        speed = 0.02;
        setFalling(null);
    }
    });

  return (
    <group {...props} dispose={null}>
      <mesh
        
        
        geometry={nodes.walls.geometry}
        material={materials.Material}
      />
      <mesh
        
        
        geometry={nodes.A.geometry}
        material={materials['Material.007']}
      />
      <mesh
        
        
        geometry={nodes.A001.geometry}
        material={materials['Material.008']}
      />
      <mesh
        
        
        geometry={nodes.A002.geometry}
        material={materials['Material.009']}
      />
      <mesh
        
        
        geometry={nodes.B002.geometry}
        material={materials['Material.012']}
      />
      <mesh
        
        
        geometry={nodes.B001.geometry}
        material={materials['Material.011']}
      />
      <mesh
        
        
        geometry={nodes.B.geometry}
        material={materials['Material.010']}
      />
      <mesh
        
        
        geometry={nodes.C.geometry}
        material={materials['Material.013']}
      />
      <mesh
        
        
        geometry={nodes.C001.geometry}
        material={materials['Material.014']}
      />
      <mesh
        
        
        geometry={nodes.C002.geometry}
        material={materials['Material.015']}
      />
      <mesh
        
        
        geometry={nodes.Cube001.geometry}
        material={materials['Material.001']}
      />
      <mesh
        
        
        geometry={nodes.Cube001_1.geometry}
        material={materials['Material.002']}
      />
      <mesh
        
        
        geometry={nodes.Cube001_2.geometry}
        material={materials['Material.003']}
      />
      <mesh
        
        
        geometry={nodes.Cube001_3.geometry}
        material={materials['Material.004']}
      />
      <mesh
        
        
        geometry={nodes.Cube001_4.geometry}
        material={materials['Material.005']}
      />
      <mesh
        
        
        geometry={nodes.Cube001_5.geometry}
        material={materials['Material.006']}
      />
      <mesh
        
        
        geometry={nodes.icecream_mat0__Instance_024_0_1.geometry}
        material={materials['mat0__Instance_.024']}
      />
      <mesh
        
        
        geometry={nodes.icecream_mat0__Instance_024_0_2.geometry}
        material={materials['Material.016']}
      />
      <mesh
        
        
        geometry={nodes.icecream_mat0__Instance_024_0001_1.geometry}
        material={materials['mat0__Instance_.001']}
      />
      <mesh
        
        
        geometry={nodes.icecream_mat0__Instance_024_0001_2.geometry}
        material={materials['Material.017']}
      />
      <mesh
        
        
        geometry={nodes.icecream_mat0__Instance_024_0003_1.geometry}
        material={materials['mat0__Instance_.003']}
      />
      <mesh
        
        
        geometry={nodes.icecream_mat0__Instance_024_0003_2.geometry}
        material={materials['Material.019']}
      />
      <mesh
        
        
        geometry={nodes.Apple2_Material026_0_1.geometry}
        material={materials['Material.034']}
      />
      <mesh
        
        
        geometry={nodes.Apple2_Material026_0_2.geometry}
        material={materials['mat0__Instance_.009']}
      />
      <mesh
        
        
        geometry={nodes.Apple2_Material026_0001_1.geometry}
        material={materials['Material.020']}
      />
      <mesh
        
        
        geometry={nodes.Apple2_Material026_0001_2.geometry}
        material={materials['mat0__Instance_.004']}
      />
      <mesh
        
        
        geometry={nodes.Apple2_Material026_0002_1.geometry}
        material={materials['Material.021']}
      />
      <mesh
        
        
        geometry={nodes.Apple2_Material026_0002_2.geometry}
        material={materials['mat0__Instance_.005']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0_1.geometry}
        material={materials['Material.022']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0_2.geometry}
        material={materials['mat0__Instance_.008']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0_3.geometry}
        material={materials['Material.023']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0_4.geometry}
        material={materials['Material.025']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0001_1.geometry}
        material={materials['Material.024']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0001_2.geometry}
        material={materials['mat0__Instance_.006']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0001_3.geometry}
        material={materials['Material.026']}
      />
      <mesh
        
        
        geometry={nodes.Cake2_Material009_0001_4.geometry}
        material={materials['Material.027']}
      />
      <mesh
        
        
        geometry={nodes.Cake_Material003_0_1.geometry}
        material={materials['Material.028']}
      />
      <mesh
        
        
        geometry={nodes.Cake_Material003_0_2.geometry}
        material={materials['mat0__Instance_.007']}
      />
      <mesh
        
        
        geometry={nodes.Cake_Material003_0_3.geometry}
        material={materials['Material.029']}
      />
      <mesh
        
        
        geometry={nodes.Cake_Material003_0001_1.geometry}
        material={materials['Material.030']}
      />
      <mesh
        
        
        geometry={nodes.Cake_Material003_0001_2.geometry}
        material={materials['mat0__Instance_.010']}
      />
      <mesh
        
        
        geometry={nodes.Cake_Material003_0001_3.geometry}
        material={materials['Material.031']}
      />
      <mesh
        
        
        geometry={nodes.Potatoes_mat0__Instance_019_0_1.geometry}
        material={materials['mat0__Instance_.019']}
      />
      <mesh
        
        
        geometry={nodes.Potatoes_mat0__Instance_019_0_2.geometry}
        material={materials['mat0__Instance_.011']}
      />
      <mesh
        
        
        geometry={nodes.Potatoes_mat0__Instance_019_0001_1.geometry}
        material={materials['mat0__Instance_.012']}
      />
      <mesh
        
        
        geometry={nodes.Potatoes_mat0__Instance_019_0001_2.geometry}
        material={materials['mat0__Instance_.013']}
      />
      <mesh
        
        
        geometry={nodes.Potatoes_mat0__Instance_019_0002_1.geometry}
        material={materials['mat0__Instance_.014']}
      />
      <mesh
        
        
        geometry={nodes.Potatoes_mat0__Instance_019_0002_2.geometry}
        material={materials['mat0__Instance_.015']}
      />
      <mesh
        
        
        geometry={nodes.Donut_Material015_0_1.geometry}
        material={materials['Material.032']}
      />
      <mesh
        
        
        geometry={nodes.Donut_Material015_0_2.geometry}
        material={materials['mat0__Instance_.016']}
      />
      <mesh
        
        
        geometry={nodes.Donut_Material015_0001_1.geometry}
        material={materials['Material.033']}
      />
      <mesh
        
        
        geometry={nodes.Donut_Material015_0001_2.geometry}
        material={materials['mat0__Instance_.017']}
      />
      <mesh
        
        
        geometry={nodes.Donut_Material015_0002_1.geometry}
        material={materials['Material.035']}
      />
      <mesh
        
        
        geometry={nodes.Donut_Material015_0002_2.geometry}
        material={materials['mat0__Instance_.018']}
      />
      <mesh
        
        
        geometry={nodes.croissant_mat0__Instance__0.geometry}
        material={materials.mat0__Instance}
      />
      <mesh
        
        
        geometry={nodes.croissant_mat0__Instance__0001.geometry}
        material={materials['mat0__Instance.001']}
      />
      <mesh
        
        
        geometry={nodes.croissant_mat0__Instance__0002.geometry}
        material={materials['mat0__Instance.002']}
      />
      <mesh
        
        
        geometry={nodes.Bottle3_mat0__Instance_032_0.geometry}
        material={materials['mat0__Instance_.032']}
      />
      <mesh
        
        
        geometry={nodes.Bottle3_mat0__Instance_032_0001.geometry}
        material={materials['mat0__Instance_.021']}
      />
      <mesh
        
        
        geometry={nodes.Bottle3_mat0__Instance_032_0002.geometry}
        material={materials['mat0__Instance_.022']}
      />
      <mesh
        
        
        geometry={nodes.Coke_Tin_mat0__Instance_026_0_1.geometry}
        material={materials['mat0__Instance_.026']}
      />
      <mesh
        
        
        geometry={nodes.Coke_Tin_mat0__Instance_026_0_2.geometry}
        material={materials['Material.037']}
      />
      <mesh
        
        
        geometry={nodes.Coke_Tin_mat0__Instance_026_0001_1.geometry}
        material={materials['mat0__Instance_.023']}
      />
      <mesh
        
        
        geometry={nodes.Coke_Tin_mat0__Instance_026_0001_2.geometry}
        material={materials['Material.038']}
      />
      <mesh
        
        
        geometry={nodes.Coke_Tin_mat0__Instance_026_0002_1.geometry}
        material={materials['mat0__Instance_.025']}
      />
      <mesh
        
        
        geometry={nodes.Coke_Tin_mat0__Instance_026_0002_2.geometry}
        material={materials['Material.039']}
      />
    </group>
  )
}

useGLTF.preload('/vending_machine.glb')
