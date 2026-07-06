"use client";

import Silk from "@/components/ui/Silk";

interface GlobalSilkBackgroundProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  glassBlur?: number;    // new prop for controlling the glass blur
}

export function GlobalSilkBackground({
  speed = 2,
  scale = 1,
  color = "#f5f6fcff",
  noiseIntensity = 1.5,
  rotation = 0,
  glassBlur = 50,        // reduced default blur
}: GlobalSilkBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#000000ff" }}
    >
      <Silk
        speed={speed}
        scale={scale}
        color={color}
        noiseIntensity={noiseIntensity}
        rotation={rotation}
      />

      {/* Glass overlay with lighter blur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: `blur(${glassBlur}px) saturate(130%)`,
          WebkitBackdropFilter: `blur(${glassBlur}px) saturate(130%)`,
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.65) 60%, rgba(0, 0, 0, 0.9) 100%)",
        }}
      />

      {/* subtle noise overlay */}
      <div
        className="absolute inset-0 noise-overlay mix-blend-overlay pointer-events-none"
        style={{ opacity: 0.025 }}
      />
    </div>
  );
}