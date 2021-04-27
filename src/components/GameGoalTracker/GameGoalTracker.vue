<template>
  <section class="game-goal-tracker">
    <header class="dificulty">Dificulty: {{ dificulty }}</header>
    <hr />
    <section class="body">
      <section class="depth" @click="increaseDepth">
        <div>Depth Level: {{ depthLevel }}</div>
        <span :class="{counters: true, skull: (data.maxLife - n + 1) > data.livesRemaining }"
          v-for="n in data.maxLife" :key="n" />
        <div>Achieved Objectives: [{{ data.completedObjectives.length }}/4]</div>
        <span class='objective-icons'>
          <img v-for="(n, i) in data.completedObjectives" :key="i" @click="selectItem(i, n)"
          :src="`https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/${data.completedObjectives[i]}.png`">
        </span>
      </section>
    </section>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive } from 'vue';

interface Data {
  maxLife: number,
  livesRemaining: number,
  completedObjectives: number[],
}

export default defineComponent({
  props: {
    demo: { type: Boolean, default: false },
  },
  computed: {
    /**
     * description of the dificulty based on the maximum life the player started the game
     */
    dificulty() {
      if (this.data.maxLife > 8) { return 'Novice'; }
      if (this.data.maxLife > 7) { return 'Easy'; }
      if (this.data.maxLife > 6) { return 'Normal'; }
      if (this.data.maxLife > 5) { return 'Expert'; }
      return 'Evil';
    },

    /**
     * The description of the city's depth based on the water level ratio
     */
    depthLevel() {
      if (this.data.livesRemaining <= 0) { return 'Game Over'; }
      const waterLevel = this.data.livesRemaining / this.data.maxLife;
      if (waterLevel <= 0.2) { return 'Danger'; }
      if (waterLevel <= 0.4) { return 'Warning'; }
      if (waterLevel <= 0.6) { return 'Caution'; }
      return 'Safe';
    },

    /**
     * The speed to which the flood cards are consumed.
     * The more the players have less lives remaining the faster it goes.
     */
    drownSpeed() {
      if (this.data.livesRemaining <= 0) { return 0; }
      if (this.data.livesRemaining <= 2) { return 5; }
      if (this.data.livesRemaining <= 4) { return 4; }
      if (this.data.livesRemaining <= 7) { return 3; }
      return 2;
    },
  },

  setup(props, { emit }) {
    const data = reactive<Data>({
      maxLife: 7,
      livesRemaining: 7,
      completedObjectives: [],
    });

    const restart = (lives: number) => {
      data.maxLife = lives;
      data.livesRemaining = lives;
    };

    const increaseDepth = () => {
      if (data.livesRemaining > 0) data.livesRemaining -= 1;
      if (data.livesRemaining <= 0) emit('defeated');
    };

    const completeObjective = (objectiveCode: number) => {
      if (data.completedObjectives.indexOf(objectiveCode) < 0) {
        data.completedObjectives.push(objectiveCode);
        if (data.completedObjectives.length >= 4) emit('victory');
      }
      throw new Error(`Objective #${objectiveCode} already achieved.`);
    };

    onBeforeMount(() => {
      if (props.demo) {
        data.maxLife = 7;
        data.livesRemaining = 4;
        data.completedObjectives = [3, 2];
      }
    });

    return {
      data,
      completeObjective,
      increaseDepth,
      restart,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Frijole');

.game-goal-tracker {
  user-select: none;
  text-align: center;
  font-family: Frijole, 'Courier New', Courier, monospace;
  color: white;
  border: 20px black;
  background-color: darkcyan;
}
.dificulty {
  background-color: navy;
  font-size: 1.5em;
}
.body {
  background-color: rgba(128, 0, 26, 0.925);
}
.depth {
  font-size: 1.2em;
  background-image: url("https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/animated-water.gif");
}

.counters {
  width: 50px;
  height: 50px;
  display: inline-flex;
  background-size: 50px 50px;
  background-repeat: no-repeat;
  background-image: url("https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/life-saver.png");
}

.skull {
  background-image: url("https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/tiles/skull.png");
}

.objective-icons {
  display: inline-flex;
  min-height: 70px;
}
.objective-icons img {
  height: 50px;
}
</style>
