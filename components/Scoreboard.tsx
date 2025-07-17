'use client'

import { useAtom } from 'jotai'
import { playersAtom, gameStateAtom } from '@/lib/atoms'
import { theme } from '@/lib/theme'

export default function Scoreboard() {
  const [players] = useAtom(playersAtom)
  const [gameState] = useAtom(gameStateAtom)

  const sortedPlayers = [...players].sort((a, b) => a.totalStrokes - b.totalStrokes)

  if (players.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: theme.colors.neutral[500] }}>
        Inga spelare tillagda än
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center" style={{ color: theme.colors.neutral[900] }}>
        Resultattavla
      </h2>
      
      <div 
        className="rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: theme.components.card.background,
          boxShadow: theme.components.card.shadow
        }}
      >
        <table className="w-full">
          <thead style={{ backgroundColor: theme.components.scoreboard.header }}>
            <tr>
              <th className="px-4 py-2 text-left" style={{ color: theme.colors.neutral[600] }}>
                Placering
              </th>
              <th className="px-4 py-2 text-left" style={{ color: theme.colors.neutral[600] }}>
                Spelare
              </th>
              <th className="px-4 py-2 text-center" style={{ color: theme.colors.neutral[600] }}>
                Totalt
              </th>
              <th className="px-4 py-2 text-center" style={{ color: theme.colors.neutral[600] }}>
                Hål
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => {
              const isLeader = index === 0 && player.totalStrokes > 0
              const isTied = sortedPlayers.filter(p => p.totalStrokes === player.totalStrokes).length > 1
              
              return (
                <tr 
                  key={player.id}
                  className="border-b"
                  style={{ 
                    backgroundColor: isLeader ? theme.components.scoreboard.leader : theme.components.scoreboard.row,
                    borderColor: isLeader ? theme.components.scoreboard.leaderBorder : theme.components.card.border
                  }}
                  onMouseEnter={(e) => {
                    if (!isLeader) {
                      e.currentTarget.style.backgroundColor = theme.components.scoreboard.rowHover
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLeader) {
                      e.currentTarget.style.backgroundColor = theme.components.scoreboard.row
                    }
                  }}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: theme.colors.neutral[900] }}>
                        #{index + 1}
                      </span>
                      {isLeader && (
                        <span className="text-sm" style={{ color: theme.colors.secondary[600] }}>
                          👑 {isTied ? 'Delad ledning' : 'Ledare'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 font-medium" style={{ color: theme.colors.neutral[900] }}>
                    {player.name}
                  </td>
                  <td className="px-4 py-2 text-center font-bold" style={{ color: theme.colors.neutral[900] }}>
                    {player.totalStrokes || 0}
                  </td>
                  <td className="px-4 py-2 text-center text-sm" style={{ color: theme.colors.neutral[600] }}>
                    {player.scores.length}/{gameState.totalHoles}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div 
        className="p-4 rounded-lg"
        style={{ 
          backgroundColor: theme.components.card.background,
          border: '1px solid #374151'
        }}
      >
        <h3 className="font-semibold mb-2" style={{ color: theme.colors.neutral[900] }}>
          Hål-för-hål resultat
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left" style={{ color: theme.colors.neutral[600] }}>
                  Spelare
                </th>
                {Array.from({ length: gameState.currentHole }, (_, i) => (
                  <th key={i} className="px-2 py-1 text-center w-8" style={{ color: theme.colors.neutral[600] }}>
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id}>
                  <td className="px-2 py-1 font-medium" style={{ color: theme.colors.neutral[900] }}>
                    {player.name}
                  </td>
                  {Array.from({ length: gameState.currentHole }, (_, i) => (
                    <td key={i} className="px-2 py-1 text-center" style={{ color: theme.colors.neutral[700] }}>
                      {player.scores[i] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}