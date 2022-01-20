import { writable, get } from "svelte/store";

const default_filters = {
  fav: false,
};

const filterStore = writable(default_filters);

filterStore.toggle_filter = (filter_name) => {
  filterStore.update((filters) => {
    const filter_updated = { [filter_name]: !filters[filter_name] };
    return { ...filters, ...filter_updated };
  });
};

filterStore.remove_filters = () => {
  filterStore.set(default_filters);
};

export default filterStore;
