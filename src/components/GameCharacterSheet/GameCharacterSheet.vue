<template>
  <section class="character-sheet-border">
    <section :class="{ 'character-sheet-header': true, active: isActive  }">
      {{ roleName }} : [{{ actionsRemaining }}/3] actions
    </section>
    <section class="character-sheet-hand">
      <div class="action-buttons">
        <button v-for="n in characterActions" :key="n.code" @click="selectAction(n.code)"
          :disabled="!isActive || n.code === 99 && !canAquireobjective">
          {{ n.title }}
        </button>
      </div>
      <div class="cards-section">
        <button class="card-button" v-for="(n, i) in itemsOnHand" :key="i"
          :disabled="!isActive" @click="selectItem(i, n)">
          <img :src="`https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/${itemsOnHand[i]}.png`">
        </button>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** A unique survivor identifier */
    survivorId: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
    actionsRemaining: { type: Number, default: 0 },
    roleName: { type: String, default: 'Survivor' },
    itemsOnHand: {
      type: Array,
      default: () => [],
      validator: (prop: any) => prop.every((e: any) => typeof e === 'number'),
    },
  },

  computed: {
    characterActions() {
      // prepopulate with the common actions
      const actionList = [
        { title: 'Move Location', code: 1 },
        { title: 'Assist in Flood', code: 2 },
        { title: 'Give Objective Part', code: 3 },
      ];
      if (this.roleName === 'Survivor') {
        actionList.push({ title: 'Hadouken', code: 10 });
      }
      // Acquire objective should appear as the last common ability.
      actionList.push({ title: 'Acquire Objective', code: 99 });
      return actionList;
    },
    // checks if survivor meets the items in hand
    canAquireobjective() {
      const cardCounter: Record<string, number> = {};
      if (!this.itemsOnHand) throw new Error('itemsOnHand is not set.');
      // since max hand is 5 and you need 4 of a kind, having 3 types
      // of different card is a sure fail. iterate through the itemsOnHand
      // and make sure 4 cards are of a type
      if (this.itemsOnHand.length >= 4) {
        for (let i = 0; i < this.itemsOnHand.length; i += 1) {
          const key = (this.itemsOnHand[i] as number[]).toString();
          if (!cardCounter[key]) {
            cardCounter[key] = 1;
          } else {
            cardCounter[key] += 1;
            if (cardCounter[key] >= 4) return true;
          }
        }
      }
      return false;
    },
  },

  setup(props, { emit }) {
    const selectAction = (actionCode: number) => {
      emit('action', props.survivorId, actionCode);
    };

    const selectItem = (index: number, cardType: number) => {
      emit('itemSelected', props.survivorId, index, cardType);
    };

    return {
      selectAction,
      selectItem,
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
  width:50px;
  height:50px;
}
</style>
