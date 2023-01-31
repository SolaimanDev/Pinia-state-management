import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTaskStore = defineStore("TaskStore", {
  state: () => ({
    tasks: [],
    name: "Solaiman Ahmed",
    isLoading:false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },

    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks(){
      this.isLoading=true
    const res=await fetch('http://localhost:3000/tasks')
    const data=await res.json()
  
    this.tasks=data;
    this.isLoading=false
    },
   async addTask(task) {
      this.tasks.push(task);
      const res=await fetch('http://localhost:3000/tasks',{
        method:"POST",
        boady:JSON.stringify(task),
        headers:{ 'Content-type':'application/json'}
      });
      if (res.error) {
        console.log(res.error);
      }

    },
  async  deleteTask(id)
    {
      this.tasks=this.tasks.filter(t=>{
        return t.id !=id
      })
      const res=await fetch('http://localhost:3000/tasks/'+id,{
        method:"DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },
   async toggleFav(id)
    {
     const task= this.tasks.find(t=> t.id===id)
     task.isFav=!task.isFav
     const res=await fetch('http://localhost:3000/tasks/'+id,{
      method:"PATCH",
      boady:JSON.stringify({isFav:task.isFav}),
      headers:{ 'Content-type':'application/json'}
    });
    if (res.error) {
      console.log(res.error);
    }
    }
  },
});
