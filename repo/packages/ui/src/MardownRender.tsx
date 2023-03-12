import { memo } from "react";
import Markdown from "markdown-to-jsx";
import he from "he";
import sanitizer from "sanitize-html";
import { SANITIZE_OPTIONS } from "shared-utils";

type MarkdownRenderType = JSX.IntrinsicElements["div"] & { content: string };

export const MarkdownRender = memo(
  ({ content, className, ...props }: MarkdownRenderType) => {
    return (
      <Markdown
        options={{
          disableParsingRawHTML: false,
          wrapper: "div",
          overrides: {
            h1: {
              props: { className: "text-5xl my-5" },
            },
            h2: {
              props: { className: "text-4xl my-5" },
            },
            h3: {
              props: { className: "text-3xl my-5" },
            },
            h4: {
              props: { className: "text-2xl my-5" },
            },
            h5: {
              props: { className: "text-xl my-5" },
            },
            h6: {
              props: { className: "text-xl my-5" },
            },
            blockquote: {
              props: {
                className:
                  "p-5 my-5 bg-p-9 dark:bg-p-2 border-l-2 shadow-2xl shadow-p-2",
              },
            },
            ol: {
              props: {
                className: "space-y-1 list-decimal list-inside",
              },
            },
            ul: {
              props: {
                className: "space-y-1 list-disc list-inside",
              },
            },
            code: {
              props: {
                className: "text-p-3 dark:text-p-8",
              },
            },
            pre: {
              props: {
                className:
                  "border-[1.5px] dark:border border-p-0 dark:border-p-6 rounded-lg my-5 p-5 whitespace-pre-wrap break-words",
              },
            },
            a: {
              props: {
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "text-base text-s-4 dark:text-s-6 hover:underline break-words",
              },
            },
            img: { props: { className: "my-5 rounded-lg w-full " } },
            iframe: {
              props: {
                frameBorder: "0",
                className: "w-full max-h-[500px] rounded-lg bg-p-0",
              },
            },
          },
        }}
        {...props}
      >
        {he.decode(sanitizer(content, SANITIZE_OPTIONS))}
      </Markdown>
    );
  }
);
