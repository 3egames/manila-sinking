# GoalTracker

The goal tracker monitors the progression of the game. In this case, it is a doom tracker that the players must avoid from completing in order to win.

## Sample:
<GameGoalTracker :depthLevel="3" :depthMax="5" :goalsAchieved="[2, 3, 4]" />

### Small screen
<section style="width: 300px">
  <GameGoalTracker :depthLevel="5" :depthMax="9" :goalsAchieved="[1, 2]" />
</section>

<script setup>
  import GameGoalTracker from '../../../src/components/GameGoalTracker/GameGoalTracker.vue'
</script>