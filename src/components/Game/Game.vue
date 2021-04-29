<template>
  <section>
    <game-board :boardSize="600" />
    <game-goal-tracker
      :depthLevel="game.state.depthLevel"
      :depthMax="game.state.depthMax"
      :goalsAchieved="game.state.goalsAchieved"
      :deckDiscovery="game.state.deckDiscovery" />
    <game-character-sheet
      v-for="(n, i) in game.state.survivors" :key="i" :survivorId="i"
      :roleName="game.state.survivors[i].roleName"
      :itemsOnHand="game.state.survivors[i].itemsOnHand"
      :isActive="game.state.survivors[i].isActive"
      :actionsRemaining="game.state.survivors[i].actionsRemaining"
      @action="onPlayerAction" @itemSelected="onPlayerItemSelected" />
  </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import GameGoalTracker from '../GameGoalTracker/GameGoalTracker.vue';
import GameBoard from '../GameBoard/GameBoard.vue';
import GameCharacterSheet from '../GameCharacterSheet/GameCharacterSheet.vue';
import game from '../../lib/game';

export default defineComponent({
  components: { GameGoalTracker, GameBoard, GameCharacterSheet },
  setup() {
    onBeforeMount(() => {
      game.clearPlayers();
      game.addPlayer({
        roleName: 'Engineer', isActive: true, actionsRemaining: 3, itemsOnHand: [1, 2, 3, 4, 4],
      });
      game.addPlayer({
        roleName: 'Politician', isActive: false, actionsRemaining: 0, itemsOnHand: [1, 1, 3],
      });
    });

    const onPlayerAction = (idx: number, actionCode: number) => {
      game.onPlayerAction(idx, actionCode);
    };

    const onPlayerItemSelected = (idx: number, itemIdx: number, itemType: number) => {
      game.onPlayerItemSelected(idx, itemIdx, itemType);
    };

    return {
      game,
      onPlayerAction,
      onPlayerItemSelected,
    };
  },
});
</script>
