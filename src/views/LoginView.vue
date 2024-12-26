<script setup>
import { reactive, ref, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query'
// import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import { apiClient } from '../api';
import { useAuthStore } from '../store';
import { storeToRefs } from 'pinia';
// const store = useStore()
const store = useAuthStore()
const router = useRouter()
const { state } = storeToRefs(store)
const { setAuth } = store

const route = useRoute()
const form = reactive({
    email: '',
    password: '',
    rememberMe: false
})

const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: async (data) => await apiClient.post('/login', data),
    onSuccess: (res) => {
        const { access_token, user, roles, permissions } = res.data
        const payload = { access_token, user, roles, permissions, isAuthenticated: true }

        setAuth(payload)
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('access_token', access_token)
        router.push({ path: '/dashboard' })
    }
})
const submit = () => {
    mutate(form)
}

</script>
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" v-model="form.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" v-model="form.password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex h-6 shrink-0 items-center">
                        <div class="group grid size-4 grid-cols-1">
                            <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
                                v-model="form.rememberMe"
                                class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14" fill="none">
                                <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="text-sm/6">
                        <label for="comments" class="font-medium text-gray-900">Remember Me</label>
                    </div>
                </div>

                <div>
                    <button type="submit" @click.prevent="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Login</button>
                </div>
            </form>
        </div>
    </div>
</template>