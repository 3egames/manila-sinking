<template>
  <section class="character-sheet-border">
    <section :class="{ 'character-sheet-header': true, active: data.isActiveSurvivor }">
      {{ data.roleName }} : [{{ data.remainingActions }}/3] actions
    </section>
    <section class="character-sheet-hand">
      <div class="action-buttons">
        <button v-for="n in characterActions" :key="n.code" @click="selectAction(n.code)"
          :disabled="!data.isActiveSurvivor || n.code === 99 && !canAquireobjective">
          {{ n.title }}
        </button>
      </div>
      <div class="cards-section">
        <span class="card-icon" v-for="(n, i) in data.hand" :key="i" @click="selectItem(i, n)">
          <img :src="`https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/${data.hand[i]}.png`">
        </span>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue';

interface Data {
  roleName: string;
  remainingActions: number;
  hand: number[],
  isActiveSurvivor: boolean,
}

export default defineComponent({
  props: {
    /** A unique survivor identifier */
    survivorId: { type: Number, required: true },
    /** use this only during documentation to pre-poppulate some data */
    demo: { type: Boolean, default: false },
  },
  computed: {
    characterActions() {
      // prepopulate with the common actions
      const actionList = [
        { title: 'Move Location', code: 1 },
        { title: 'Assist in Flood', code: 2 },
        { title: 'Give Objective Part', code: 3 },
      ];
      if (this.data.roleName === 'Survivor') {
        actionList.push({ title: 'Hadouken', code: 10 });
      }
      // Acquire objective should appear as the last common ability.
      actionList.push({ title: 'Acquire Objective', code: 99 });
      return actionList;
    },
    // checks if survivor meets the items in hand
    canAquireobjective() {
      const cardCounter: Record<string, number> = {};
      // since max hand is 5 and you need 4 of a kind, having 3 types
      // of different card is a sure fail. iterate through the hand
      // and make sure 4 cards are of a type
      if (this.data.hand.length >= 4) {
        for (let i = 0; i < this.data.hand.length; i += 1) {
          const key = this.data.hand[i].toString();
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
    const data = reactive<Data>({
      roleName: 'Survivor',
      remainingActions: 3,
      hand: [],
      isActiveSurvivor: false,
    });

    const selectAction = (actionCode: number) => {
      emit('action', props.survivorId, actionCode);
    };

    const selectItem = (index: number, cardType: number) => {
      emit('itemSelected', props.survivorId, index, cardType);
    };

    /** Revitalize the survivor and set as the active one */
    const activate = () => {
      data.isActiveSurvivor = true;
      data.remainingActions = 3;
    };

    /** Consume an action if possible */
    const reduceAction = () => {
      if (data.remainingActions > 0) { data.remainingActions -= 1; }
      if (data.remainingActions <= 0) {
        data.isActiveSurvivor = false;
        emit('deactivated', props.survivorId);
      } else {
        throw new Error(`Survivor ${props.survivorId} out of actions`);
      }
    };

    onBeforeMount(() => {
      if (props.demo) {
        data.hand = [1, 2, 3, 4, 4];
        data.remainingActions = 2;
        data.isActiveSurvivor = true;
      }
    });

    return {
      data,
      activate,
      reduceAction,
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
.action-buttons button:hover{
  background-color: lime;
}

.cards-section {
  display: inline-block;
}

.card-icon {
  margin: 5px;
  padding: 5px;
  background-color:ghostwhite;
  border: solid 1px black;
  border-radius: 5px;
  display: inline-flex;
}

.card-icon img {
  width:50px;
  height:50px;
}
.card-icon:hover {
  background-color: lime;
}
</style>
