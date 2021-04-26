<template>
  <section v-if="tileNumber > 0" class="scaleable-tile">
    <img :src="imgSrc" />
    <div class='tile-name' ref="tileNameRef">{{ tileName }}</div>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    tileName: { type: String, required: true },
    tileNumber: { type: Number, required: true },
    tileSize: { type: Number, required: true },
  },
  setup(props) {
    const GITHUB_ASSETS_URL = 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/';
    const tileNameRef = ref<any>();
    onMounted(() => {
      if (tileNameRef.value) {
        tileNameRef.value.style.fontSize = `${props.tileSize / 120}em`;
      }
    });
    return {
      imgSrc: `${GITHUB_ASSETS_URL}tiles/${props.tileNumber}.png`,
      tileNameRef,
    };
  },
});
</script>

<style scoped>
.scaleable-tile {
  user-select: none;
  display: flex;
  position: relative;
  justify-content: center;
}
.scaleable-tile img {
  z-index: 1;
  width:100%;
  height:auto;
}
.tile-name {
  border: inset 3px darkslategray;
  font-size: 2vh;
  position: absolute;
  z-index: 2;
  width: 99%;
  height: 20%;
  background-color: burlywood;
  text-align: center;
  bottom: 1%;
  display: inline-table;
}
</style>
