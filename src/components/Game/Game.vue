<template>
  <section>
    <game-dialog ref="gameDialogRef" :headerTitle="data.dialogHeader">
      <div>{{data.dialogMessage}}</div>
      <div class="dialog-image-container">
        <img class="dialogImage" :src="data.bodyImageUrl" />
      </div>
    </game-dialog>
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
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import GameGoalTracker from '../GameGoalTracker/GameGoalTracker.vue';
import GameBoard from '../GameBoard/GameBoard.vue';
import GameCharacterSheet from '../GameCharacterSheet/GameCharacterSheet.vue';
import GameDialog from '../GameDialog/GameDialog.vue';
import game, { DialogConfig } from '../../lib/game';

interface Data {
  dialogHeader: string;
  dialogMessage: string;
  bodyImageUrl?: string;
}

export default defineComponent({
  components: {
    GameGoalTracker, GameBoard, GameCharacterSheet, GameDialog,
  },
  setup() {
    const gameDialogRef = ref<any>();
    const data = reactive<Data>({
      dialogMessage: '',
      dialogHeader: '',
      bodyImageUrl: '',
    });

    const onPlayerAction = async (idx: number, actionCode: number) => {
      await game.onPlayerSelectedAction(idx, actionCode);
    };

    const onPlayerItemSelected = async (idx: number, itemIdx: number, itemType: number) => {
      await game.onPlayerItemSelected(idx, itemIdx, itemType);
    };

    async function showDialog(config: DialogConfig) {
      data.dialogMessage = config.bodyText;
      data.dialogHeader = config.headerText;
      data.bodyImageUrl = config.bodyImageUrl;
      const result = await gameDialogRef.value.show();
      console.log(result);
      return result;
    }

    onBeforeMount(() => {
      game.bindDialogCallback(showDialog);
      game.resetGame({
        numberOfPlayers: 3,
      });
    });

    return {
      data,
      game,
      gameDialogRef,
      onPlayerAction,
      onPlayerItemSelected,
      showDialog,
    };
  },
});
</script>

<style scoped>
.dialog-image-container {
  text-align: center;
}
.dialogImage {
  width: 150px;
  border: 1px solid #777;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
</style>
