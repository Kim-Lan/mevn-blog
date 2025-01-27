import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string,
  username: string,
  email: string,
}

export const useAuthStore = defineStore('auth', () => {
  const user: User = ref(JSON.parse(localStorage.getItem('user')));

  function saveUser() {
    localStorage.setItem('user', JSON.stringify(user.value));
  }

  function setUser(newUser: User): void {
    user.value = newUser;
    saveUser();
  }

  return { user, setUser }
});
