"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { penaltiesAtom, playersAtom, type Penalty } from "@/lib/atoms";
import { theme } from "@/lib/theme";
import { determineLeaders } from "@/lib/gameLogic";

const defaultPenalties: Omit<Penalty, "id" | "isActive" | "targetPlayerId">[] =
  [
    {
      title: "Fel fot (alla)",
      description: "Alla andra ska spela med fel fot på utslag nästa hål",
      type: "hole",
    },
    {
      title: "Fel fot (du)",
      description: "Du ska spela med fel fot på utslag nästa hål",
      type: "hole",
    },
    {
      title: "Svepa öl (alla)",
      description: "Alla andra ska svepa en öl",
      type: "shot",
    },
    { title: "Svepa öl (du)", description: "Du ska svepa en öl", type: "shot" },
    {
      title: "Kasta ut bollen",
      description: "Du får kasta ut bollen på nästa utslag",
      type: "shot",
    },
    {
      title: "Klacka",
      description:
        "Du väljer en valfri spelare som måste klacka på nästa utspark",
      type: "shot",
    },
    {
      title: "Finsk fylla",
      description:
        "Finsk fylla (snurra 15 varv) på två valfri spelare vid utspark",
      type: "shot",
    },
  ];

const colors = [
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#ef4444",
  "#f97316",
  "#ec4899",
];

interface PenaltyWheelProps {
  onPenaltySelected?: (penalty: Penalty) => void;
}

export default function PenaltyWheel({ onPenaltySelected }: PenaltyWheelProps) {
  const [, setPenalties] = useAtom(penaltiesAtom);
  const [players] = useAtom(playersAtom);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const spinWheel = () => {
    setIsSpinning(true);
    setSelectedPenalty(null);
    setAnimationSpeed(100);

    let cycles = 0;
    const maxCycles = 15 + Math.floor(Math.random() * 10); // 15-25 cycles

    const animate = () => {
      if (cycles >= maxCycles) {
        // Animation complete, select the current penalty
        const selectedPenaltyData = defaultPenalties[currentIndex];

        // Get the current leader to assign the penalty to
        const leaders = determineLeaders(players);
        const targetPlayer =
          leaders.length > 0
            ? leaders[Math.floor(Math.random() * leaders.length)]
            : null;

        const newPenalty: Penalty = {
          ...selectedPenaltyData,
          id: `penalty-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          isActive: true,
          targetPlayerId: targetPlayer?.id || undefined,
        };

        setPenalties((prev) => [...prev, newPenalty]);
        setSelectedPenalty(newPenalty);
        setIsSpinning(false);
        onPenaltySelected?.(newPenalty);
        return;
      }

      // Slow down animation as we approach the end
      const slowdownFactor = Math.max(0.1, 1 - (cycles / maxCycles) * 0.9);
      const currentSpeed = 100 + 200 * slowdownFactor;

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % defaultPenalties.length);
        cycles++;
        animate();
      }, currentSpeed);
    };

    animate();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Simple Visual Wheel */}
      <div className="relative">
        <div
          className="grid grid-cols-2 gap-3 p-6 rounded-xl max-w-lg"
          style={{
            background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
            border: "1px solid #10b981",
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.4), 0 10px 10px -5px rgb(0 0 0 / 0.2)",
          }}
        >
          {defaultPenalties.map((penalty, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center text-white font-bold text-sm transition-all duration-300 ${
                index === currentIndex && isSpinning
                  ? "scale-110 shadow-lg"
                  : ""
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors[index]} 0%, ${colors[index]}dd 100%)`,
                transform:
                  index === currentIndex && isSpinning
                    ? "scale(1.1)"
                    : "scale(1)",
                boxShadow:
                  index === currentIndex && isSpinning
                    ? `0 10px 20px rgba(0,0,0,0.4), 0 0 30px ${colors[index]}40`
                    : `0 4px 6px rgba(0,0,0,0.2)`,
                border:
                  index === currentIndex && isSpinning
                    ? `2px solid ${colors[index]}`
                    : "none",
              }}
            >
              {penalty.title}
            </div>
          ))}
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-8 py-3 font-bold rounded-lg transition-colors bg-green-600"
        style={{
          backgroundColor: isSpinning
            ? theme.colors.neutral[400]
            : theme.components.button.warning.background,
          color: theme.components.button.warning.text,
          cursor: isSpinning ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (!isSpinning) {
            e.currentTarget.style.backgroundColor =
              theme.components.button.warning.backgroundHover;
          }
        }}
        onMouseLeave={(e) => {
          if (!isSpinning) {
            e.currentTarget.style.backgroundColor =
              theme.components.button.warning.background;
          }
        }}
      >
        {isSpinning ? "Snurrar..." : "Snurra hjulet!"}
      </button>

      {selectedPenalty && (
        <div
          className="p-6 rounded-lg shadow-lg border-2 max-w-md"
          style={{
            backgroundColor: theme.components.card.background,
            borderColor: theme.components.penalty.activeBorder,
          }}
        >
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: theme.colors.neutral[800] }}
          >
            Straff valt!
          </h3>
          <div
            className="p-3 rounded-lg mb-3 text-center text-white font-bold"
            style={{
              backgroundColor:
                colors[
                  defaultPenalties.findIndex(
                    (p) => p.title === selectedPenalty.title
                  )
                ],
            }}
          >
            {selectedPenalty.title}
          </div>
          <p className="mb-2" style={{ color: theme.colors.neutral[700] }}>
            {selectedPenalty.description}
          </p>
          <p className="text-sm" style={{ color: theme.colors.neutral[500] }}>
            Varaktighet:{" "}
            {selectedPenalty.type === "shot"
              ? "Endast nästa slag"
              : selectedPenalty.type === "hole"
              ? "Endast detta hål"
              : "Resten av spelet"}
          </p>
        </div>
      )}
    </div>
  );
}
