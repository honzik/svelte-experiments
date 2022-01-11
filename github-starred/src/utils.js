import { formatDate, toDate } from "date-utils-2020";

export const getLastWeekDate = () => {
  let d = new Date();
  d.setDate(d.getDate() - 7);
  return formatDate(d, "yyyy-MM-dd");
};

export const createRepo = ({
  html_url: url,
  name,
  id,
  stargazers_count: stars,
  description,
}) => {
  return { url, name, id, stars, description };
};
