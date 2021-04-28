import { reactive } from 'vue';


interface Survivor {
  roleName: string;
  isActive: boolean;
  actionsRemaining: number;
  itemsOnHand: number[];
}

interface GameState {
  depthLevel: number;
  depthMax: number;
  survivors: Survivor[];
  goalsAchieved: number[];
}

class GameInstance {
  currentPlayerIdx = 0;
  state: GameState = reactive({
    depthLevel: 0,
    depthMax: 7,
    survivors: [],
    goalsAchieved: [],
  });
  
  addPlayer(player: Survivor) {
    if (this.state.survivors.length < 4) this.state.survivors.push(player);
    else throw new Error('Max players reached');
  };

  clearPlayers() {
    while (this.state.survivors.length) this.state.survivors.pop()
  };

  onPlayerAction(idx: number, actionCode: number) {
    if (!this.state.survivors[idx].isActive) throw new Error('Player is not active'); 
    if (this.state.survivors[idx].actionsRemaining <= 0) throw new Error('Player out of actions'); 
    this.state.survivors[idx].actionsRemaining -= 1;
    if (this.state.survivors[idx].actionsRemaining <= 0) this.switchToNextPlayer();
    console.log(`survivor #${idx} performed action #${actionCode}`);
  }

  switchToNextPlayer() {
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