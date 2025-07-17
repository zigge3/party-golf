import { Player, GameState, Penalty } from './atoms'

const STORAGE_KEY = 'crazy-golf-game-state'

export interface GameData {
  players: Player[]
  gameState: GameState
  penalties: Penalty[]
}

export const saveGameToStorage = (data: GameData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving game to localStorage:', error)
  }
}

export const loadGameFromStorage = (): GameData | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading game from localStorage:', error)
  }
  return null
}

export const clearGameStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing game storage:', error)
  }
}