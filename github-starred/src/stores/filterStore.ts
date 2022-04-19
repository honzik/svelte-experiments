import { writable } from "svelte/store";

export type TFilters = { [key: string]: boolean };

const default_filters: TFilters = {
  fav: false,
};

const filterStore = (() => {
  const store = writable(default_filters);
  const { subscribe } = store;

  const toggle_filter = (filter_name: string) => {
    store.update((filters) => {
      const filter_updated = { [filter_name]: !filters[filter_name] };
      return { ...filters, ...filter_updated };
    });
  };

  const remove_filters = () => {
    store.set(default_filters);
  };

  return {
    subscribe,
    toggle_filter,
    remove_filters,
  };
})();

export default filterStore;
