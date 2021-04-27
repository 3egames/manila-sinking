# Components

The Game's sub-components here are defined for educational purposes. The main game requires only the GameBoard component

## Sample:
<section style="width: 700px">
  <GameGoalTracker :demo="true" />
  <GameBoard :boardSize="700" />
  <GameCharacterSheet :survivorId="1" :demo="true" />
  <GameCharacterSheet :survivorId="2" :demo="true" />
</section>

<script setup>
  import GameGoalTracker from '../../src/components/GameGoalTracker/GameGoalTracker.vue'
  import GameBoard from '../../src/components/GameBoard/GameBoard.vue'
  import GameCharacterSheet from '../../src/components/GameCharacterSheet/GameCharacterSheet.vue'
</script>