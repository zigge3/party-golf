'use client'

import { useState } from 'react'
import { Player } from '@/lib/atoms'
import { theme } from '@/lib/theme'

const colors = [
  '#16a34a', '#dc2626', '#2563eb', '#d97706', 
  '#9333ea', '#0891b2', '#be123c', '#7c2d12'
]

interface TieBreakerProps {
  tiedPlayers: Player[]
  onPlayerSelected: (player: Player) => void
}

export default function TieBreaker({ tiedPlayers, onPlayerSelected }: TieBreakerProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const spinWheel = () => {
    setIsSpinning(true)
    setSelectedPlayer(null)
    
    let cycles = 0
    const maxCycles = 12 + Math.floor(Math.random() * 8) // 12-20 cycles
    
    const animate = () => {
      if (cycles >= maxCycles) {
        // Animation complete, select the current player
        const winner = tiedPlayers[currentIndex]
        setSelectedPlayer(winner)
        setIsSpinning(false)
        return
      }
      
      // Slow down animation as we approach the end
      const slowdownFactor = Math.max(0.15, 1 - (cycles / maxCycles) * 0.85)
      const currentSpeed = 120 + (180 * slowdownFactor)
      
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % tiedPlayers.length)
        cycles++
        animate()
      }, currentSpeed)
    }
    
    animate()
  }

  const confirmSelection = () => {
    if (selectedPlayer) {
      onPlayerSelected(selectedPlayer)
    }
  }

  return (
    <div 
      className="flex flex-col items-center space-y-6 p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: theme.components.card.background }}
    >
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.neutral[800] }}>
          Oavgjort!
        </h3>
        <p style={{ color: theme.colors.neutral[600] }}>
          {tiedPlayers.map(p => p.name).join(', ')} delar ledningen
        </p>
        <p className="text-sm mt-1" style={{ color: theme.colors.neutral[500] }}>
          Snurra för att bestämma vem som får straffhjulet
        </p>
      </div>

      {/* Simple Player Selection Display */}
      <div className="relative">
        <div className="flex flex-wrap justify-center gap-3 p-4 bg-gray-100 rounded-lg">
          {tiedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`px-4 py-3 rounded-lg text-center text-white font-bold transition-all duration-200 min-w-[80px] ${
                index === currentIndex && isSpinning ? 'scale-110 shadow-lg' : ''
              }`}
              style={{
                backgroundColor: colors[index % colors.length],
                transform: index === currentIndex && isSpinning ? 'scale(1.1)' : 'scale(1)',
                boxShadow: index === currentIndex && isSpinning ? '0 4px 8px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              {player.name}
            </div>
          ))}
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>

      {!selectedPlayer ? (
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="px-6 py-3 font-bold rounded-lg transition-colors"
          style={{
            backgroundColor: isSpinning ? theme.colors.neutral[400] : theme.components.button.warning.background,
            color: theme.components.button.warning.text,
            cursor: isSpinning ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => {
            if (!isSpinning) {
              e.currentTarget.style.backgroundColor = theme.components.button.warning.backgroundHover
            }
          }}
          onMouseLeave={(e) => {
            if (!isSpinning) {
              e.currentTarget.style.backgroundColor = theme.components.button.warning.background
            }
          }}
        >
          {isSpinning ? 'Snurrar...' : 'Snurra för straff!'}
        </button>
      ) : (
        <div className="text-center space-y-4">
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: theme.components.penalty.shot,
              borderColor: theme.components.penalty.shotBorder,
              border: '1px solid'
            }}
          >
            <p className="text-lg font-bold" style={{ color: theme.colors.neutral[800] }}>
              {selectedPlayer.name} snurrar straffhjulet!
            </p>
            <div 
              className="mt-2 px-3 py-1 rounded-lg text-white font-bold inline-block"
              style={{ backgroundColor: colors[tiedPlayers.findIndex(p => p.id === selectedPlayer.id) % colors.length] }}
            >
              {selectedPlayer.name}
            </div>
          </div>
          <button
            onClick={confirmSelection}
            className="px-6 py-3 font-bold rounded-lg transition-colors"
            style={{
              backgroundColor: theme.components.button.primary.background,
              color: theme.components.button.primary.text
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.components.button.primary.backgroundHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.components.button.primary.background
            }}
          >
            Fortsätt till straffhjulet
          </button>
        </div>
      )}
    </div>
  )
}