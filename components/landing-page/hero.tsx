"use client";

import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls, Grid} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {Manrope} from "next/font/google";
import ContactFormButton from "./contact-form-button";

const manrope = Manrope({subsets: ["latin"]});

const CORE_TECH_LINE =
  "React.js \u2022 Next.js \u2022 Node.js \u2022 TypeScript \u2022 React Native \u2022 Shopify Liquid \u2022 PostgreSQL \u2022 GraphQL \u2022 REST APIs \u2022 Docker \u2022 GitHub Actions";

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return setBp("mobile");
      if (w < 1024) return setBp("tablet");
      return setBp("desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return bp;
}

function AnimatedBox({
  initialPosition,
}: {
  initialPosition: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(...initialPosition),
  );
  const currentPosition = useRef(new THREE.Vector3(...initialPosition));

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const [dx, dz] = directions[Math.floor(Math.random() * directions.length)];
    return new THREE.Vector3(current.x + dx * 3, 0.5, current.z + dz * 3);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current);
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x));
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z));
      setTargetPosition(newPosition);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1);
      meshRef.current.position.copy(currentPosition.current);
    }
  });

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(1, 1, 1)]}
        />
        <lineBasicMaterial attach="material" color="#000000" linewidth={2} />
      </lineSegments>
    </mesh>
  );
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ];

  return (
    <>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.45} />
      <pointLight position={[10, 10, 10]} intensity={1.1} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={new THREE.Color(0.55, 0.55, 0.8)}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  );
}

function ResponsiveCamera() {
  const bp = useBreakpoint();
  const {camera} = useThree();

  useEffect(() => {
    let position: [number, number, number] = [20, 5, 10];
    let fov = 50;
    if (bp === "tablet") {
      position = [18, 6, 12];
      fov = 52;
    } else if (bp === "mobile") {
      position = [14, 7, 14];
      fov = 56;
    }
    camera.position.set(...position);
    (camera as THREE.PerspectiveCamera).fov = fov;
    camera.updateProjectionMatrix();
  }, [bp, camera]);

  return null;
}

export default function Hero() {
  return (
    <div
      className={`relative isolate min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-background md:h-[100svh] md:overflow-hidden ${manrope.className}`}>
      {/* Background stack: keep every layer behind UI (WebGL often composites above siblings without this). */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-[20%] -top-[30%] h-[75vh] w-[75vw] max-w-[900px] rounded-full bg-primary/25 blur-[120px] animate-aurora dark:bg-primary/20" />
          <div className="absolute -right-[15%] top-[10%] h-[60vh] w-[60vw] max-w-[700px] rounded-full bg-violet-500/20 blur-[100px] animate-aurora dark:bg-fuchsia-600/15 [animation-delay:-7s]" />
          <div className="absolute bottom-[-20%] left-[30%] h-[50vh] w-[50vw] max-w-[600px] rounded-full bg-cyan-500/15 blur-[90px] animate-aurora dark:bg-cyan-500/10 [animation-delay:-12s]" />
        </div>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{position: [20, 5, 10], fov: 50}}
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.85] dark:opacity-90"
          style={{position: "absolute", inset: 0}}>
          <ResponsiveCamera />
          <Scene />
        </Canvas>
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/15 to-background/90 dark:from-[hsl(0_0%_7%)/0.88] dark:via-transparent dark:to-[hsl(0_0%_7%)/0.95)]" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-start px-4 pb-[max(6rem,calc(env(safe-area-inset-bottom,0px)+2.5rem))] pt-[max(5.5rem,calc(env(safe-area-inset-top,0px)+3.25rem))] sm:px-6 md:min-h-[100svh] md:justify-center md:px-8 md:pb-16 md:pt-28">
        <div className="relative w-full max-w-2xl shrink-0 lg:max-w-4xl">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary/25 via-violet-500/15 to-fuchsia-500/20 p-[1px] shadow-xl shadow-primary/10 dark:from-primary/20 dark:shadow-primary/5">
            <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] border border-border/50 bg-background/90 text-foreground shadow-lg backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[hsl(220_10%_10%/0.92)]">
              <div
                className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/12 blur-3xl dark:bg-primary/18"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
                aria-hidden
              />

              <div className="relative p-7 sm:p-9 md:p-11 lg:grid lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-12">
                <div
                  className="mb-8 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-violet-500 to-fuchsia-500 lg:mb-0 lg:block"
                  aria-hidden
                />
                <div className="min-w-0 lg:border-l lg:border-border/40 lg:pl-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:bg-muted/25">
                      Portfolio
                    </span>
                    <span className="text-muted-foreground/60">·</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      Philippines
                    </span>
                  </div>

                  <h1 className="mt-5 text-balance font-semibold tracking-tight text-foreground">
                    <span className="block text-2xl font-medium leading-snug text-muted-foreground sm:text-[1.35rem]">
                      Earl Gerald
                    </span>
                    <span className="mt-1 block text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-[3.35rem]">
                      <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                        Balitcha
                      </span>
                    </span>
                  </h1>

                  <p className="mt-5 text-balance text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {"Full Stack Developer | React, Next.js, Node.js, Shopify & API integrations"}
                  </p>

                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                      Core technologies
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                      {CORE_TECH_LINE}
                    </p>
                  </div>

                  <div className="mt-8 space-y-4 border-t border-border/50 pt-8 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                    <p>
                      I build scalable web applications, enterprise dashboards, Shopify stores, automation systems, and
                      API integrations that help businesses improve operations and grow revenue.
                    </p>
                  </div>

                  <div className="mt-9 flex justify-center sm:justify-start">
                    <ContactFormButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
