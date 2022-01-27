import { writable, get } from "svelte/store";

const stored_favs = localStorage.githubFavs;
const favs_array = typeof stored_favs === "string" && stored_favs.length > 0 ? 
  stored_favs.split(",") :
  [];

const favStore = (() => {
  const store = writable(favs_array);
  const { subscribe, set } = store;

  store.subscribe((value) => {
    localStorage.githubFavs = value.join(",");
  });

  const apply_fav = (id: string, state: boolean) => {
    const favs = get(store);    
    if (state) {
      if (!favs.includes(id)) {
        set([...favs, id]);
      }
    } else {
      if (favs.includes(id)) {
        set(favs.filter((fav) => fav !== id));
      }
    }
  };

  return {
    subscribe,
    apply_fav,
  };
})();

export default favStore;
