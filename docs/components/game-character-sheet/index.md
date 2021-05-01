# CharacterSheet

The game character sheet allows us to see the characters in play and the cards they carry.

## Sample:

### Active user on Action select state
<GameCharacterSheet :gameState="2" :survivorId="1" :isActive="true" :actionsRemaining="2"
  :survivorType="{ name: 'Survivor', actions: [{ title: 'move', description: 'move', type: 1 }, { title: 'test', description: 'test', type: 2 }] }"
  @action="onAction" @itemSelected="onItemSelected" :itemsOnHand="[ { name: 'Some thing', description: 'a test item.', imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/6.png' } ]" :ref="sRef" />

### Active user on Item select state
<GameCharacterSheet :gameState="3" :survivorId="1" :isActive="true" :actionsRemaining="2"
  :survivorType="{ name: 'Survivor', actions: [{ title: 'move', description: 'move', type: 1 }, { title: 'test', description: 'test', type: 2 }] }"
  @action="onAction" @itemSelected="onItemSelected" :itemsOnHand="[ { name: 'Some thing', description: 'a test item.', imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/2.png' }]" :ref="sRef" />

### Small screen (inactive survivor)
<section style="width:350px">
  <GameCharacterSheet :gameState="2" :survivorId="2" 
    :survivorType="{ name: 'Survivor', actions: [{ title: 'move', description: 'move', type: 1 }, { title: 'test', description: 'test', type: 2 }] }"
    @action="onAction" @itemSelected="onItemSelected" :itemsOnHand="[{ name: 'Some thing', description: 'a test item.', imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/5.png' }]" />
</section>

<script setup>
  import { defineComponent, ref } from 'vue';
  import GameCharacterSheet from '../../../src/components/GameCharacterSheet/GameCharacterSheet.vue'

  function onAction(id, actionCode) {
    console.log(`survivor #${id} performed action #${actionCode}`);
  }
  function onItemSelected(id, index, itemType) {
    console.log(`survivor #${id} selected item on index ${index} of type #${itemType}`);
  }
</script>