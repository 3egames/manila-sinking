# GameTile
The game-tile serves as the smallest unit on the board. 24 tiles will make up the entire play area. Each tile will represent a unique location defined by the game-board component
* The component will be sized based on the parent container hosting it, however, you will need to provide the tileSize (basically the same for width and height value as its a square).
If for example the containing parent will be 100px, provide 100 for the tileSize.
* You can left click on the tile to make it sink. the first click sends it to a warning level, then another will switch it to a dead zone. clicking again restarts the tile
* You can right click the tile as well to make it rise

## Sample:
<div style="width: 50px;">
  <GameTile tileName="50px Tile" :tileSize="50" :tileNumber="3" />
</div>
<br />
<div style="width: 100px;">
  <GameTile tileName="100px Tile" :tileSize="100" :tileNumber="3" />
</div>

<br />
<div style="width: 200px;">
  <GameTile tileName="200px Tile" :tileSize="200" :tileNumber="3" />
</div>

<br />
<div style="width: 300px;">
  <GameTile tileName="300px Tile" :tileSize="300" :tileNumber="3" />
</div>

## Source Code:
<SourceCode>
<<< @/../src/components/GameTile/GameTile.vue
</SourceCode>

<script setup>
  import GameTile from '../../../src/components/GameTile/GameTile.vue'
</script>