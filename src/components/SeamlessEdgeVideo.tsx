"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SeamlessEdgeVideoProps {
  srcDesktop?: string;
  srcMobile?: string;
  poster: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  overlayGradient?: boolean;
}

export function SeamlessEdgeVideo({
  srcDesktop,
  srcMobile,
  poster,
  alt = "Storyvord Cinematic Production Reel",
  aspectRatio = "aspect-[16/9]",
  className = "",
  overlayGradient = false,
}: SeamlessEdgeVideoProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setReady = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("canplay", setReady);
    video.addEventListener("canplaythrough", setReady);
    video.addEventListener("playing", setReady);
    video.addEventListener("loadeddata", setReady);

    if (video.readyState >= 2) {
      setIsVideoReady(true);
    }

    return () => {
      video.removeEventListener("canplay", setReady);
      video.removeEventListener("canplaythrough", setReady);
      video.removeEventListener("playing", setReady);
      video.removeEventListener("loadeddata", setReady);
    };
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden ${aspectRatio} md:w-full md:left-auto md:right-auto md:mx-0 w-screen relative left-1/2 right-1/2 -mx-[50vw] ${className}`}
    >
      {/* 
        Zero-Flicker Execution:
        Underlying next/image poster frame remains mounted directly behind the <video>
      */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={poster}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform-gpu will-change-transform"
        />
      </div>

      {/* 
        <video> element mounts with opacity: 0, autoPlay, muted, loop, playsInline, preload="auto".
        Explicitly omit the <audio> track entirely from the DOM to bypass mobile battery-saver blocking.
      */}
      {(srcDesktop || srcMobile) && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center z-10 pointer-events-none transition-opacity duration-500 ease-out ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {srcDesktop && (
            <source src={srcDesktop} media="(min-width: 768px)" type="video/mp4" />
          )}
          {srcMobile && (
            <source src={srcMobile} media="(max-width: 767px)" type="video/mp4" />
          )}
          {srcDesktop && !srcMobile && <source src={srcDesktop} type="video/mp4" />}
        </video>
      )}

      {/* Optional vertical gradient mask */}
      {overlayGradient && (
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-canvas-base via-canvas-base/60 to-transparent" />
      )}
    </div>
  );
}
