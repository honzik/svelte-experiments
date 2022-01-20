import { formatDate, toDate } from "date-utils-2020";

export const getLastWeekDate = (): string => {
  let d = new Date();
  d.setDate(d.getDate() - 7);
  return formatDate(d, "yyyy-MM-dd");
};

export type TRepo = {
  url: string;
  name: string;
  id: number;
  stars: number;
  description: string;
};

export const createRepo = ({
  html_url: url,
  name,
  id,
  stargazers_count: stars,
  description,
}):TRepo => {
  return { url, name, id, stars, description };
};
