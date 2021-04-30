export interface SurvivorType {
  name: string
  description: string
  abilities: {
    moveDiagonal?: boolean
    assistDiagonal?: boolean
    autoAssistCurrentTile?: boolean
    extraItem?: boolean
  }
}

const SurvivorTypes: Record<string, SurvivorType> = {
  'engineer': {
    name: 'Engineer',
    description: 'The engineer is an expert in efficiency and strategy. Tiles they end their turn on are on are automatically assisted',
    abilities: { autoAssistCurrentTile: true }
  },
  'politician': {
    name: 'Politician',
    description: 'The politician has a larger sphere of influence allowing them to aide the areas diagonal to them.',
    abilities: { assistDiagonal: true }
  },
  'athlete': {
    name: 'Athlete',
    description: 'The athlete has fast mobility enabling them to move diagonaly',
    abilities: { moveDiagonal: true }
  },
  'collector': {
    name: 'Collector',
    description: 'The collector has an extra item carrying capacity',
    abilities: { extraItem: true }
  }
}

export default SurvivorTypes