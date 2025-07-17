'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { playersAtom, gameStateAtom } from '@/lib/atoms'
import { theme } from '@/lib/theme'

export default function ScoreEntry() {
  const [players, setPlayers] = useAtom(playersAtom)
  const [gameState] = useAtom(gameStateAtom)
  const [scores, setScores] = useState<{ [playerId: string]: string }>({})

  const updateScore = (playerId: string, strokes: string) => {
    setScores(prev => ({ ...prev, [playerId]: strokes }))
    
    // Auto-update player scores when they change
    const holeIndex = gameState.currentHole - 1
    const strokesNum = parseInt(strokes) || 0
    
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        const newScores = [...player.scores]
        newScores[holeIndex] = strokesNum
        
        return {
          ...player,
          scores: newScores,
          totalStrokes: newScores.reduce((sum, score) => sum + (score || 0), 0)
        }
      }
      return player
    }))
  }


  if (players.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: theme.colors.neutral[500] }}>
        Lägg till spelare för att börja mata in resultat
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: theme.colors.neutral[800] }}>
        Hål {gameState.currentHole} Resultat
      </h3>
      
      <div className="space-y-3">
        {players.map(player => (
          <div key={player.id} className="flex items-center gap-3">
            <span className="w-32 font-medium" style={{ color: theme.colors.neutral[800] }}>
              {player.name}
            </span>
            <input
              type="number"
              min="1"
              value={scores[player.id] || ''}
              onChange={(e) => updateScore(player.id, e.target.value)}
              placeholder="Slag"
              className="w-20 px-2 py-1 rounded text-center"
              style={{
                backgroundColor: theme.components.input.background,
                border: `1px solid ${theme.components.input.border}`,
                color: theme.components.input.text
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = theme.components.input.borderFocus
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = theme.components.input.border
              }}
            />
            <span className="text-sm" style={{ color: theme.colors.neutral[600] }}>
              Totalt: {player.totalStrokes}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}