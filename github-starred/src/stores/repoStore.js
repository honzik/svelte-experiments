import { derived } from "svelte/store";
import loadingStore from "./loadingStore";
import favStore from "./favStore";
import filterStore from "./filterStore";

const filtered_repos_with_favs = (repos, favs, filters) => {
  const faved_repos = repos.map((repo) => {
    return { ...repo, fav: favs.includes(repo.id) };
  });
  return faved_repos.filter((repo) => {
    if (filters.fav) {
      return repo.fav;
    }
    return true;
  });
};

const repoStore = derived(
  [loadingStore, favStore, filterStore],
  ([$loadingStore, $favStore, $filterStore]) =>
    filtered_repos_with_favs($loadingStore.repos, $favStore, $filterStore)
);

export default repoStore;
