<script setup>
import { useAuthStore } from '~/store';

const authStore = useAuthStore();
const authToken = localStorage.getItem('token') || null;
const authUser = JSON.parse(localStorage.getItem('user')) || null;

const emit = defineEmits(['commentPosted', 'done']);
const props = defineProps({
	blogId: String,
});
const blogRef = toRef(props, 'blogId');

const post = {
	message: '',
	blogid: blogRef.value,
};

const postComment = async () => {
	await $fetch('http://127.0.0.1:8080/api/comment', {
		method: 'POST',
		headers: {
			Authorization: authStore.$state.loggedIn ? `Bearer ${authToken}` : '',
		},
		body: {
			blogid: post.blogid,
			message: post.message,
			user: authUser,
		},
	}).then(() => {
		emit('commentPosted');
	});
};
</script>

<template>
	<form method="POST" v-on:submit.prevent>
		<div class="inner-wrapper">
			<label for="comment">Post a comment</label>
			<textarea
				name="comment"
				id="comment"
				placeholder="What an AMAZING blog..."
				v-model="post.message"
				required
			></textarea>
		</div>
		<button type="submit" @click="postComment()">Post</button>
	</form>
</template>

<style scoped>
.inner-wrapper {
	display: flex;
	flex-direction: column;
}

.inner-wrapper label {
	font-size: 1.2rem;
}

form textarea {
	margin-bottom: 10px;
	resize: vertical;
}

form button {
	font-size: 1.2rem;
	padding: 3px 15px;
	color: white;
	background-color: rgb(26, 24, 133);
	border: 0;
	border-radius: 5px;
	cursor: pointer;
	transition: 150ms ease-in-out;
}

section button:hover {
	background-color: rgb(41, 38, 212);
}
</style>

