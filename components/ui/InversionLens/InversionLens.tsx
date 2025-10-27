"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import Image from "next/image";

type Props = {
  src: string;
  className?: string;
};

interface Uniforms {
  u_texture: { value: THREE.Texture };
  u_mouse: { value: THREE.Vector2 };
  u_time: { value: number };
  u_resolution: { value: THREE.Vector2 };
  u_radius: { value: number };
  u_speed: { value: number };
  u_imageAspect: { value: number };
  u_turbulenceIntensity: { value: number };
}

const InversionLens: React.FC<Props> = ({ src, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const isSetupCompleteRef = useRef<boolean>(false);

  

  const targetMouse = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const lerpedMouse = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const targetRadius = useRef<number>(0.0);
  const isInView = useRef<boolean>(false);
  const isMouseInsideContainer = useRef<boolean>(false);
  const lastMouseX = useRef<number>(0);
  const lastMouseY = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  

  useEffect(() => {
    const mount = containerRef.current;
    if (isSetupCompleteRef.current || !mount || !src) return;

    const loader = new THREE.TextureLoader();

    // local cleanup holders
    let resizeCleanup: (() => void) | undefined;
    let eventCleanup: (() => void) | undefined;

  const maskRadius = 0.15;
  const maskSpeed = 0.75;
  const lerpFactor = 0.09;
  const radiusLerpSpeed = 0.1;
  const turbulenceIntensity = 0.075;

      const setupScene = (texture: THREE.Texture) => {
        if (!mount) return;

        const imageAspect = texture.image.width / texture.image.height;

        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        cameraRef.current = camera;

        const uniforms: Uniforms = {
          u_texture: { value: texture },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_time: { value: 0.0 },
          u_resolution: { value: new THREE.Vector2(width, height) },
          u_radius: { value: 0.0 },
          u_speed: { value: maskSpeed },
          u_imageAspect: { value: imageAspect },
          u_turbulenceIntensity: { value: turbulenceIntensity },
        };
        uniformsRef.current = uniforms;

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
          uniforms: (uniforms as unknown) as Record<string, THREE.IUniform>,
          vertexShader,
          fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        mount.appendChild(renderer.domElement);

        const handleResize = (): void => {
          if (!mount || !rendererRef.current || !uniformsRef.current) return;

          const w = mount.clientWidth;
          const h = mount.clientHeight;

          rendererRef.current.setSize(w, h);
          uniformsRef.current.u_resolution.value.set(w, h);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      };

      const updateCursorState = (x: number, y: number) => {
        if (!mount) return;

        lastMouseX.current = x;
        lastMouseY.current = y;

        const rect = mount.getBoundingClientRect();
        const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

        isMouseInsideContainer.current = inside;

        if (inside) {
          targetMouse.current.x = (x - rect.left) / rect.width;
          targetMouse.current.y = 1.0 - (y - rect.top) / rect.height;
          targetRadius.current = maskRadius;
        } else {
          targetRadius.current = 0.0;
        }
      };

      const setupEventListeners = () => {
        const handleMouseMove = (e: MouseEvent) => {
          updateCursorState(e.clientX, e.clientY);
        };

        const handleScroll = () => {
          updateCursorState(lastMouseX.current, lastMouseY.current);
        };

        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        if (mount) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                isInView.current = entry.isIntersecting;
                if (!isInView.current) {
                  targetRadius.current = 0.0;
                }
              });
            },
            { threshold: 0.1 }
          );

          observer.observe(mount);

          eventCleanup = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
          };
        } else {
          eventCleanup = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
          };
        }

        return eventCleanup;
      };

      const animate = () => {
        if (
          !uniformsRef.current ||
          !rendererRef.current ||
          !sceneRef.current ||
          !cameraRef.current
        ) {
          animationFrameId.current = window.requestAnimationFrame(animate as FrameRequestCallback);
          return;
        }

        lerpedMouse.current.lerp(targetMouse.current, lerpFactor);

        uniformsRef.current.u_mouse.value.copy(lerpedMouse.current);
        uniformsRef.current.u_time.value += 0.01;
        uniformsRef.current.u_radius.value +=
          (targetRadius.current - uniformsRef.current.u_radius.value) *
          radiusLerpSpeed;

        rendererRef.current.render(sceneRef.current as THREE.Scene, cameraRef.current as THREE.Camera);

        animationFrameId.current = window.requestAnimationFrame(animate as FrameRequestCallback);
      };

    const loadTexture = () => {
      loader.load(src, (texture: THREE.Texture) => {
        resizeCleanup = setupScene(texture);
        setupEventListeners();
        animate();
        isSetupCompleteRef.current = true;
      });
    };

    loadTexture();

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (typeof eventCleanup === "function") {
        eventCleanup();
      }

      if (typeof resizeCleanup === "function") {
        resizeCleanup();
      }

      if (rendererRef.current) {
        try {
          rendererRef.current.dispose();
        } catch {}

        if (mount) {
          const canvas = mount.querySelector("canvas");
          if (canvas) {
            mount.removeChild(canvas);
          }
        }
      }
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`inversion-lens overflow-hidden w-screen h-svh absolute inset-0 ${className || ""}`}>
      <Image src={src} alt="" fill className="hidden grayscale-100" />
    </div>
  );
};

export default InversionLens;
