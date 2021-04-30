import { reactive } from 'vue';
import Deck from './Deck'
import CardTypes, { CardType } from './CardTypes'
import SurvivorTypes, { SurvivorType } from './SurvivorTypes'

interface Survivor {
  type: SurvivorType;
  isActive: boolean;
  actionsRemaining: number;
  itemsOnHand: CardType[];
}

interface GameState {
  depthLevel: number;
  depthMax: number;
  survivors: Survivor[];
  goalsAchieved: number[];
  deckDiscovery: Deck;
  deckChaos: Deck;
}

interface GameOptions {
  numberOfPlayers: number
}

class GameInstance {
  currentPlayerIdx = 0
  deckDiscoveryDiscard = new Deck()
  deckChaosDiscard = new Deck()

  state = reactive<GameState>({
    depthLevel: 0,
    depthMax: 7,
    survivors: [],
    goalsAchieved: [],
    deckDiscovery: new Deck(),
    deckChaos: new Deck()
  });

  constructor() {
    this.resetGame({ numberOfPlayers: 2 })
  }

  resetGame(options: GameOptions) {
    // rebuild the discovery deck
    this.state.deckDiscovery.clear()
    this.state.deckDiscovery.addCards(CardTypes.discover.engine, 5)
    this.state.deckDiscovery.addCards(CardTypes.discover.fuel, 5)
    this.state.deckDiscovery.addCards(CardTypes.discover.battery, 5)
    this.state.deckDiscovery.addCards(CardTypes.discover.tools, 5)
    this.state.deckDiscovery.addCards(CardTypes.discover.pump, 2)
    this.state.deckDiscovery.addCards(CardTypes.discover.jeepney, 3)
    this.state.deckDiscovery.addCards(CardTypes.discover.flood, 3)
    this.state.deckDiscovery.shuffle()
    //rebuild the chaos deck
    this.state.deckChaos.clear()
    for (const key in CardTypes.areas) {
      this.state.deckChaos.addCards(CardTypes.areas[key])
    }
    // add new players
    this.state.survivors = []
    for (let i = 0; i < options.numberOfPlayers; i += 1) {
      this.state.survivors.push({ 
        type: SurvivorTypes.engineer, // need to randomize this
        isActive: this.state.survivors.length === 0,
        actionsRemaining: 3,
        itemsOnHand: []
      })
    }
  }

  onPlayerAction(idx: number, actionCode: number) {
    if (!this.state.survivors[idx].isActive) throw new Error('Player is not active'); 
    if (this.state.survivors[idx].actionsRemaining <= 0) throw new Error('Player out of actions'); 
    this.state.survivors[idx].actionsRemaining -= 1;
    if (this.state.survivors[idx].actionsRemaining <= 0) this.switchToNextPlayer();
    console.log(`survivor #${idx} performed action #${actionCode}`);
  }

  switchToNextPlayer() {
    let pop = this.state.deckDiscovery.popCard();
    this.state.survivors[this.currentPlayerIdx].itemsOnHand.push(pop as CardType)
    console.log(`popped a ${pop?.name} card`)
    pop = this.state.deckDiscovery.popCard();
    this.state.survivors[this.currentPlayerIdx].itemsOnHand.push(pop as CardType)
    console.log(`popped a ${pop?.name} card`)
    this.state.survivors[this.currentPlayerIdx].isActive = false;
    this.currentPlayerIdx += 1;
    if (this.currentPlayerIdx >= this.state.survivors.length) this.currentPlayerIdx = 0;
    this.state.survivors[this.currentPlayerIdx].isActive = true;
    this.state.survivors[this.currentPlayerIdx].actionsRemaining = 3
    // todo
    this.increaseDepthLevel()
  }

  increaseDepthLevel() {
    if (this.state.depthLevel >= this.state.depthMax) throw new Error('Depth level already maxed');
    this.state.depthLevel += 1;
    if (this.state.depthLevel >= this.state.depthMax) { 
      alert('GAME OVER, refresh to reset for now');
      this.state.survivors[this.currentPlayerIdx].isActive = false;
    }
  }

  onPlayerItemSelected(idx: number, itemIdx: number, itemType: number) {
    alert(`survivor #${idx} selected item on index ${itemIdx} of type #${itemType}`);
  }
}

const g = new GameInstance();

export default g;