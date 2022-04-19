import { formatDate } from "date-utils-2020";

export const getLastWeekDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return formatDate(d, "yyyy-MM-dd");
};

export type TRepo = {
  url: string;
  name: string;
  id: string;
  stars: number;
  description: string;
};

export type TRepoFavs = TRepo & { fav: boolean };

export const createRepo = ({
  html_url: url,
  name,
  id,
  stargazers_count: stars,
  description,
}): TRepo => {
  return { url, name, id: id + "", stars, description };
};
