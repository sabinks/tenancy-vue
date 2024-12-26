import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const state = ref({
    access_token: "",
    isAuthenticated: false,
    user: {},
    roles: [],
    permission: [],
  });
  const computedState = computed(() => state.value);
  function setAuth(payload: any) {
    state.value = payload;
  }
  function clearAuth() {
    state.value = {
      access_token: "",
      isAuthenticated: false,
      user: {},
      roles: [],
      permission: [],
    };
  }

  return { state, computedState, setAuth, clearAuth };
});
