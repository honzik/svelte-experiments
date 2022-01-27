<svelte:options immutable />

<script lang="ts">
  import filterStore from "../stores/filterStore";

  export let key = "someKey";
  export let title = "Filter Title";

  const toggle_filter = (filter_key: string) => {
    filterStore.toggle_filter(filter_key);
  };
</script>

<a
  class="filter"
  class:selected={$filterStore[key]}
  href={`#filter_${key}`}
  on:click|preventDefault={() => toggle_filter(key)}
>
  {title}
</a>

<style>
  a.filter {
    text-decoration: none;
  }
  a.filter.selected {
    color: black;
    font-weight: bold;
    text-decoration: underline;
  }
</style>
