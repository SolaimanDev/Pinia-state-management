<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
<i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
<i class="material-icons" @click="taskStore.toggleFav(task.id)" :class="{active:task.isFav }">favorite</i>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../Store/TaskStore'
export default {
    name:"Task",
    props:['task'],
    setup()
    {
      const taskStore=useTaskStore()
      return {taskStore}
    }
}
</script>

<style>

</style>