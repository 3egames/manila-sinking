# GameTile
The game-tile serves as the smallest unit on the board. 24 tiles will make up the entire play area. Each tile will represent a unique location defined by the game-board component

## Sample:
<div style="width: 50px;">
  <GameTile tileName="50px Tile" :tileNumber="3" />
</div>
<br />
<div style="width: 100px;">
  <GameTile tileName="100px Tile" :tileNumber="3" />
</div>

<br />
<div style="width: 200px;">
  <GameTile tileName="200px Tile" :tileNumber="3" />
</div>

<br />
<div style="width: 300px;">
  <GameTile tileName="300px Tile" :tileNumber="3" />
</div>

## Source Code:
<SourceCode>
<<< @/../src/components/GameTile/GameTile.vue
</SourceCode>

<script setup>
  import GameTile from '../../../src/components/GameTile/GameTile.vue'
</script>