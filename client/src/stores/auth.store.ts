import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string,
  username: string,
  email: string,
}

export const useAuthStore = defineStore('auth', () => {
  const user: User = ref(null);

  function setUser(newUser: User): void {
    user.value = newUser;
  }

  return { user, setUser }
});
