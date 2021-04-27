# CharacterSheet

The game character sheet allows us to see the characters in play and the cards they carry.

## Sample:
<GameCharacterSheet :survivorId="1" :demo="true" @action="onAction" @itemSelected="onItemSelected"
  :ref="sRef" />

#### Small screen
<section style="width:350px">
  <GameCharacterSheet :survivorId="2" :demo="true" @action="onAction" @itemSelected="onItemSelected" />
</section>


<!-- ## Source Code:
<SourceCode>
<<< @/../src/components/GameCharacterSheet/GameCharacterSheet.vue
</SourceCode> -->

<script setup>
  import { ref } from 'vue';
  import GameCharacterSheet from '../../../src/components/GameCharacterSheet/GameCharacterSheet.vue'

  function onAction(id, actionCode) {
    console.log(`survivor #${id} performed action #${actionCode}`);
  }
  function onItemSelected(id, index, itemType) {
    console.log(`survivor #${id} selected item on index ${index} of type #${itemType}`);
  }
</script>