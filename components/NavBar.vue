<script setup>
import { useAuthStore } from '~/store';

const authStore = useAuthStore();

const loggedIn = computed({
	get() {
		return authStore.$state.loggedIn;
	},
	set(val) {
		return (authStore.$state.loggedIn = val);
	},
});
</script>

<template>
	<nav>
		<h1>Blog<span>API</span></h1>
		<ul v-if="loggedIn">
			<li><nuxt-link to="/" class="link">Home</nuxt-link></li>
			<button class="button" @click="authStore.logOut()">Log Out</button>
		</ul>

		<ul v-else>
			<li><nuxt-link to="/" class="link">Home</nuxt-link></li>
			<li><nuxt-link to="/log-in" class="link">Log in</nuxt-link></li>
			<li><nuxt-link to="/sign-in" class="button">Get started</nuxt-link></li>
		</ul>
	</nav>
</template>

<style scoped>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1% 2%;
}

span {
	color: rgb(23, 111, 184);
}

ul {
	list-style-type: none;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3vh;
}

h1 {
	font-size: 2.6rem;
	font-weight: lighter;
}

ul li {
	font-size: 1.4rem;
}

.link {
	text-decoration: none;
	color: black;
	padding: 5px 10px;
}

.link:hover {
	color: rgb(70, 98, 134);
	text-decoration: underline;
}

.button {
	color: white;
	text-decoration: none;
	padding: 5px 10px;
	background-color: rgb(42, 30, 150);
	border: 0;
	border-radius: 5px;
	transition: 200ms ease-in-out;
	font-size: 1.2rem;
	cursor: pointer;
}

.button:hover {
	background-color: rgb(56, 39, 216);
}
</style>

