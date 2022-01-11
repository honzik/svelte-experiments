<script>
	import { onMount } from "svelte";
	import Repo from './Repo.svelte';
	import { createRepo } from './utils';
	
	let repos = [];
	let loading = false;
	
	const updateRepos = async () => {
		loading = true;
		const res = await fetch(`https://api.github.com/search/repositories?q=created:>2022-01-04&sort=stars&order=desc`);
		const result_object = await res.json();
		repos = result_object.items.map( item => createRepo(item));		
		loading = false;
	};

	onMount(updateRepos);
</script>

<main>
	<h1>Trending Repos in GitHub</h1>
	<h2>Last week statistics</h2>	
	{#if loading}
		<div class="loading">loading...</div>
	{:else}
		<div class="repos">
			{#each repos as repo (repo.id)} 		
				<Repo {...repo} />
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.repos {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

</style>