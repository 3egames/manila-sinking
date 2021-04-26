<template>
  <section class="game-goal-tracker">
    <header class="dificulty">Dificulty: {{ dificulty }}</header>
    <hr />
    <section class="body">
      <section class="depth" @click="increaseDepth">
        <div>Depth Level: {{ depthLevel }}</div>
        <span :class="{counters: true, skull: (data.maxLife - n + 1) > data.livesRemaining }"
          v-for="n in data.maxLife" :key="n" />
      </section>
    </section>
  </section>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  computed: {
    dificulty() {
      if (this.data.maxLife > 8) { return 'Novice'; }
      if (this.data.maxLife > 7) { return 'Easy'; }
      if (this.data.maxLife > 6) { return 'Normal'; }
      if (this.data.maxLife > 5) { return 'Expert'; }
      return 'Evil';
    },
    depthLevel() {
      const waterLevel = this.data.livesRemaining / this.data.maxLife;
      if (waterLevel <= 0.2) { return 'Danger'; }
      if (waterLevel <= 0.4) { return 'Warning'; }
      if (waterLevel <= 0.6) { return 'Caution'; }
      return 'Safe';
    },
  },
  setup() {
    const data = reactive({
      maxLife: 7,
      livesRemaining: 7,
    });

    const restart = (lives: number) => {
      data.maxLife = lives;
      data.livesRemaining = lives;
    };

    const increaseDepth = () => {
      if (data.livesRemaining > 0) data.livesRemaining -= 1;
    };

    return {
      data,
      increaseDepth,
      restart,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Frijole');
@import url('https://fonts.googleapis.com/css?family=Oxygen+Mono');

.game-goal-tracker {
  user-select: none;
  text-align: center;
  font-family: Frijole, 'Courier New', Courier, monospace;
  color: #ddd;
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
</style>
