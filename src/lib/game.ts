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

enum GameStates {
  inactive = 0,
  active = 1,
  actionSelect = 2,
  itemSelect = 3,
}

interface GameData {
  status: GameStates
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
  deckDiscoveryDiscard = new Deck('Discovery Discard Pile')
  deckChaosDiscard = new Deck('Chaos Discard Pile')
  discardResolver:any

  data = reactive<GameData>({
    status: GameStates.inactive,
    depthLevel: 0,
    depthMax: 7,
    survivors: [],
    goalsAchieved: [],
    deckDiscovery: new Deck('Discovery Deck'),
    deckChaos: new Deck('Chaos Deck')
  });

  constructor() {
    this.resetGame({ numberOfPlayers: 2 })
  }

  resetGame(options: GameOptions) {
    // rebuild the discovery deck
    this.data.deckDiscovery.clear()
    this.data.deckDiscovery.addCards(CardTypes.discover.engine, 5)
    this.data.deckDiscovery.addCards(CardTypes.discover.fuel, 5)
    this.data.deckDiscovery.addCards(CardTypes.discover.battery, 5)
    this.data.deckDiscovery.addCards(CardTypes.discover.tools, 5)
    this.data.deckDiscovery.addCards(CardTypes.discover.pump, 2)
    this.data.deckDiscovery.addCards(CardTypes.discover.jeepney, 3)
    this.data.deckDiscovery.addCards(CardTypes.discover.flood, 3)
    this.data.deckDiscovery.shuffle()
    //rebuild the chaos deck
    this.data.deckChaos.clear()
    for (const key in CardTypes.areas) {
      this.data.deckChaos.addCards(CardTypes.areas[key])
    }
    // add new players
    this.data.survivors = []
    for (let i = 0; i < options.numberOfPlayers; i += 1) {
      this.data.survivors.push({ 
        type: SurvivorTypes.engineer, // need to randomize this
        isActive: this.data.survivors.length === 0,
        actionsRemaining: 3,
        itemsOnHand: []
      })
    }
    this.data.status = GameStates.actionSelect
  }

  async onPlayerSelectedAction(idx: number, actionCode: number) {
    if (this.data.status !== GameStates.actionSelect) throw new Error('GAME_NOT_IN_ACTION_SELECT_MODE');
    if (!this.data.survivors[idx].isActive) throw new Error('Player is not active'); 
    if (this.data.survivors[idx].actionsRemaining <= 0) throw new Error('Player out of actions'); 
    this.data.survivors[idx].actionsRemaining -= 1;
    console.log(`Survivor #${idx} performed action '#${actionCode}'`);
    if (this.data.survivors[idx].actionsRemaining <= 0) {
      console.log(`Survivor #${idx} has used all his/her actions...`);
      await this.drawFromDiscoveryDeck();
      await this.drawFromDiscoveryDeck();
      await this.switchToNextPlayer();
    }
  }

  async drawFromDiscoveryDeck() {
    if (this.data.status === GameStates.inactive) throw new Error('GAME_NOT_ACTIVE');
    if (this.data.deckDiscovery.CardCount <= 0) this.refreshDiscorveryDeck();
    let card = this.data.deckDiscovery.popCard();
    console.log(`Survivor#${this.currentPlayerIdx} discovered an item: '${card?.name}'`)
    if (card?.name === CardTypes.discover.flood.name) {
      this.increaseDepthLevel()
      this.deckDiscoveryDiscard.addCards(card);
    } else { // add card to hand
      this.data.survivors[this.currentPlayerIdx].itemsOnHand.push(card as CardType)
      if (this.data.survivors[this.currentPlayerIdx].itemsOnHand.length > 5) {
        console.log(`Survivor#${this.currentPlayerIdx} has reached his/her max carry limit and must discard an item...`)
        const target: any = await this.discardMode()
        console.log(`Survivor#${this.currentPlayerIdx} discards '${target.itemType.name}'`);
        this.data.survivors[this.currentPlayerIdx].itemsOnHand.splice(target.itemIdx, 1)
        this.deckDiscoveryDiscard.addCards(target.itemType as CardType);
        this.data.status = GameStates.actionSelect
      }
    }
  }

  async discardMode() {
    this.data.status = GameStates.itemSelect
    return new Promise((resolve) => {
      this.discardResolver = resolve;
    });
  }

  // reshuffles the discovery discard pile back into its deck
  refreshDiscorveryDeck() {
    while (this.deckDiscoveryDiscard.CardCount > 0) {
      this.data.deckDiscovery.addCards(this.deckDiscoveryDiscard.popCard()!);
    }
    this.data.deckDiscovery.shuffle();
    console.log('Discovery deck refreshed!')
  }

  async switchToNextPlayer() {
    if (this.data.status === GameStates.inactive) throw new Error('GAME_NOT_ACTIVE');
    this.data.survivors[this.currentPlayerIdx].isActive = false;
    this.currentPlayerIdx += 1;
    if (this.currentPlayerIdx >= this.data.survivors.length) this.currentPlayerIdx = 0;
    this.data.survivors[this.currentPlayerIdx].isActive = true;
    this.data.survivors[this.currentPlayerIdx].actionsRemaining = 3
    this.data.status === GameStates.actionSelect
    console.log(`Switched to survivor #${this.currentPlayerIdx}!`);
    // todo
  }

  increaseDepthLevel() {
    if (this.data.status === GameStates.inactive) throw new Error('GAME_NOT_ACTIVE');
    if (this.data.depthLevel >= this.data.depthMax) throw new Error('Depth level already maxed');
    this.data.depthLevel += 1;
    console.log(`Depth level increased and is now ${this.data.depthLevel}/${this.data.depthMax}`);
    if (this.data.depthLevel >= this.data.depthMax) { 
      this.data.survivors[this.currentPlayerIdx].isActive = false;
      this.data.status = GameStates.inactive;
      alert('GAME OVER, refresh to reset for now');
    }
  }

  onPlayerItemSelected(idx: number, itemIdx: number, itemType: number) {
    if (this.data.status !== GameStates.itemSelect) throw new Error('GAME_NOT_IN_ITEM_SELECT_MODE');
    if (this.discardResolver) {
      this.discardResolver({ itemIdx, itemType })
      this.discardResolver = null
    }
  }
}

const g = new GameInstance();

export default g;