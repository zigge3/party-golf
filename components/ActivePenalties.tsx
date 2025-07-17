"use client";

import { useAtom } from "jotai";
import { penaltiesAtom, playersAtom, gameStateAtom } from "@/lib/atoms";
import { theme } from "@/lib/theme";

export default function ActivePenalties() {
  const [penalties, setPenalties] = useAtom(penaltiesAtom);
  const [players] = useAtom(playersAtom);
  const [gameState] = useAtom(gameStateAtom);

  const activePenalties = penalties.filter((p) => p.isActive);

  const getPlayerName = (playerId: string) => {
    if (playerId === "current-leader") return "Current Leader";
    const player = players.find((p) => p.id === playerId);
    return player?.name || "Unknown Player";
  };

  const completePenalty = (penaltyId: string) => {
    setPenalties((prev) =>
      prev.map((p) => (p.id === penaltyId ? { ...p, isActive: false } : p))
    );
  };

  const clearExpiredPenalties = () => {
    setPenalties((prev) =>
      prev.filter((p) => {
        if (!p.isActive) return false;
        if (p.type === "shot") return false;
        if (p.type === "hole") return false;
        return true;
      })
    );
  };

  if (activePenalties.length === 0) {
    return (
      <div
        className="text-center py-4"
        style={{ color: theme.colors.neutral[500] }}
      >
        Inga aktiva straff
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3
          className="text-lg font-semibold"
          style={{ color: theme.colors.neutral[800] }}
        >
          Aktiva straff
        </h3>
        <button
          onClick={clearExpiredPenalties}
          className="text-sm px-3 py-1 rounded transition-colors"
          style={{
            backgroundColor: theme.components.button.secondary.background,
            color: theme.components.button.secondary.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.components.button.secondary.backgroundHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.components.button.secondary.background;
          }}
        >
          Rensa utgångna
        </button>
      </div>

      <div className="space-y-3">
        {activePenalties.map((penalty) => (
          <div
            key={penalty.id}
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: theme.components.penalty.active,
              borderColor: theme.components.penalty.activeBorder,
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p
                  className="font-medium"
                  style={{ color: theme.components.penalty.activeText }}
                >
                  {penalty.description}
                </p>
                <div
                  className="flex items-center gap-4 mt-2 text-sm"
                  style={{ color: theme.components.penalty.activeText }}
                >
                  <span>
                    Spelare: {getPlayerName(penalty.targetPlayerId || "")}
                  </span>
                  <span
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor:
                        penalty.type === "shot"
                          ? theme.components.penalty.shot
                          : penalty.type === "hole"
                          ? theme.components.penalty.hole
                          : theme.components.penalty.persistent,
                      color: theme.colors.neutral[800],
                    }}
                  >
                    {penalty.type === "shot"
                      ? "Nästa slag"
                      : penalty.type === "hole"
                      ? "Detta hål"
                      : "Bestående"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => completePenalty(penalty.id)}
                className="ml-4 px-3 py-1 text-sm rounded transition-colors bg-green-600"
                style={{
                  backgroundColor: theme.components.button.primary.background,
                  color: theme.components.button.primary.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.components.button.primary.backgroundHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.components.button.primary.background;
                }}
              >
                Slutför
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
