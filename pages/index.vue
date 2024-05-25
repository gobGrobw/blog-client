<script setup>
import { useAuthStore } from '~/store';

const authStore = useAuthStore();

onMounted(() => {
	authStore.checkLogin();
});
</script>

<template>
	<NavBar />

	<!-- Greeter or something -->
	<main>
		<h1>Sharing thoughts!</h1>
		<h2>Start now by making an account!</h2>
		<nuxt-link to="/sign-in" class="sign-in-greet">Make an account</nuxt-link>
	</main>

	<BlogView />
</template>

<style scoped>
/* Greeter style */
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 70vh;
	background: rgb(2, 0, 36);
	background: linear-gradient(14deg, rgba(2, 0, 36, 1) 11%, rgba(9, 86, 121, 1) 100%);
	color: white;
}

main h1 {
	font-size: 4rem;
}
main h1,
main h2 {
	text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.sign-in-greet {
	color: white;
	text-decoration: none;
	padding: 5px 10px;
	background-color: rgb(42, 30, 150);
	border-radius: 5px;
	transition: 200ms ease-in-out;
	margin-top: 5vh;
	font-size: 1.4rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.sign-in-greet:hover {
	background-color: rgb(56, 39, 216);
}
</style>

