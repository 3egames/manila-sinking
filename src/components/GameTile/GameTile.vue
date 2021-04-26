<template>
  <section v-if="tileNumber > 0" class="scaleable-tile" @mousedown="flood"
    oncontextmenu="return false">
    <img class="bg-image" :src="imgSrc" ref="imgRef" />
    <img v-if="data.sunkLevel === 2" class="skull"
     src="https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/tiles/skull.png" />
    <div class='tile-name' ref="tileNameRef">{{ tileName }}</div>
  </section>
</template>

<script lang='ts'>
import {
  defineComponent, onMounted, reactive, ref,
} from 'vue';

export default defineComponent({
  props: {
    tileName: { type: String, required: true },
    tileNumber: { type: Number, required: true },
    tileSize: { type: Number, required: true },
  },
  setup(props) {
    const GITHUB_ASSETS_URL = 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/';
    const tileNameRef = ref<any>();
    const imgRef = ref<any>();
    const data = reactive({
      sunkLevel: 0,
    });

    const flood = (e: MouseEvent) => {
      if (e.button === 0) {
        data.sunkLevel += 1;
        if (data.sunkLevel > 2) data.sunkLevel = 0;
      } else if (e.button === 2 && data.sunkLevel > 0) {
        data.sunkLevel -= 1;
      }
      if (data.sunkLevel === 1) {
        imgRef.value.style.opacity = '0.5';
      } else if (data.sunkLevel === 2) {
        imgRef.value.style.opacity = '0.1';
      } else {
        imgRef.value.style.opacity = '1.0';
      }
    };

    onMounted(() => {
      if (tileNameRef.value) {
        tileNameRef.value.style.fontSize = `${props.tileSize / 120}em`;
      }
    });
    return {
      data,
      flood,
      imgSrc: `${GITHUB_ASSETS_URL}tiles/${props.tileNumber}.png`,
      imgRef,
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
  background-color: firebrick;
}
.scaleable-tile .bg-image {
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
.skull {
  position: absolute;
  top: 10%;
  width: 50%;
  height: auto;
}
</style>
