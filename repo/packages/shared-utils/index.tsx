import { IOptions } from "sanitize-html";
import { TypeOfArticle, TypeOfWork } from "database";

export const SANITIZE_OPTIONS: IOptions = {
  allowedTags: ["iframe", "br", "strong", "blockquote", "script"],
  allowedAttributes: { iframe: ["src", "height"], script: ["src"] },
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
  allowVulnerableTags: true,
  allowedScriptDomains: ["gist.github.com"],
  allowedScriptHostnames: ["gist.github.com"],
};

const courseWorkPhoto =
  "https://res.cloudinary.com/marvelweb/image/upload/v1678647885/coursework_ddvlol.jpg";
const projectWorkPhoto =
  "https://res.cloudinary.com/marvelweb/image/upload/v1678645549/project_work-1_qvqe48.jpg";
const articlePhoto =
  "https://res.cloudinary.com/marvelweb/image/upload/v1678645549/article_ol6oje.jpg";
const coursePagePhoto =
  "https://res.cloudinary.com/marvelweb/image/upload/v1678650375/course_page_hvaudh.jpg";
export const getCroppedCloudinaryImage = (
  src: string = "",
  fallbackType: TypeOfArticle | TypeOfWork | "COURSE_PAGE"
): string =>
  src
    ? src?.slice(0, src?.search("upload") + 6) +
      "/ar_1.66,c_crop" +
      src?.slice(src?.search("upload") + 6)
    : fallbackType === "COURSE"
    ? courseWorkPhoto
    : fallbackType === "PROJECT"
    ? projectWorkPhoto
    : fallbackType == "BLOG" || fallbackType == "RESOURCE"
    ? articlePhoto
    : fallbackType == "COURSE_PAGE"
    ? coursePagePhoto
    : "";
