import { memo } from "react";
import Markdown from "react-markdown";
import he from "he";
import sanitizer from "sanitize-html";
import { SANITIZE_OPTIONS } from "shared-utils";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

type MarkdownRenderType = JSX.IntrinsicElements["div"] & { content: string };

export const MarkdownRender = memo(
  ({ content, className, ...props }: MarkdownRenderType) => {
    return (
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          h1: ({ children }) => (
            <h1 className="um-text-5xl um-my-5">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="um-text-4xl um-my-5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="um-text-3xl um-my-5">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="um-text-2xl um-my-5">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="um-text-xl um-my-5">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="um-text-xl um-my-5">{children}</h6>
          ),
          blockquote: ({ children }) => (
            <blockquote className="um-p-5 um-my-5 um-bg-p-9 dark:um-bg-p-2 um-border-l-2 um-shadow-2xl um-shadow-p-2">
              {children}
            </blockquote>
          ),
          ol: ({ children }) => (
            <ol className="um-space-y-1 um-list-decimal um-list-inside">
              {children}
            </ol>
          ),
          ul: ({ children }) => (
            <ul className="um-space-y-1 um-list-disc um-list-inside">
              {children}
            </ul>
          ),
          code: ({ children, inline }) => (
            <code
              className={clsx(
                inline && "um-bg-p-9 um-rounded-none um-px-1 dark:um-bg-p-2",
                "um-font-mono"
              )}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="um-border-[1.5px] dark:um-border um-border-p-0 dark:um-border-p-6 um-rounded-lg um-my-5 um-p-5 um-whitespace-pre-wrap um-break-words">
              {children}
            </pre>
          ),
          a: ({ children, ...props }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="um-text-base um-text-s-4 dark:um-text-s-6 hover:um-underline um-break-words"
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ ...props }) => (
            <img className="um-my-5 um-rounded-lg um-w-full" {...props} />
          ),
          iframe: ({ ...props }) => (
            <iframe
              className="um-w-full um-max-h-[500px] um-rounded-lg um-bg-p-0"
              {...props}
            />
          ),
        }}
      >
        {he.decode(sanitizer(content, SANITIZE_OPTIONS))}
      </Markdown>
    );
  }
);
