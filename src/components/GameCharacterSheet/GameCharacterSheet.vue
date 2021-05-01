<template>
  <section class="character-sheet-border">
    <section :class="{ 'character-sheet-header': true, active: isActive  }">
      {{ survivorType.name }} : [{{ actionsRemaining }}/3] actions
    </section>
    <section class="character-sheet-hand">
      <div class="action-buttons">
        <button v-for="n in survivorType.actions" :key="n.code" :title="n.description"
          @click="selectAction(n.type)" :disabled="!isActionsEnabled(n.type)" >
          {{ n.title }}
        </button>
      </div>
      <div class="cards-section">
        <button class="card-button" v-for="(n, i) in itemsOnHand" :key="i"
          :disabled="!isHandCardEnabled(n)" @click="selectItem(i, n)">
          <img :src="itemsOnHand[i].imageUrl">
        </button>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GameStates } from '../../lib/game';
import CardTypes, { CardType } from '../../lib/CardTypes';
import { ActionTypes } from '../../lib/SurvivorTypes';

export default defineComponent({
  props: {
    /** A unique survivor identifier */
    gameState: { type: Number, required: true },
    survivorId: { type: Number, required: true },
    survivorType: { type: Object, required: true },
    isActive: { type: Boolean, default: false },
    actionsRemaining: { type: Number, default: 0 },
    itemsOnHand: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const selectAction = (actionCode: number) => {
      emit('action', props.survivorId, actionCode);
    };

    const selectItem = (index: number, cardType: number) => {
      emit('itemSelected', props.survivorId, index, cardType);
    };

    // checks if survivor meets the items in hand
    function canAquireobjective() {
      if (!props.itemsOnHand) throw new Error('itemsOnHand is not set.');
      // since max hand is 5 and you need 4 of a kind, having 3 types
      // of different card is a sure fail. iterate through the itemsOnHand
      // and make sure 4 cards are of a type
      if (props.itemsOnHand.length >= 4) {
        const cardCounter: Record<string, number> = {};
        for (let i = 0; i < props.itemsOnHand.length; i += 1) {
          const key = (props.itemsOnHand[i] as CardType).name;
          if (!cardCounter[key]) {
            cardCounter[key] = 1;
          } else {
            cardCounter[key] += 1;
            if (cardCounter[key] >= 4) return true;
          }
        }
      }
      return false;
    }

    function isActionsEnabled(actionType: ActionTypes) {
      // !isActive || n.code === 99 && !canAquireobjective
      if (
        ( // Everything is enabled on actionSelect except the acquireObjective
          props.isActive && props.gameState === GameStates.actionSelect
          && actionType !== ActionTypes.acquireObjective
        ) || ( // acquireObjective is enabled on the same condition if canAquireobjective = true
          props.isActive && props.gameState === GameStates.actionSelect
          && actionType === ActionTypes.acquireObjective && canAquireobjective()
        )
      ) {
        return true;
      }
      return false;
    }

    function isHandCardEnabled(card: CardType) {
      if ((props.isActive && props.gameState === GameStates.itemSelect)
        || (card.name === CardTypes.discover.pump.name
        || card.name === CardTypes.discover.jeepney.name)) {
        return true;
      }
      return false;
    }

    return {
      selectAction,
      selectItem,
      isActionsEnabled,
      isHandCardEnabled,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Frijole');

.character-sheet-header {
  font-family: Frijole, 'Courier New', Courier, monospace;
  padding: 2px;
  background-image: linear-gradient(to bottom right, #222, #666);
}
.character-sheet-header.active {
  background-image: linear-gradient(to bottom right, navy, cyan);
}

.character-sheet-hand {
  color: black;
  border: solid 3px black;
  background-image: linear-gradient(to bottom right, #ddd, #999);
  min-height: 50px;
  display: inline-flex;
  width: 100%;
}

.character-sheet-border {
  color: white;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  background: linear-gradient(to right, #888, #333);
  padding: 3px;
}

.action-buttons {
  display: inline-block;
  vertical-align:top;
  min-width: 120px;
  width: 40%;
}
.action-buttons button{
  width: 100%;
}

.cards-section {
  user-select: none;
  display: inline-block;
}

.card-button {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  display: inline-flex;
}

.card-button img {
  width:40px;
  height:40px;
}
</style>
