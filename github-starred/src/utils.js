export const createRepo = ({ html_url: url, name, id, stargazers_count: stars, description }) => {
  return { url, name, id, stars, description };
};
