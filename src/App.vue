<template>
<main>
  <!-- Header -->
  <header>
    <img src="./assets/pinia-logo.svg" alt="" srcset="">
  <h1>{{ taskStore.name }}</h1>
  </header>
  <!-- Add New Task Form-->
  <div class="new-task-form">
<TaskForm/>
  </div>
  <nav class="filter">
    <button @click="filter='all'">All Task</button>
    <button @click="filter='favs'">Favs Task</button>
  </nav>
  <!-- Loading -->
  <div class="loading" v-if="isLoading">Loading task ....</div>
  <!-- Task List -->
  <div class="task-list" v-if="filter==='all'">
    <p>Your have {{ totalCount }} tasks left to do</p>
    <div v-for="(task,index) in tasks" :key="index">
      <TaskDetails :task="task" />
    </div>
  </div>

  <div class="task-list" v-if="filter==='favs'">
    <p>Your have {{ favCount }} favs left to do</p>
    <div v-for="(task,index) in favs" :key="index">
      <TaskDetails :task="task" />
    </div>
  </div>
  <button @click="taskStore.$reset"> Reset</button>
</main>
</template>

<script>
import { ref } from 'vue-demi';
import TaskDetails from './Components/TaskDetails.vue'
import TaskForm from './Components/TaskForm.vue'

import { useTaskStore } from './Store/TaskStore';
import { storeToRefs } from 'pinia';
export default {
  components:{TaskDetails,TaskForm},
setup(){
const taskStore=useTaskStore()
const filter=ref('all')
taskStore.getTasks()
const {tasks,isLoading,favs,totalCount,favCount}=storeToRefs(taskStore)
return {taskStore,filter,tasks,isLoading,favs,totalCount,favCount}
}
}
</script>

<style>

</style>