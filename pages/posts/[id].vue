<script setup>
import { useAuthStore } from '~/store';
const authStore = useAuthStore();
const loggedIn = computed({
	get() {
		return authStore.loggedIn;
	},
	set(val) {
		return (authStore.loggedIn = val);
	},
});

const { id } = useRoute().params;
const {
	pending,
	data: blogComment,
	refresh,
} = await useAsyncData(
	'blogComment',
	async () => {
		const [blog, comments] = await Promise.all([
			$fetch(`http://127.0.0.1:8080/api/blogs/${id}`),
			$fetch(`http://127.0.0.1:8080/api/comment/${id}`),
		]);

		return { blog, comments };
	},
	{
		lazy: true,
	}
);

// Fetch blog and comments
const blog = computed(() => blogComment.value?.blog);
const comments = computed(() => blogComment.value?.comments);

const isCommenting = ref(false);
const postComment = () => {
	isCommenting.value = !isCommenting.value;
};

onMounted(() => {
	authStore.checkLogin();
});
</script>

<template>
	<NavBar />

	<div class="main-container">
		<h1 v-if="pending">Loading...</h1>
		<div v-else>
			<div v-if="blog" class="container">
				<div class="wrapper">
					<h1>{{ blog.title }}</h1>
					<h2>By {{ blog.author.username }}</h2>
				</div>

				<p>{{ blog.message }}</p>
			</div>

			<section>
				<h1>Comments</h1>
				<div v-if="loggedIn">
					<CommentBar
						:blogId="id"
						v-if="isCommenting"
						@commentPosted="
							() => {
								postComment();
								refresh();
							}
						"
					/>
					<button v-else @click="postComment()">Post a comment</button>
				</div>
				<h2 v-else>Sign up to post comments!</h2>
				<ul v-if="comments">
					<li v-for="comment in comments">
						<h3>{{ comment.message }}</h3>
						<p>By: {{ comment.author.username }}</p>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<style scoped>
.main-container {
	margin: 5vh 20%;
}

.container {
	display: flex;
	flex-direction: column;
	gap: 5vh;
	border-radius: 5px;
}

.wrapper h1 {
	font-size: 2.3rem;
}

.wrapper h2 {
	font-weight: lighter;
}

section {
	margin-top: 5vh;
}

section h1 {
	font-size: 1.7rem;
}

p {
	font-size: 1.1rem;
}

section button {
	font-size: 1.2rem;
	font-weight: bold;
	background-color: rgb(26, 24, 133);
	padding: 5px 10px;
	border: 0;
	border-radius: 2px;
	cursor: pointer;
	transition: 150ms ease-in-out;
	color: white;
}

section button:hover {
	background-color: rgb(41, 38, 212);
}

ul {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	gap: 10px;
}

ul li {
	padding: 10px;
	display: flex;
	flex-direction: column;
	border: 3px solid rgb(2, 0, 36);
	border-radius: 5px;
}

ul li h3 {
	font-weight: lighter;
	margin-bottom: 10px;
}
</style>

