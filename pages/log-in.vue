<script setup>
import { useAuthStore } from '~/store';

const authStore = useAuthStore();

const user = {
	username: '',
	password: '',
};

const errors = ref([]);

const logIn = async () => {
	await $fetch('http://127.0.0.1:8080/api/log-in', {
		method: 'POST',
		body: {
			username: user.username,
			password: user.password,
		},
	})
		.then((result) => {
			authStore.logIn(result);
			navigateTo('/');
		})
		.catch((err) => {
			errors.value = [];
			const errMsg = err.response._data.message;
			errors.value.push(errMsg);
		});
};
</script>

<template>
	<NavBar />

	<div class="main-container">
		<div>
			<h1>Log In</h1>
			<form action="http://localhost:3000" method="POST" v-on:submit.prevent>
				<div class="wrapper">
					<label for="username">Username</label>
					<input
						type="text"
						id="username"
						placeholder="Username"
						required
						v-model="user.username"
					/>
				</div>

				<div class="wrapper">
					<label for="password">Password</label>
					<input
						type="text"
						id="password"
						placeholder="Password"
						required
						v-model="user.password"
					/>
				</div>

				<button type="submit" @click="logIn()">Log In</button>
			</form>
		</div>

		<ul v-if="errors">
			<li v-for="error in errors">{{ error }}</li>
		</ul>
	</div>
</template>

<style scoped>
.main-container {
	padding: 0 30%;
}

h1 {
	padding-top: 10px;
	font-size: 2.5rem;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 20px;
	margin-top: 20px;
}

.wrapper {
	font-size: 1.3rem;
	display: flex;
	flex-direction: column;
}

.wrapper input {
	font-size: 1.1rem;
	color: black;
}

form button {
	width: 10%;
	padding: 5px 10px;
	font-weight: bold;
	font-size: 1.2rem;
	background-color: rgb(63, 63, 161);
	border: 0;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	transition: 150ms ease-in-out;
}

form button:hover {
	background-color: rgb(60, 84, 223);
}

ul {
	margin-top: 15px;
}
</style>

