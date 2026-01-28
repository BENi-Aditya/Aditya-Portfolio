import { renderToString } from "react-dom/server";
import { AppForPrerender } from "./prerender/AppForPrerender";

export function render(url: string) {
  const html = renderToString(<AppForPrerender url={url} />);
  return { html };
}
