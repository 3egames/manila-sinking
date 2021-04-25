# GameTile
The game-tile serves as the smallest unit on the board. 24 tiles will make up the entire play area. Each tile will represent a unique location defined by the game-board component

## Sample:
<div style="min-height: 100px; height 100px">
  <GameTile tileName="Some Tile" :tileNumber="3" />
</div>

## Source Code:
<SourceCode>
<<< @/../src/components/GameTile/GameTile.vue
</SourceCode>

<script setup>
  import GameTile from '../../../src/components/GameTile/GameTile.vue'
</script>