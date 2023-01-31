<template>
  <div class="task-form">
    <form @submit.prevent="handleSubmit">
<input type="text" placeholder="I need to ..." v-model="newTask">
<button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue-demi';
import { useTaskStore } from '../Store/TaskStore';
export default {
setup()
{
    const taskStore=useTaskStore()
    const newTask=ref('')
    const handleSubmit=()=>{
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title:newTask.value,
          isFav:false,
          id:Math.floor(Math.random()*10000)
        })
      }
      newTask.value=''
    }

    return {handleSubmit,newTask}

}
}
</script>

<style>

</style>