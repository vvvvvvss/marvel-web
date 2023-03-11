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
              props: { className: "ui-text-5xl ui-my-5" },
            },
            h2: {
              props: { className: "ui-text-4xl ui-my-5" },
            },
            h3: {
              props: { className: "ui-text-3xl ui-my-5" },
            },
            h4: {
              props: { className: "ui-text-2xl ui-my-5" },
            },
            h5: {
              props: { className: "ui-text-xl ui-my-5" },
            },
            h6: {
              props: { className: "ui-text-xl ui-my-5" },
            },
            blockquote: {
              props: {
                className:
                  "ui-p-5 ui-my-5 ui-bg-p-2 ui-border-l ui-shadow-2xl ui-shadow-p-0 dark:ui-shadow-p-2",
              },
            },
            ol: {
              props: {
                className: "ui-space-y-1 ui-list-decimal ui-list-inside",
              },
            },
            ul: {
              props: {
                className: "ui-space-y-1 ui-list-disc ui-list-inside",
              },
            },
            code: {
              props: {
                className: "ui-text-p-8",
              },
            },
            pre: {
              props: {
                className:
                  "ui-border ui-border-p-6 ui-rounded-lg ui-my-5 ui-p-5 ui-whitespace-pre-wrap ui-break-words",
              },
            },
            a: {
              props: {
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "ui-text-base ui-text-s-6 hover:ui-underline ui-break-words",
              },
            },
            img: { props: { className: "ui-my-5 ui-rounded-lg ui-w-full " } },
            iframe: {
              props: {
                frameBorder: "0",
                className: "ui-w-full ui-max-h-[500px] ui-rounded-lg ui-bg-p-0",
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
