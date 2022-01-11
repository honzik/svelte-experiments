<script>
  import { onMount } from "svelte";
  import Repo from "./Repo.svelte";
  import { createRepo, getLastWeekDate } from "./utils";

  let repos = [];
  let newBatch = [];
  let loading = false;
  let error = null;
  let page = 1;

  const clearRepos = async () => {
    repos = [];
    newBatch = [];
    page = 1;
    await moreRepos();
  };

  const moreRepos = async () => {
    loading = true;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>=${getLastWeekDate()}&sort=stars&order=desc&per_page=9&page=${page}`
    );
    if (!response.ok) {
      const errObj = await response.json();
      error = `Error occured while loading: ${response.status} - ${errObj.message}`;
    } else {
      const result_object = await response.json();
      newBatch = result_object.items.map((item) => createRepo(item));
      page += 1;
      error = null;
    }
    loading = false;
  };

  $: repos = [...repos, ...newBatch];

  onMount(moreRepos);
</script>

<main>
  <h1>Trending Repos in GitHub</h1>
  <h2>Last week statistics</h2>
  <p>
    <a href="#reload" on:click|preventDefault={clearRepos}>start from scratch</a
    >
  </p>
  {#if loading}
    <div class="loading">loading...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else}
    <div class="repos">
      {#each repos as repo (repo.id)}
        <Repo {...repo} />
      {/each}
    </div>
    <p><a href="#loadmore" on:click|preventDefault={moreRepos}>load more</a></p>
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
  .error {
    color: red;
  }
  .repos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
