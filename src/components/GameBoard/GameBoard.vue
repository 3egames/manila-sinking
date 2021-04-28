<template>
  <section class="game-board">
    <div class="row" v-for="(key, y) in 6" :key="key" :ref="setRowElement">
      <span class="game-tile" v-for="(key, x) in 6" :key="key">
        <game-tile :tileName="TileTypes[getTileValue(x, y)]"
        :tileNumber="getTileValue(x, y)" :tileSize="boardSize/6" :ref="setTileRefs"/>
      </span>
    </div>
  </section>
</template>

<script lang='ts'>
import {
  defineComponent, onBeforeMount, onBeforeUpdate, onMounted, reactive,
} from 'vue';
import GameTile from '../GameTile/GameTile.vue';

enum TileTypes {
  tondo = 1, santacruz = 2, binondo = 3, sannicolas = 4,
  sampaloc = 5, quiapo = 6, sanmiguel = 7, stamesa = 8,
  portarea = 9, intramuros = 10, ermita = 11, malate = 12,
  paco = 13, pandacan = 14, staana = 15, sanandres = 16,
  divisoria = 17, chinatown = 18, universitybelt = 19, malacanang = 20,
  cityhall = 21, nationalmuseum = 22, rizalmemorial = 23, philippinenavy = 24
}

interface Data {
  tiles: (number | null)[][];
}

export default defineComponent({
  name: 'game-board',
  components: { GameTile },
  props: {
    boardSize: { type: Number, required: true },
  },
  setup(props) {
    let tileRefs: any[] = [];
    let rowRef: any[] = [];
    const data = reactive<Data>({
      tiles: [],
    });

    onBeforeUpdate(() => {
      rowRef = [];
      tileRefs = []; // reset every update
    });

    const setTileRefs = (el: any) => {
      if (el) { tileRefs.push(el); }
    };

    const setRowElement = (el: any) => {
      if (el) { rowRef.push(el); }
    };

    const resetBoard = () => {
      const usedTiles: boolean[] = [];
      let unassignedCards = 24;
      data.tiles = [];
      for (let i = 0; i <= 6; i += 1) {
        for (let j = 0; j <= 6; j += 1) {
          if (!data.tiles[i]) data.tiles[i] = [];
          data.tiles[i][j] = -1;
        }
      }
      let nextY = 0;
      let nextX = 2;
      while (unassignedCards > 0) {
        const currentTile = Math.floor(Math.random() * 24) + 1;
        if (!usedTiles[currentTile]) {
          data.tiles[nextY][nextX] = currentTile;
          nextX += 1;
          // move tile cursor
          if (nextY === 0 && nextX > 3) { nextY = 1; nextX = 1; }
          if (nextY === 1 && nextX > 4) { nextY = 2; nextX = 0; }
          if (nextY === 2 && nextX > 5) { nextY = 3; nextX = 0; }
          if (nextY === 3 && nextX > 5) { nextY = 4; nextX = 1; }
          if (nextY === 4 && nextX > 4) { nextY = 5; nextX = 2; }
          usedTiles[currentTile] = true;
          unassignedCards -= 1;
        }
      }
    };

    // we need this due to weird behavior in vue saying data.tiles[x] is undefined
    const getTileValue = (x: number, y: number) => {
      if (data.tiles[x]) {
        return data.tiles[x][y];
      }
      return 0;
    };

    onBeforeMount(() => {
      resetBoard();
    });

    onMounted(() => {
      const sideSize = `${props.boardSize / 6}px`;
      rowRef.forEach((row) => {
        // eslint-disable-next-line no-param-reassign
        row.style.width = `${props.boardSize}px`;
      });

      tileRefs.forEach((tile) => {
        // eslint-disable-next-line no-param-reassign
        if (tile.$el.parentNode) tile.$el.parentNode.style.width = sideSize;
        // eslint-disable-next-line no-param-reassign
        if (tile.$el.parentNode) tile.$el.parentNode.style.height = sideSize;
      });
    });

    return {
      setTileRefs,
      setRowElement,
      data,
      getTileValue,
      resetBoard,
      TileTypes,
    };
  },
});
</script>

<style scoped>
.game-board .row{
  display: flex;
}
.game-tile {
  display: inline-flex;
  border: 1px solid black;
  background-color: rgb(3, 82, 82);
  background-image: url("https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/animated-water.gif");
}
</style>
