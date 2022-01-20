<script type="ts">
  import favStore from "../stores/favStore";

  export let name = "Some repository name";
  export let url = "https://github.com/honzik/svelte-experiments";
  export let id = "111";
  export let description =
    "Some repo description. Some repo description. Some repo description. Some repo description. ";
  export let stars = 154;
  export let fav = false;

  const change_fav = (state:boolean) => {
    favStore.apply_fav(id, state);
  };
</script>

<div class="repo">
  <h3><code>{name}</code></h3>
  <div class="props" data-key={id}>
    <span class="link"><a href={url}>GitHub link</a></span>
    <span class="stars">{stars}</span>
    <span class="fav">
      {#if fav}
        <a href="#unfav" on:click|preventDefault={() => change_fav(false)}
          >UnFav</a
        >
      {:else}
        <a href="#fav" on:click|preventDefault={() => change_fav(true)}>Fav</a>
      {/if}
    </span>
  </div>
  <div class="desc">
    {description ?? "---"}
  </div>
</div>

<style>
  .repo {
    width: 30%;
    margin: 1em 0;
    background: #f0f0f0;
    border-radius: 5px;
    padding: 0.5em;
  }
  h3 {
    margin: 0.5em 0 1.5em 0;
  }
  .props {
    padding: 0 2em;
    display: flex;
    justify-content: space-between;
  }
  .props .stars:before {
    content: "★ ";
  }
  .desc {
    padding: 1em 3em;
    font-size: 0.8rem;
    color: gray;
  }
</style>
