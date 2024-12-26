<script setup>
import { onMounted, ref } from 'vue'

const state = ref({
    name: 'John Doe',
    status: 'active',
    tasks: ['Task One', 'Task Two', 'Task Three'],
    link: "https://sabinks.com.np"
})
const newTask = ref('')
const taskList = ref([])
const toggleStatus = (status) => {
    state.value = { ...state.value, status }
}
const addTask = () => {
    taskList.value.push(newTask.value)
    newTask.value = ''
}
const deleteTask = (id) => {
    taskList.value = taskList.value.filter(task => task.id != id)
}
const updateTask = (id) => {
    taskList.value = taskList.value.map(task => {
        if (task.id == id) {
            return { ...task, completed: !task.completed }
        }
        return task;
    })
}
onMounted(async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json()
        taskList.value = data
    } catch (error) {
        console.log(error);

    }   
})

</script>

<template>

    <main>
        <!-- <HeroSection /> -->
        <!-- <h1>{{ state.name }}</h1>
        <p v-if="state.status === 'active'">User is active</p>
        <p v-else-if="state.status === 'inactive'">User is inactive</p>
        <p v-else>User is pending</p>
        <form @submit.prevent="addTask">
            <label for="newTask">Add Task</label>
            <input type="text" v-model="newTask" name="newTask" id="newTask">

            <button type="submit">Submit</button>
        </form>
        <h3>Tasks</h3>
        <ul>
            <li class="flex space-x-2" v-for="(task, index) in taskList" :key="task.id">
                <span class="">{{ task.title }}</span>
                <input type="checkbox" :checked="task.completed" @click="updateTask(task.id)" />
                <button @click="deleteTask(task.id)">x</button>
            </li>
        </ul> -->

        <!-- attribute binding -->
        <!-- <a :href="state.link">Porfolio</a>

        <div class="">
            <button v-on:click="toggleStatus('active')">Status Active</button>
            <button v-on:click="toggleStatus('inactive')">Status Inactive</button>
            <button v-on:click="toggleStatus('pending')">Status Pending</button>
        </div> -->
    </main>
</template>
