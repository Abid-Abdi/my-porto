/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import "../../css/Lanyard.css";

const CARD_GLB_URL = "/assets/lanyard/card.glb";
const LANYARD_PNG_URL = "/assets/lanyard/lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

type Vector3Tuple = [number, number, number];

type LanyardProps = {
  position?: Vector3Tuple;
  gravity?: Vector3Tuple;
  fov?: number;
  transparent?: boolean;
  fullScreen?: boolean;
  scaleMultiplier?: number;
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  fullScreen = true,
  scaleMultiplier = 2.25,
}: LanyardProps) {
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <div className={fullScreen ? "lanyard-overlay" : "lanyard-embed"}>
      <Canvas
        key={canvasKey}
        camera={{ position: position, fov: fov }}
        dpr={[1, 1.25]}
        shadows={false}
        flat
        gl={{
          alpha: transparent,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          (gl as THREE.WebGLRenderer & { setClearAlpha?: (a: number) => void })
            .setClearAlpha?.(transparent ? 0 : 1);
          const el = gl.domElement;
          const onLost = (e: Event) => {
            e.preventDefault();
            setTimeout(() => setCanvasKey((k) => k + 1), 0);
          };
          el.addEventListener("webglcontextlost", onLost, false);
        }}
        style={{ background: "transparent" }}
        className="absolute inset-0"
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band scaleMultiplier={scaleMultiplier} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
        <Preload all />
      </Canvas>
    </div>
  );
}

const BASE_SCALE = 2.25;

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  scaleMultiplier = 2.25,
}: {
  maxSpeed?: number;
  minSpeed?: number;
  scaleMultiplier?: number;
}) {
  const band = useRef<any>(null),
    fixed = useRef<any>(null),
    j1 = useRef<any>(null),
    j2 = useRef<any>(null),
    j3 = useRef<any>(null),
    card = useRef<any>(null);
  const vec = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  } as const;
  const { nodes, materials, scene } = useGLTF(CARD_GLB_URL) as any;
  const texture = useTexture(LANYARD_PNG_URL);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const strapLineWidth = isSmall
    ? Math.max(0.85, scaleMultiplier * 0.24)
    : Math.max(1, scaleMultiplier * 0.34);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  const groupOffsetY = -1.2;
  const hookLocalY = (1.45 - groupOffsetY) / BASE_SCALE;
  const attachY = groupOffsetY + hookLocalY * scaleMultiplier;

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, attachY, 0],
  ]);

  useEffect(() => {
    setIsSmall(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar((state.camera as any).position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current ||
      !band.current
    ) {
      return;
    }

    const setPoint = (
      point: THREE.Vector3,
      t: { x: number; y: number; z: number }
    ) => {
      if (!Number.isFinite(t.x) || !Number.isFinite(t.y) || !Number.isFinite(t.z))
        return false;
      point.set(t.x, t.y, t.z);
      return true;
    };

    [j1, j2].forEach((ref) => {
      const body = ref.current;
      const pos = body.translation();
      if (!Number.isFinite(pos.x) || !Number.isFinite(pos.y) || !Number.isFinite(pos.z))
        return;
      if (!body.lerped) body.lerped = new THREE.Vector3(pos.x, pos.y, pos.z);
      const clampedDistance = Math.max(0.1, Math.min(1, body.lerped.distanceTo(pos)));
      body.lerped.lerp(pos, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
    });

    const curvePoints = (curve as any).points as THREE.Vector3[];
    const pointsValid =
      setPoint(curvePoints[0], j3.current.translation()) &&
      setPoint(curvePoints[1], j2.current.lerped) &&
      setPoint(curvePoints[2], j1.current.lerped) &&
      setPoint(curvePoints[3], fixed.current.translation());

    if (!pointsValid) return;

    const samples = (curve as any).getPoints(isSmall ? 16 : 32) as THREE.Vector3[];
    const samplesValid = samples.every(
      (p) => Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)
    );

    if (samplesValid) {
      (band.current as any).geometry.setPoints(samples);
    }

    const angVel = card.current.angvel();
    const cardRot = card.current.rotation();
    if (
      Number.isFinite(angVel.x) &&
      Number.isFinite(angVel.y) &&
      Number.isFinite(angVel.z) &&
      Number.isFinite(cardRot.y)
    ) {
      card.current.setAngvel({
        x: angVel.x,
        y: angVel.y - cardRot.y * 0.25,
        z: angVel.z,
      });
    }
  });

  (curve as any).curveType = "chordal";
  (texture as any).wrapS = (texture as any).wrapT = THREE.RepeatWrapping;

  const anchorY = 3.65 + scaleMultiplier * 0.35;

  return (
    <>
      <group position={[0, anchorY, 0]}>
        <RigidBody ref={fixed} {...(segmentProps as any)} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...(segmentProps as any)}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...(segmentProps as any)}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...(segmentProps as any)}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...(segmentProps as any)}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={scaleMultiplier}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e: any) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            )}
          >
            {(() => {
              const cardMesh =
                (nodes as any)?.card ??
                (scene as any)?.children?.find(
                  (c: any) => c?.name?.toLowerCase?.() === "card" || c?.isMesh
                );
              const clipMesh =
                (nodes as any)?.clip ?? (scene as any)?.getObjectByName?.("clip");
              const clampMesh =
                (nodes as any)?.clamp ?? (scene as any)?.getObjectByName?.("clamp");
              const baseMap =
                (materials as any)?.base?.map ?? cardMesh?.material?.map ?? null;
              return (
                <>
                  {cardMesh && (
                    <mesh geometry={cardMesh.geometry}>
                      <meshPhysicalMaterial
                        map={baseMap}
                        map-anisotropy={16}
                        clearcoat={1}
                        clearcoatRoughness={0.15}
                        roughness={0.9}
                        metalness={0.8}
                      />
                    </mesh>
                  )}
                  {clipMesh && (
                    <mesh
                      geometry={clipMesh.geometry}
                      material={(materials as any)?.metal ?? clipMesh.material}
                      material-roughness={0.3}
                    />
                  )}
                  {clampMesh && (
                    <mesh
                      geometry={clampMesh.geometry}
                      material={(materials as any)?.metal ?? clampMesh.material}
                    />
                  )}
                </>
              );
            })()}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band as any}>
        {/* @ts-expect-error extended by meshline */}
        <meshLineGeometry />
        {/* @ts-expect-error extended by meshline */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap
          map={texture as any}
          repeat={[-4, 1]}
          lineWidth={strapLineWidth}
        />
      </mesh>
    </>
  );
}
