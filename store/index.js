import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		loggedIn: false,
	}),

	actions: {
		logIn(response) {
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			this.loggedIn = true;
			console.log('Logged In');
		},

		logOut() {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			this.loggedIn = false;
			console.log('Logged Out');
		},

		checkLogin() {
			if (typeof window !== 'undefined') {
				const token = localStorage.getItem('token');
				const user = localStorage.getItem('user');
				if (token && user) {
					this.loggedIn = true;
					console.log(this.loggedIn);
				}
			}
		},
	},
});

