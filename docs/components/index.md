# Components

The Game's sub-components here are defined for educational purposes. The main game requires only the GameBoard component

## Sample:
<section style="width: 700px">
  <GameGoalTracker />
  <GameBoard :boardSize="700" />
</section>

<script setup>
  import GameGoalTracker from '../../src/components/GameGoalTracker/GameGoalTracker.vue'
  import GameBoard from '../../src/components/GameBoard/GameBoard.vue'
</script>