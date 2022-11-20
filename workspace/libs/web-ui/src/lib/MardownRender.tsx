import { memo } from 'react';
import Markdown from 'markdown-to-jsx';
import he from 'he';
import sanitizer from 'sanitize-html';

type MarkdownRenderType = JSX.IntrinsicElements['div'] & { content: string };

export const MarkdownRender = memo(
  ({ content, className, ...props }: MarkdownRenderType) => {
    return (
      <Markdown
        options={{
          disableParsingRawHTML: false,
          wrapper: 'div',
          overrides: {
            h1: {
              props: { className: 'text-6xl' },
            },
            h2: {
              props: { className: 'text-5xl' },
            },
            h3: {
              props: { className: 'text-4xl' },
            },
            h4: {
              props: { className: 'text-3xl' },
            },
            h5: {
              props: { className: 'text-2xl' },
            },
            h6: {
              props: { className: 'text-xl' },
            },
            blockquote: {
              props: {
                className:
                  'p-5 my-5 bg-p-2 border-l shadow-2xl shadow-p-0 dark:shadow-p-2',
              },
            },
            ol: {
              props: {
                className: 'space-y-1 list-decimal list-inside',
              },
            },
            ul: {
              props: {
                className: 'space-y-1 list-disc list-inside',
              },
            },
            code: {
              props: {
                className: 'text-p-8',
              },
            },
            pre: {
              props: {
                className:
                  'border border-p-6 rounded-lg my-5 p-5 whitespace-pre-wrap break-words',
              },
            },
            a: {
              props: {
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'text-base text-s-7 underline hover:text-s-10',
              },
            },
            img: { props: { className: 'my-5 rounded-lg w-full ' } },
            iframe: {
              props: {
                frameBorder: '0',
                className: 'w-full max-h-[500px] rounded-lg',
              },
            },
          },
        }}
        {...props}
      >
        {he.decode(
          sanitizer(content, {
            allowedTags: ['iframe', 'br', 'strong', 'blockquote', 'script'],
            allowedAttributes: { iframe: ['src', 'height'], script: ['src'] },
            allowedIframeHostnames: [
              'www.youtube.com',
              'codesandbox.io',
              'codepen.io',
              'www.thiscodeworks.com',
              'gist.github.com',
              'plot.ly',
              'www.kaggle.com',
              'player.vimeo.com',
              'plotly.com',
            ],
            nestingLimit: 5,
            allowedScriptDomains: ['gist.github.com'],
            allowedScriptHostnames: ['gist.github.com'],
            allowVulnerableTags: true,
          })
        )}
      </Markdown>
    );
  }
);
