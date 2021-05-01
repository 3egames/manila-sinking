<template>
  <section>
    <game-board :boardSize="600" />
    <game-goal-tracker
      :depthLevel="game.data.depthLevel"
      :depthMax="game.data.depthMax"
      :goalsAchieved="game.data.goalsAchieved"
      :deckDiscovery="game.data.deckDiscovery" />
    <game-character-sheet
      v-for="(n, i) in game.data.survivors" :key="i"
      :gameState="game.data.status" :survivorId="i"
      :survivorType="game.data.survivors[i].type"
      :itemsOnHand="game.data.survivors[i].itemsOnHand"
      :isActive="game.data.survivors[i].isActive"
      :actionsRemaining="game.data.survivors[i].actionsRemaining"
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
      game.resetGame({
        numberOfPlayers: 3,
      });
    });

    const onPlayerAction = async (idx: number, actionCode: number) => {
      await game.onPlayerSelectedAction(idx, actionCode);
    };

    const onPlayerItemSelected = async (idx: number, itemIdx: number, itemType: number) => {
      await game.onPlayerItemSelected(idx, itemIdx, itemType);
    };

    return {
      game,
      onPlayerAction,
      onPlayerItemSelected,
    };
  },
});
</script>
