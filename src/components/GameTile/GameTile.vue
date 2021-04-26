<template>
  <section v-if="tileNumber > 0" class="scaleable-tile">
    <div class='tile-name' ref="tileNameRef">{{ tileName }}</div>
    <img src="../../assets/tiles/1.png" />
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';

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
    const tileNameRef = ref<any>();
    onMounted(() => {
      // perform auto text scale based on parent node scale
      if (tileNameRef?.value) {
        console.log(parseFloat(tileNameRef.value.parentNode.clientHeight));
        tileNameRef.value.style.fontSize = `${(parseFloat(tileNameRef.value.parentNode.clientWidth) / 130).toString()}em`;
      }
    });
    return {
      tileNameRef,
    };
  },
});
</script>

<style scoped>
.scaleable-tile {
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
