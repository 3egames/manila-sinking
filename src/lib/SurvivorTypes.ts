export interface SurvivorType {
  name: string
  description: string
  abilities: {
    moveDiagonal?: boolean
    assistDiagonal?: boolean
    autoAssistCurrentTile?: boolean
    extraItem?: boolean
  },
  actions: Action[]
}

export enum ActionTypes {
  move = 1,
  assistFlood = 2,
  giveItem = 3,
  acquireObjective = 4
}

export interface Action {
  title: string,
  description: string,
  type: ActionTypes
}

const moveAction: Action = {
  title: 'Move Location',
  description: 'Moves the survivor to a nearby area',
  type: ActionTypes.move
}

const assistAction: Action = {
  title: 'Assist in Flood',
  description: 'Assist in a nearby flooded area',
  type: ActionTypes.assistFlood
}

const giveAction: Action = {
  title: 'Give Item',
  description: 'Gives an item to another survivor',
  type: ActionTypes.giveItem
}

const acquireAction: Action = {
  title: 'Acquire Objective',
  description: 'Achieve an objective by combining 4 related parts in hand',
  type: ActionTypes.acquireObjective
}

const SurvivorTypes: Record<string, SurvivorType> = {
  'engineer': {
    name: 'Engineer',
    description: 'The engineer is an expert in efficiency and strategy. Tiles they end their turn on are on are automatically assisted',
    abilities: { autoAssistCurrentTile: true },
    actions: [ moveAction, assistAction, giveAction, acquireAction ]
  },
  'politician': {
    name: 'Politician',
    description: 'The politician has a larger sphere of influence allowing them to aide the areas diagonal to them.',
    abilities: { assistDiagonal: true },
    actions: [ moveAction, assistAction, giveAction, acquireAction ]
  },
  'athlete': {
    name: 'Athlete',
    description: 'The athlete has fast mobility enabling them to move diagonaly',
    abilities: { moveDiagonal: true },
    actions: [ moveAction, assistAction, giveAction, acquireAction ]
  },
  'bearer': {
    name: 'Bearer',
    description: 'The bearer has an extra item carrying capacity',
    abilities: { extraItem: true },
    actions: [ moveAction, assistAction, giveAction, acquireAction ]
  }
}

export default SurvivorTypes