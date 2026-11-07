"use client";

import React, { useState } from "react";
import { TRexGameCanvas } from "./TRexGameCanvas";
import { StripeBeamCanvas } from "./StripeBeamCanvas";
import { Gamepad2, Sparkles } from "lucide-react";

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"game" | "beam">("game");

  return (
    <div className="space-y-2.5">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between px-1">
        <div className="inline-flex p-1 rounded-2xl bg-white/80 border border-[#A9C7A5]/40 shadow-xs backdrop-blur-md">
          <button
            onClick={() => setActiveTab("game")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "game"
                ? "bg-gradient-to-r from-[#F6B77A] to-[#F28B82] text-white shadow-xs"
                : "text-[#77776D] hover:text-[#343A32]"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>T-Rex Dino Runner</span>
          </button>
          <button
            onClick={() => setActiveTab("beam")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "beam"
                ? "bg-gradient-to-r from-[#A9C7A5] to-[#6B9A64] text-white shadow-xs"
                : "text-[#77776D] hover:text-[#343A32]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Beam</span>
          </button>
        </div>

        <span className="text-[10px] font-mono text-[#77776D] hidden sm:inline">
          {activeTab === "game"
            ? "🦖 Press Space or Tap to Play"
            : "✨ Move cursor to deflect optical beams"}
        </span>
      </div>

      {/* Render Active Component */}
      {activeTab === "game" ? (
        <TRexGameCanvas onSwitchToBeam={() => setActiveTab("beam")} />
      ) : (
        <StripeBeamCanvas />
      )}
    </div>
  );
};
