import { writable, get } from "svelte/store";

const stored_favs = localStorage.githubFavs;
const favs_array = Array.isArray(stored_favs)
  ? stored_favs
  : stored_favs
  ? [stored_favs]
  : [];

const favStore = writable(favs_array);

favStore.subscribe((value) => {
  localStorage.githubFavs = value;
});

favStore.apply_fav = (id, state) => {
  const favs = get(favStore);
  if (state) {
    if (!favs.includes(id)) {
      favStore.set([...favs, id]);
    }
  } else {
    if (favs.includes(id)) {
      favStore.set(favs.filter((fav) => fav !== id));
    }
  }
};

export default favStore;
