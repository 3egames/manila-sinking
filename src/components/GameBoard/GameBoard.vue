<template>
  <section>
    <div v-for="y in 6" :key="y">
      <span :class="{ 'game-tile': true, 'sunk': data.tiles[y][x] === -1 }" v-for="x in 6" :key="x">
        <game-tile :tileName="TileTypes[data.tiles[y][x]]" :tileNumber="data.tiles[y][x]" />
      </span>
    </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive } from 'vue';
import GameTile from '../GameTile/GameTile.vue';

enum TileTypes {
  tondo = 1, santacruz = 2, binondo = 3, sannicolas = 4,
  sampaloc = 5, quiapo = 6, sanmiguel = 7, stamesa = 8,
  portarea = 9, intramuros = 10, ermita = 11, malate = 12,
  paco = 13, pandacan = 14, staana = 15, sanandres = 16,
  divisoria = 17, chinatown = 18, universitybelt = 19, malacanang = 20,
  manilaport = 21, nationalmuseum = 22, rizalmemorial = 23, philippinenavy = 24
}

interface Data {
  tiles: (number | null)[][];
}

export default defineComponent({
  name: 'game-board',
  components: { GameTile },
  setup() {
    const data = reactive<Data>({
      tiles: [],
    });

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
          data.tiles[nextY + 1][nextX + 1] = currentTile;
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

    onBeforeMount(() => {
      resetBoard();
    });

    return {
      data,
      resetBoard,
      TileTypes,
    };
  },
});
</script>

<style scoped>
.game-tile {
  user-select: none;
  display: inline-flex;
  min-width: 100px;
  min-height: 100px;
  border: 1px solid black;
  margin: 2px;
}

.sunk {
  background-color: rgb(3, 82, 82);
}
</style>
