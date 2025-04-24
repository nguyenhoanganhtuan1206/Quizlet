import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const navigateTo = (path: string) => {
  history.push(path);
};
