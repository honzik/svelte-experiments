<script>
  import { onMount, afterUpdate } from "svelte";
  import Repo from "./Repo.svelte";
  import Filter from "./Filter.svelte";

  import loadingStore from "./loadingStore";
  import repoStore from "./repoStore";  
  import favStore from "./favStore";
  import filterStore from "./filterStore";

  const filters = [
    { key: "fav", title: "Favourites only" },
  ];

  let load_result = {};
  let repos = [];

  afterUpdate(() => {
    if (load_result && load_result.should_scroll) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      loadingStore.clear_scroll();
    }
  });

  loadingStore.subscribe((value) => {
    load_result = value;
  });

  repoStore.subscribe((value) => {    
    repos = value;
  });

  const reset_action = () => {
    filterStore.remove_filters();
    loadingStore.reset();    
  }


  onMount(loadingStore.load_more);
</script>

<main>
  <h1>Trending Repos in GitHub</h1>
  <h2>Last week statistics</h2>
  <div class="links">
    <a href="#reload" on:click|preventDefault={reset_action}
      >start from scratch</a
    >
    {#each filters as filter (filter.key)}
      <Filter {...filter} />
    {/each}
  </div>
  <div class="repos">
    {#each repos as repo (repo.id)}
      <Repo {...repo} />
    {/each}
  </div>
  <p>
    {#if load_result.loading}
      <span>loading...</span>
    {:else if load_result.error}
      <span class="error">{load_result.error}</span>
    {:else if load_result.repos.length === 0}
      <span>no more results...</span>
    {:else}
      <a href="#loadmore" on:click|preventDefault={loadingStore.load_more}
        >load more</a
      >
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
  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: 400px;
    margin: 0 auto;
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
