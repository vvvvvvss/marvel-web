import { IOptions } from "sanitize-html";

export const SANITIZE_OPTIONS: IOptions = {
  allowedTags: ["iframe", "br", "strong", "blockquote"],
  allowedAttributes: { iframe: ["src", "height"] },
  allowedIframeHostnames: [
    "www.youtube.com",
    "codesandbox.io",
    "codepen.io",
    "www.thiscodeworks.com",
    "gist.github.com",
    "plot.ly",
    "www.kaggle.com",
    "player.vimeo.com",
    "plotly.com",
  ],
  nestingLimit: 5,
};
