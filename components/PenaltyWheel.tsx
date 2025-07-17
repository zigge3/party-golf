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
        "Du väljer en valfri spelare som måste klacka på nästa spark",
      type: "shot",
    },
    {
      title: "Finsk fylla",
      description:
        "Finsk fylla (snurra 15 varv) på två valfri spelare vid utslag",
      type: "shot",
    },
    {
      title: "Blinda ögon",
      description: "Du måste sparka med slutna ögon på nästa spark",
      type: "shot",
    },
    {
      title: "Hoppa ett ben",
      description: "Du måste hoppa på ett ben när du sparkar nästa gång",
      type: "shot",
    },
    {
      title: "Sjung joppe",
      description: "Du måste sjunga under nästa utspark",
      type: "shot",
    },
    {
      title: "Endast insida",
      description: "Du får bara sparka med insidan av foten detta hål",
      type: "hole",
    },
    {
      title: "Inga våldsamme",
      description: "Bollen får inte lämna marken på nästa hål",
      type: "hole",
    },
    {
      title: "Tystnad",
      description: "Du får inte prata förrän nästa hål är klart",
      type: "hole",
    },
    {
      title: "Extra spark",
      description: "Du måste ta en extra spark på nästa hål",
      type: "hole",
    },
    {
      title: "Endast tå",
      description: "Du får bara sparka med tån på nästa spark",
      type: "shot",
    },
    {
      title: "Händer bakom rygg",
      description: "Du måste ha händerna bakom ryggen när du sparkar detta hål",
      type: "hole",
    },
    {
      title: "Indianen",
      description: "Du måste sitta ner när du sparkar nästa gång",
      type: "shot",
    },
    {
      title: "Slow motion",
      description: "Du måste sparka extremt långsamt på nästa spark",
      type: "shot",
    },
    {
      title: "Armarna upp",
      description:
        "Du måste hålla armarna upp i luften när du sparkar nästa hål",
      type: "hole",
    },
  ];

const colors = [
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
  "#ef4444", // Red
  "#f97316", // Orange
  "#ec4899", // Pink
  "#84cc16", // Lime
  "#3b82f6", // Blue
  "#f43f5e", // Rose
  "#a855f7", // Purple
  "#059669", // Emerald-600
  "#d97706", // Amber-600
  "#7c3aed", // Violet-600
  "#0891b2", // Cyan-600
  "#dc2626", // Red-600
  "#ea580c", // Orange-600
  "#22c55e", // Green-500
  "#eab308", // Yellow-500
  "#6366f1", // Indigo-500
  "#14b8a6", // Teal-500
  "#f97316", // Orange-500
  "#e11d48", // Rose-600
  "#8b5cf6", // Violet-500
  "#06b6d4", // Cyan-500
];

interface PenaltyWheelProps {
  onPenaltySelected?: (penalty: Penalty) => void;
}

export default function PenaltyWheel({ onPenaltySelected }: PenaltyWheelProps) {
  const [, setPenalties] = useAtom(penaltiesAtom);
  const [players] = useAtom(playersAtom);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  const [selectedPenaltyIndex, setSelectedPenaltyIndex] = useState<
    number | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const spinWheel = () => {
    setIsSpinning(true);
    setSelectedPenalty(null);
    setSelectedPenaltyIndex(null);
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
        setSelectedPenaltyIndex(currentIndex);
        setIsSpinning(false);
        onPenaltySelected?.(newPenalty);
        return;
      }

      // Slow down animation as we approach the end
      const slowdownFactor = Math.max(0.1, 1 - (cycles / maxCycles) * 0.9);
      const currentSpeed = 100 + 200 * slowdownFactor;

      setTimeout(() => {
        setCurrentIndex(Math.floor(Math.random() * defaultPenalties.length));
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
          className="grid grid-cols-3 gap-2 p-6 rounded-xl max-w-4xl"
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
                index === currentIndex &&
                (isSpinning || selectedPenaltyIndex === index)
                  ? "scale-110 shadow-lg"
                  : ""
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors[index]} 0%, ${colors[index]}dd 100%)`,
                transform:
                  index === currentIndex &&
                  (isSpinning || selectedPenaltyIndex === index)
                    ? "scale(1.1)"
                    : "scale(1)",
                boxShadow:
                  index === currentIndex &&
                  (isSpinning || selectedPenaltyIndex === index)
                    ? `0 10px 20px rgba(0,0,0,0.4), 0 0 30px ${colors[index]}40`
                    : `0 4px 6px rgba(0,0,0,0.2)`,
                border:
                  index === currentIndex &&
                  (isSpinning || selectedPenaltyIndex === index)
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
                selectedPenaltyIndex !== null
                  ? colors[selectedPenaltyIndex]
                  : colors[0],
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
