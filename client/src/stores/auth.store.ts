import { defineStore } from 'pinia'
import { ref } from 'vue'

const BASE_API_URL = 'http://localhost:3001';

export interface User {
  id: string,
  username: string,
  email: string,
}

export const useAuthStore = defineStore('auth', () => {
  const user: User = ref(null);
  const accessToken: string = ref('');

  function setUser(newUser: User): void {
    user.value = newUser;
  }

  async function login(email, password) {
    try {
      const response = await fetch(`${BASE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      });
      if (response && response.ok) {
        const data = await response.json();
        this.user = data;
        return data;
      }
    } catch (error: Error | any) {
      throw error.message;
    }
  }

  return { user, accessToken, setUser, login }
});
