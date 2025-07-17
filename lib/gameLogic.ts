import { Player } from './atoms'

export function determineLeaders(players: Player[]): Player[] {
  if (players.length === 0) return []
  
  const playersWithScores = players.filter(p => p.totalStrokes > 0)
  if (playersWithScores.length === 0) return []
  
  const lowestScore = Math.min(...playersWithScores.map(p => p.totalStrokes))
  return playersWithScores.filter(p => p.totalStrokes === lowestScore)
}

export function shouldShowPenaltyWheel(players: Player[], currentHole: number): boolean {
  const leaders = determineLeaders(players)
  return leaders.length > 0 && currentHole > 1
}

export function getLeaderMessage(players: Player[]): string {
  const leaders = determineLeaders(players)
  
  if (leaders.length === 0) return 'No scores yet'
  if (leaders.length === 1) return `${leaders[0].name} is leading with ${leaders[0].totalStrokes} strokes`
  
  const names = leaders.map(p => p.name).join(', ')
  return `${names} are tied for the lead with ${leaders[0].totalStrokes} strokes`
}

export function getRandomLeader(leaders: Player[]): Player | null {
  if (leaders.length === 0) return null
  const randomIndex = Math.floor(Math.random() * leaders.length)
  return leaders[randomIndex]
}