"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { playersAtom, gameStateAtom, penaltiesAtom } from "@/lib/atoms";
import { determineLeaders } from "@/lib/gameLogic";
import { theme } from "@/lib/theme";
import {
  saveGameToStorage,
  loadGameFromStorage,
  clearGameStorage,
} from "@/lib/storage";

import PlayerManagement from "@/components/PlayerManagement";
import ScoreEntry from "@/components/ScoreEntry";
import Scoreboard from "@/components/Scoreboard";
import PenaltyWheel from "@/components/PenaltyWheel";
import TieBreaker from "@/components/TieBreaker";
import ActivePenalties from "@/components/ActivePenalties";

export default function Home() {
  const [players, setPlayers] = useAtom(playersAtom);
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [penalties, setPenalties] = useAtom(penaltiesAtom);
  const [showTieBreaker, setShowTieBreaker] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [penaltySelected, setPenaltySelected] = useState(false);

  const leaders = determineLeaders(players);
  const needsTieBreaker = leaders.length > 1;

  // Load game from localStorage on mount
  useEffect(() => {
    const savedGame = loadGameFromStorage();
    if (savedGame) {
      setPlayers(savedGame.players);
      setGameState(savedGame.gameState);
      setPenalties(savedGame.penalties);
    }
  }, [setPlayers, setGameState, setPenalties]);

  // Save game to localStorage whenever state changes
  useEffect(() => {
    if (players.length > 0 || gameState.isGameActive) {
      saveGameToStorage({
        players,
        gameState,
        penalties,
      });
    }
  }, [players, gameState, penalties]);

  const startGame = () => {
    if (players.length < 2) {
      alert("Behöver minst 2 spelare för att starta spelet");
      return;
    }

    setGameState((prev) => ({
      ...prev,
      isGameActive: true,
      currentHole: 1,
      phase: "score-entry",
    }));
  };

  const submitScores = () => {
    const holeIndex = gameState.currentHole - 1;
    const hasValidScores = players.some(
      (p) => p.scores[holeIndex] && p.scores[holeIndex] > 0
    );

    if (!hasValidScores) {
      alert("Vänligen mata in resultat för alla spelare");
      return;
    }

    if (leaders.length > 0) {
      setGameState((prev) => ({ ...prev, phase: "leader-penalty" }));
    } else {
      // No leaders, move to next hole directly
      if (gameState.currentHole >= gameState.totalHoles) {
        setGameState((prev) => ({ ...prev, phase: "game-complete" }));
      } else {
        setGameState((prev) => ({
          ...prev,
          currentHole: prev.currentHole + 1,
          phase: "score-entry",
        }));
      }
    }
  };

  const resetGame = () => {
    setGameState({
      currentHole: 1,
      totalHoles: 18,
      isGameActive: false,
      currentLeader: undefined,
      phase: "setup",
    });
    setPlayers([]);
    setPenalties([]);
    setShowTieBreaker(false);
    setShowWheel(false);
    setPenaltySelected(false);
    clearGameStorage();
  };

  const handleTieBreakerComplete = () => {
    setShowTieBreaker(false);
    setShowWheel(true);
    setPenaltySelected(false);
  };

  const showPenaltyWheel = () => {
    if (needsTieBreaker) {
      setShowTieBreaker(true);
    } else {
      // For single leader, show the wheel directly
      setShowWheel(true);
    }
    setPenaltySelected(false);
  };

  const handlePenaltySelected = () => {
    setPenaltySelected(true);
  };

  const handlePenaltyComplete = () => {
    if (gameState.currentHole >= gameState.totalHoles) {
      setGameState((prev) => ({ ...prev, phase: "game-complete" }));
      clearGameStorage();
    } else {
      // Move to next hole, but don't clear penalties yet - they should apply to the next hole
      setGameState((prev) => ({
        ...prev,
        currentHole: prev.currentHole + 1,
        phase: "score-entry",
      }));

      // Clear expired penalties when moving to next hole
      setPenalties((prev) =>
        prev.filter((p) => {
          // Always keep persistent penalties
          if (p.type === "persistent") return true;

          // For shot and hole penalties, keep them active until they're completed
          // They should be manually completed by the player or automatically after use
          return p.isActive;
        })
      );

      setShowTieBreaker(false);
      setShowWheel(false);
      setPenaltySelected(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        position: "relative",
      }}
    >
      {/* Cool background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)",
          backgroundSize: "400px 400px",
          animation: "pulse 8s ease-in-out infinite alternate",
        }}
      />

      <header
        className="relative z-10 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
          borderBottom: "1px solid #10b981",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            🏌️ Crazy Golf
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Game Setup Phase */}
            {gameState.phase === "setup" && (
              <div className="space-y-6">
                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: theme.components.card.background,
                    boxShadow: theme.components.card.shadow,
                  }}
                >
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: theme.colors.neutral[800] }}
                  >
                    Spelinställningar
                  </h2>
                  <PlayerManagement />
                </div>

                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: theme.components.card.background,
                    boxShadow: theme.components.card.shadow,
                  }}
                >
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: theme.colors.neutral[800] }}
                  >
                    Spelinställningar
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="font-medium"
                      style={{ color: theme.colors.neutral[700] }}
                    >
                      Antal hål:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="36"
                      value={gameState.totalHoles}
                      onChange={(e) =>
                        setGameState((prev) => ({
                          ...prev,
                          totalHoles: parseInt(e.target.value) || 18,
                        }))
                      }
                      className="w-20 px-2 py-1 rounded text-center"
                      style={{
                        backgroundColor: theme.components.input.background,
                        border: `1px solid ${theme.components.input.border}`,
                        color: theme.components.input.text,
                      }}
                    />
                  </div>
                  <button
                    onClick={startGame}
                    disabled={players.length < 2}
                    className="w-full py-3 font-bold rounded-lg transition-colors"
                    style={{
                      backgroundColor:
                        players.length < 2
                          ? theme.colors.neutral[300]
                          : theme.components.button.primary.background,
                      color:
                        players.length < 2
                          ? theme.colors.neutral[500]
                          : theme.components.button.primary.text,
                      cursor: players.length < 2 ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (players.length >= 2) {
                        e.currentTarget.style.backgroundColor =
                          theme.components.button.primary.backgroundHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (players.length >= 2) {
                        e.currentTarget.style.backgroundColor =
                          theme.components.button.primary.background;
                      }
                    }}
                  >
                    Starta spel
                  </button>
                </div>
              </div>
            )}

            {/* Score Entry Phase */}
            {gameState.phase === "score-entry" && (
              <div className="space-y-6">
                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: theme.components.card.background,
                    boxShadow: theme.components.card.shadow,
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: theme.colors.neutral[800] }}
                    >
                      Hål {gameState.currentHole} av {gameState.totalHoles}
                    </h2>
                    <button
                      onClick={resetGame}
                      className="px-4 py-2 rounded transition-colors"
                      style={{
                        backgroundColor:
                          theme.components.button.accent.background,
                        color: theme.components.button.accent.text,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.components.button.accent.backgroundHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.components.button.accent.background;
                      }}
                    >
                      Återställ spel
                    </button>
                  </div>
                  <ScoreEntry />
                  <button
                    onClick={submitScores}
                    className="w-full mt-4 py-3 font-bold rounded-lg transition-colors bg-green-600"
                    style={{
                      backgroundColor: theme.components.button.info.background,
                      color: theme.components.button.info.text,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.components.button.info.backgroundHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.components.button.info.background;
                    }}
                  >
                    Fortsätt
                  </button>
                </div>
              </div>
            )}

            {/* Leader Penalty Phase */}
            {gameState.phase === "leader-penalty" && (
              <div className="space-y-6">
                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: theme.components.card.background,
                    boxShadow: theme.components.card.shadow,
                  }}
                >
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: theme.colors.neutral[800] }}
                  >
                    Hål {gameState.currentHole} klart!
                  </h2>
                  <div className="text-center mb-6">
                    <p
                      className="text-lg mb-4"
                      style={{ color: theme.colors.neutral[700] }}
                    >
                      {leaders.length === 1
                        ? `${leaders[0].name} leder med ${leaders[0].totalStrokes} slag!`
                        : `${leaders
                            .map((p) => p.name)
                            .join(", ")} delar ledningen med ${
                            leaders[0].totalStrokes
                          } slag!`}
                    </p>

                    {!showTieBreaker && !showWheel && (
                      <button
                        onClick={showPenaltyWheel}
                        className="px-6 py-3 font-bold rounded-lg transition-colors bg-green-600"
                        style={{
                          backgroundColor:
                            theme.components.button.accent.background,
                          color: theme.components.button.accent.text,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            theme.components.button.accent.backgroundHover;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            theme.components.button.accent.background;
                        }}
                      >
                        {needsTieBreaker
                          ? "Bestäm vem som snurrar"
                          : "Snurra straffhjulet"}
                      </button>
                    )}
                  </div>

                  {showTieBreaker && needsTieBreaker ? (
                    <TieBreaker
                      tiedPlayers={leaders}
                      onPlayerSelected={handleTieBreakerComplete}
                    />
                  ) : (
                    showWheel && (
                      <div className="space-y-6">
                        <PenaltyWheel
                          onPenaltySelected={handlePenaltySelected}
                        />
                        <div className="text-center">
                          <button
                            onClick={handlePenaltyComplete}
                            disabled={!penaltySelected}
                            className="px-6 py-3 font-bold rounded-lg transition-colors"
                            style={{
                              backgroundColor: penaltySelected
                                ? theme.components.button.primary.background
                                : theme.colors.neutral[300],
                              color: penaltySelected
                                ? theme.components.button.primary.text
                                : theme.colors.neutral[500],
                              cursor: penaltySelected
                                ? "pointer"
                                : "not-allowed",
                            }}
                            onMouseEnter={(e) => {
                              if (penaltySelected) {
                                e.currentTarget.style.backgroundColor =
                                  theme.components.button.primary.backgroundHover;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (penaltySelected) {
                                e.currentTarget.style.backgroundColor =
                                  theme.components.button.primary.background;
                              }
                            }}
                          >
                            Fortsätt till nästa hål
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Game Complete Phase */}
            {gameState.phase === "game-complete" && (
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: theme.components.card.background,
                  boxShadow: theme.components.card.shadow,
                }}
              >
                <h2
                  className="text-2xl font-bold text-center mb-6"
                  style={{ color: theme.colors.neutral[800] }}
                >
                  🏆 Spelet klart!
                </h2>
                <div className="text-center mb-6">
                  <p
                    className="text-lg mb-4"
                    style={{ color: theme.colors.neutral[700] }}
                  >
                    Slutresultat:
                  </p>
                  {leaders.length > 0 && (
                    <div className="mb-4">
                      <p
                        className="text-xl font-bold"
                        style={{ color: theme.colors.primary[600] }}
                      >
                        🥇 Vinnare: {leaders[0].name} med{" "}
                        {leaders[0].totalStrokes} slag!
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    onClick={resetGame}
                    className="px-8 py-3 font-bold rounded-lg transition-colors"
                    style={{
                      backgroundColor: theme.components.button.info.background,
                      color: theme.components.button.info.text,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.components.button.info.backgroundHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.components.button.info.background;
                    }}
                  >
                    Spela igen
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar with scoreboard */}
          <div className="space-y-6">
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: theme.components.card.background,
                boxShadow: theme.components.card.shadow,
              }}
            >
              <Scoreboard />
            </div>

            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: theme.components.card.background,
                boxShadow: theme.components.card.shadow,
              }}
            >
              <ActivePenalties />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
