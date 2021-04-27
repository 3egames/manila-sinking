<template>
  <section class="character-sheet-border">
    <section class='character-sheet'>
      Role: {{ data.roleName }} ({{ data.isActivePlayer ? 'Active' : 'Inactive' }})
       - [{{ data.remainingActions }}/3] actions remaining
    </section>
    <section class='character-sheet-hand'>
      <img class="card-icon" v-for="n in data.hand" :key="n" :src="`https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/${data.hand[n-1]}.png`">
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface Data {
  roleName: string;
  remainingActions: number;
  hand: number[],
}

export default defineComponent({
  setup() {
    const data = reactive<Data>({
      roleName: 'Survivor',
      remainingActions: 3,
      hand: [1, 2, 3, 4],
    });

    return {
      data,
      isActivePlayer: false,
    };
  },
});
</script>

<style scoped>
.character-sheet {
  background-image: linear-gradient(to bottom right, navy, cyan);
}
.character-sheet-hand {
  color: black;
  border: solid 3px black;
  background-image: linear-gradient(to bottom right, #ddd, #999);
  min-height: 50px;
}

.character-sheet-border {
  color: white;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  background: linear-gradient(to right, #888, #333);
  padding: 3px;
}

.card-icon {
  max-width:50px;
  max-height:50px;
  margin: 10px;
}
</style>
