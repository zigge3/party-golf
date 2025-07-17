'use client'

import { useAtom } from 'jotai'
import { gameStateAtom, playersAtom, penaltiesAtom } from '@/lib/atoms'

export default function GameManager() {
  const [gameState, setGameState] = useAtom(gameStateAtom)
  const [players, setPlayers] = useAtom(playersAtom)
  const [penalties, setPenalties] = useAtom(penaltiesAtom)

  const startGame = () => {
    if (players.length < 2) {
      alert('Need at least 2 players to start the game')
      return
    }
    
    setGameState(prev => ({
      ...prev,
      isGameActive: true,
      currentHole: 1
    }))
  }

  const nextHole = () => {
    if (gameState.currentHole < gameState.totalHoles) {
      setGameState(prev => ({
        ...prev,
        currentHole: prev.currentHole + 1
      }))
      
      setPenalties(prev => prev.filter(p => p.type === 'persistent'))
    }
  }

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      currentHole: 1
    }))
    
    setPlayers(prev => prev.map(p => ({ ...p, scores: [], totalStrokes: 0 })))
    setPenalties([])
  }

  const resetGame = () => {
    setGameState({
      currentHole: 1,
      totalHoles: 18,
      isGameActive: false,
      currentLeader: undefined
    })
    setPlayers([])
    setPenalties([])
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Game Control</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-medium">Total Holes:</span>
          <input
            type="number"
            min="1"
            max="36"
            value={gameState.totalHoles}
            onChange={(e) => setGameState(prev => ({ 
              ...prev, 
              totalHoles: parseInt(e.target.value) || 18 
            }))}
            disabled={gameState.isGameActive}
            className="w-20 px-2 py-1 border rounded text-center"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="font-medium">Current Hole:</span>
          <span className="text-2xl font-bold text-blue-600">
            {gameState.currentHole} / {gameState.totalHoles}
          </span>
        </div>

        <div className="flex gap-2">
          {!gameState.isGameActive ? (
            <button
              onClick={startGame}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Start Game
            </button>
          ) : (
            <>
              {gameState.currentHole < gameState.totalHoles ? (
                <button
                  onClick={nextHole}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Next Hole
                </button>
              ) : (
                <button
                  onClick={endGame}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Finish Game
                </button>
              )}
            </>
          )}
          
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reset Game
          </button>
        </div>

        <div className={`p-3 rounded-lg ${
          gameState.isGameActive ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
        }`}>
          <span className="font-medium">Status: </span>
          <span className={gameState.isGameActive ? 'text-green-600' : 'text-gray-600'}>
            {gameState.isGameActive ? 'Game Active' : 'Game Not Started'}
          </span>
        </div>
      </div>
    </div>
  )
}