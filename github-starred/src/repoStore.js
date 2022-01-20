import { writable, get } from "svelte/store";
import { createRepo, getLastWeekDate } from "./utils";

const default_props = {
  repos: [],
  loading: false,
  error: null,
  page: 1,
};

const getData = async (page) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=created:>=${getLastWeekDate()}&sort=stars&order=desc&per_page=9&page=${page}`
  );
  if (!response.ok) {
    const errObj = await response.json();
    const error = `Error occured while loading: ${response.status} - ${errObj.message}`;
    throw new Error(error);
  }
  const result_object = await response.json();
  return result_object.items.map((item) => createRepo(item));        
};

const repoStore = (() => { 
  const store = writable(default_props);  
  const { subscribe, set, update } = store;
  
  const load_more = async () => {
    const state = get(store);
    const { page, repos } = state;

    update(state => {      
      return {...state, loading: true}
    });    
    try {
      const new_data = await getData(page);       
      set({        
        repos: [...repos, ...new_data],
        loading: false,
        page: page + 1,
        error: null
      });
    } catch (error) {
      update(state => {
        return {...state, loading: false, error: error.message};
      });      
    }      
  };

  const reset = async() => {
    set(default_props);
    load_more();
  }

  return {
		subscribe,
    load_more,
    reset
  };
})();

export default repoStore;