import { writable, get } from "svelte/store";

const stored_favs = localStorage.githubFavs;
const favs_array = Array.isArray(stored_favs)
  ? stored_favs
  : stored_favs
  ? [stored_favs]
  : [];

const favStore = (() => {
  const store = writable(favs_array);
  const { subscribe, set } = store;

  store.subscribe((value) => {
    localStorage.githubFavs = value;
  });

  const apply_fav = (id, state) => {
    const favs = get(store);
    if (state) {
      if (!favs.includes(id)) {
        store.set([...favs, id]);
      }
    } else {
      if (favs.includes(id)) {
        store.set(favs.filter((fav) => fav !== id));
      }
    }
  };

  return {
    subscribe,
    apply_fav,
  };
})();

export default favStore;
