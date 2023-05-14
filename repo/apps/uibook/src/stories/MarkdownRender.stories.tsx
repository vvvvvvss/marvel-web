import type { Meta, StoryObj } from "@storybook/react";

//@ts-ignore
import { MarkdownRender } from "ui";

const meta: Meta<typeof MarkdownRender> = {
  title: "Components/MarkdownRender",
  component: MarkdownRender,
  tags: ["autodocs"],
  argTypes: {
    content: {
      type: "string",
      table: {
        type: { summary: "Markdown content" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultMarkdownRender: Story = {
  render: ({ ...args }) => {
    return (
      <div className="p-10 bg-p-10 dark:bg-p-0 text-p-0 dark:text-p-10">
        <MarkdownRender {...args} />
      </div>
    );
  },
  args: {
    content:
      "# Title \n Paragraph \n - list \n  - list \n - list \n \n *Italic* **Bold** ~~Strike Through~~ \n \n https://google.com \n \n And many other Markdown features including GitHub flavoured Markdown. You can also use HTML but HTML is sanitized before rendering",
  },
};
