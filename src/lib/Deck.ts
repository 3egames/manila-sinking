import { CardType } from './CardTypes'

function randomDeckToDeckInsert(source: CardType[], target: CardType[]) {
  while(source.length > 0) {
    target.push(source.splice(Math.floor((Math.random() * source.length)),1)[0])
  }
}

export default class Deck {
  cards: CardType[] =[]
  name: string = 'Unnamed deck'

  constructor(name: string) {
    this.name = name;
  }

  get Name () {
    return this.name;
  }

  addCards(card: CardType, amount: number = 1) {
    if (amount >= 1) {
      for (let i = 0; i < amount; i += 1) {
        this.cards.push(card)
      }
    }
  }

  get CardCount () {
    return this.cards.length
  }

  clear() {
    this.cards = []
  }

  popCard() {
    return this.cards.pop()
  }

  shuffle() {
    // just shuffle back and forth
    const tempDeck: CardType[] = []
    randomDeckToDeckInsert(this.cards, tempDeck)
    randomDeckToDeckInsert(tempDeck, this.cards)
  }
}