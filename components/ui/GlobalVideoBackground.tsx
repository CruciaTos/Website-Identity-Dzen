"use client";

export function GlobalVideoBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#000b12ff" }}
    >
      {/* Video – no blur, object-position can stay as is */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ objectPosition: "center 30%" }}
      >
        <source src="/videos/hero2.mp4" type="video/mp4" />
      </video>

      {/* Glassmorphism overlay – blurs the video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(12px) saturate(130%)",
          WebkitBackdropFilter: "blur(12px) saturate(130%)",
          background:
            "linear-gradient(180deg, rgba(1,11,19,0.4) 0%, rgba(1,11,19,0.65) 60%, rgba(1,11,19,0.9) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 noise-overlay mix-blend-overlay pointer-events-none"
        style={{ opacity: 0.025 }}
      />
    </div>
  );
}