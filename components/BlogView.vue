<script setup>
const { pending, data: blogsData } = await useFetch('https://blog-api-gamma-silk.vercel.app/api/blogs', {
	lazy: true,
});
</script>

<template>
	<div class="main-container">
		<h1>Recent Blogs</h1>
		<div class="wrapper">
			<h2 v-if="pending">Loading ...</h2>
			<ul v-else v-for="blog in blogsData">
				<li>
					<div class="blog-wrapper">
						<h1>{{ blog.title }}</h1>
						<h3>{{ blog.message.slice(0, 150) }}...</h3>
						<nuxt-link
							:to="{ name: 'posts-id', params: { id: blog._id } }"
							class="link"
							>Read More</nuxt-link
						>
					</div>

					<h3>By: {{ blog.author.username }}</h3>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.main-container {
	margin: 2vh 25% 0 25%;
	height: 60vh;
}

.wrapper {
	margin-top: 5vh;
}

ul {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
}

.blog-wrapper {
	text-align: start;
	margin-bottom: 20px;
}

.blog-wrapper h3 {
	margin-bottom: 10px;
	font-weight: lighter;
}

ul li {
	padding: 10px;
	display: flex;
	flex-direction: column;
	text-align: end;
	border: 3px solid rgb(2, 0, 36);
	border-radius: 5px;
	margin-bottom: 15px;
}
</style>

