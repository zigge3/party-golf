'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { playersAtom, type Player } from '@/lib/atoms'
import { theme } from '@/lib/theme'

export default function PlayerManagement() {
  const [players, setPlayers] = useAtom(playersAtom)
  const [newPlayerName, setNewPlayerName] = useState('')

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        scores: [],
        totalStrokes: 0
      }
      setPlayers([...players, newPlayer])
      setNewPlayerName('')
    }
  }

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId))
  }

  const updatePlayerScore = (playerId: string, holeIndex: number, strokes: number) => {
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        const newScores = [...player.scores]
        newScores[holeIndex] = strokes
        return {
          ...player,
          scores: newScores,
          totalStrokes: newScores.reduce((sum, score) => sum + (score || 0), 0)
        }
      }
      return player
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Ange spelarnamn"
          className="flex-1 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: theme.components.input.background,
            border: `1px solid ${theme.components.input.border}`,
            color: theme.components.input.text
          }}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.components.input.borderFocus
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.components.input.border
          }}
        />
        <button
          onClick={addPlayer}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: theme.components.button.info.background,
            color: theme.components.button.info.text
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.components.button.info.backgroundHover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.components.button.info.background
          }}
        >
          Lägg till spelare
        </button>
      </div>

      <div className="space-y-2">
        {players.map(player => (
          <div 
            key={player.id} 
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: theme.colors.neutral[50] }}
          >
            <div>
              <span className="font-medium" style={{ color: theme.colors.neutral[800] }}>
                {player.name}
              </span>
              <span className="ml-2 text-sm" style={{ color: theme.colors.neutral[600] }}>
                ({player.totalStrokes} slag)
              </span>
            </div>
            <button
              onClick={() => removePlayer(player.id)}
              className="px-3 py-1 rounded transition-colors"
              style={{
                backgroundColor: theme.components.button.accent.background,
                color: theme.components.button.accent.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.components.button.accent.backgroundHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.components.button.accent.background
              }}
            >
              Ta bort
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}