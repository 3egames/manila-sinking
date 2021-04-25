<template>
  <section v-if="tileNumber > 0" class="scaleable-tile">
    <div class='tile-name'>{{ tileName }}</div>
    <img src="../../assets/tiles/1.png" />
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tileName: {
      type: String,
      required: true,
    },
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
    };
  },
});
</script>

<style scoped>
.scaleable-tile {
  position: absolute;
  max-height:100px;
  max-width:100px;
}
.scaleable-tile img {
  z-index: 1;
  max-width:100%;
  max-height:100%;
}
.tile-name {
  font-size: .8em;
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: burlywood;
  text-align: center;
  bottom: 1px;
  margin: 1px;
}
</style>
