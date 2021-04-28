<template>
  <section class="game-goal-tracker">
    <header class="dificulty">Dificulty: {{ dificulty }}</header>
    <hr />
    <section class="body">
      <section class="depth">
        <div>Depth Level: {{ depthLevelDesc }}</div>
        <span :class="{counters: true, skull: (i) < depthLevel }"
          v-for="(n, i) in depthMax" :key="i" />
        <div>Achieved Objectives: [{{ goalsAchieved.length }}/4]</div>
        <span class='objective-icons'>
          <img v-for="(n, i) in goalsAchieved" :key="i"
          :src="`https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/${goalsAchieved[i]}.png`">
        </span>
      </section>
    </section>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    depthLevel: { type: Number, default: 0 },
    depthMax: { type: Number, default: 7 },
    goalsAchieved: {
      type: Array,
      default: () => [],
      validator: (prop: any) => prop.every((e: any) => typeof e === 'number'),
    },
  },
  computed: {
    /**
     * description of the dificulty based on the maximum life the player started the game
     */
    dificulty() {
      if (this.depthMax > 8) { return 'Novice'; }
      if (this.depthMax > 7) { return 'Easy'; }
      if (this.depthMax > 6) { return 'Normal'; }
      if (this.depthMax > 5) { return 'Expert'; }
      return 'Insane';
    },

    /**
     * The description of the city's depth based on the water level ratio
     */
    depthLevelDesc() {
      if (this.depthLevel >= this.depthMax) { return 'Game Over'; }
      const waterLevel = this.depthLevel / this.depthMax;
      if (waterLevel >= 0.8) { return 'Danger'; }
      if (waterLevel >= 0.6) { return 'Warning'; }
      if (waterLevel >= 0.4) { return 'Caution'; }
      return 'Safe';
    },
  },

  setup() {
    return {};
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
