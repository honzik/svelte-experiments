<script>
  import { onMount, afterUpdate } from "svelte";
  import Repo from "./Repo.svelte";
  import { createRepo, getLastWeekDate } from "./utils";

  let repos = [];
  let new_batch = [];
  let loading = false;
  let error = null;
  let page = 1;
  let should_scroll = false;

  afterUpdate(() => {    
    should_scroll && window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  });

  const clearRepos = async () => {
    repos = [];
    new_batch = [];
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
      new_batch = result_object.items.map((item) => createRepo(item));
      page += 1;
      should_scroll = true;
      error = null;
    }
    loading = false;    
  };

  $: repos = [...repos, ...new_batch];

  onMount(moreRepos);
</script>

<main>
  <h1>Trending Repos in GitHub</h1>
  <h2>Last week statistics</h2>
  <p>
    <a href="#reload" on:click|preventDefault={clearRepos}>start from scratch</a
    >
  </p>  
  <div class="repos">
    {#each repos as repo (repo.id)}
      <Repo {...repo} />
    {/each}
  </div>
  <p>
    {#if loading}
      <span>loading...</span>
    {:else if error}
      <span class="error">{error}</span>
    {:else if repos.length === 0}
      <span>no more results...</span>
    {:else}
      <a href="#loadmore" on:click|preventDefault={moreRepos}>load more</a>
    {/if}
  </p>
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
