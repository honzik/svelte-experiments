import { derived } from "svelte/store";
import loadingStore from "./loadingStore";
import favStore from "./favStore";

const repos_with_favs = (repos, favs) => {
  return repos.map((repo) => {
    return { ...repo, fav: favs.includes(repo.id) };
  });
};

const repoStore = derived(
  [loadingStore, favStore],
  ([$loadingStore, $favStore]) =>
    repos_with_favs($loadingStore.repos, $favStore)
);

export default repoStore;
