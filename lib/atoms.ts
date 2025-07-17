import { atom } from 'jotai'

export type Player = {
  id: string
  name: string
  scores: number[]
  totalStrokes: number
}

export type PenaltyType = 'shot' | 'hole' | 'persistent'

export type Penalty = {
  id: string
  title: string
  description: string
  type: PenaltyType
  isActive: boolean
  targetPlayerId?: string
}

export type GamePhase = 'setup' | 'score-entry' | 'leader-penalty' | 'game-complete'

export type GameState = {
  currentHole: number
  totalHoles: number
  isGameActive: boolean
  currentLeader?: string
  phase: GamePhase
}

export const playersAtom = atom<Player[]>([])
export const penaltiesAtom = atom<Penalty[]>([])
export const gameStateAtom = atom<GameState>({
  currentHole: 1,
  totalHoles: 18,
  isGameActive: false,
  currentLeader: undefined,
  phase: 'setup'
})