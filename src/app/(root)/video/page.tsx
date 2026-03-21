"use client";

import { useState } from "react";

export default function ScannerUI() {
  const [screen, setScreen] = useState<"start" | "scan" | "result">("start");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm h-screen relative overflow-hidden bg-black">
        {screen === "start" && <StartScreen onStart={() => setScreen("scan")} />}
        {screen === "scan" && (
          <ScannerScreen onDetected={() => setScreen("result")} />
        )}
        {screen === "result" && (
          <ResultScreen onRescan={() => setScreen("scan")} />
        )}
      </div>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="h-full flex flex-col justify-between bg-gradient-to-b from-black to-zinc-900">
      {/* QR Icon */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-white rounded-xl flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white rounded-md" />
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white text-black rounded-t-3xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Get Started</h2>
        <p className="text-sm text-gray-600 mb-6">
          Scan QR codes fast and secure.
        </p>

        <button
          onClick={onStart}
          className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center mx-auto shadow-lg"
        >
          →
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function ScannerScreen({ onDetected }: { onDetected: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let active = true;

    reader.decodeFromVideoDevice(
      undefined,
      videoRef.current!,
      (result) => {
        if (result && active) {
          active = false;
          reader.reset();
          onDetected();
        }
      }
    );

    return () => {
      active = false;
      reader.reset();
    };
  }, [onDetected]);

  return (
    <div className="relative h-full">
      {/* Camera */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-40">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-yellow-400" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-yellow-400" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-yellow-400" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-yellow-400" />

          {/* Scan line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-yellow-400 animate-pulse" />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full p-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
        <button className="text-white text-xl">📷</button>

        <button className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xl">
          ⬤
        </button>

        <button className="text-white text-xl">⚡</button>
      </div>
    </div>
  );
}