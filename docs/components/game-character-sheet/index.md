# CharacterSheet

The game character sheet allows us to see the characters in play and the cards they carry.

## Sample:
<GameCharacterSheet :survivorId="1" @action="onAction" @itemSelected="onItemSelected"
  :isActive="true" actionsRemaining="2" :itemsOnHand="[ 1, 2, 3, 4]" :ref="sRef" />

#### Small screen (inactive survivor)
<section style="width:350px">
  <GameCharacterSheet :survivorId="2" @action="onAction" @itemSelected="onItemSelected" 
  :itemsOnHand="[4, 4]" />
</section>

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