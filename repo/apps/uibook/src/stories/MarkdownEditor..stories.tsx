import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

//@ts-ignore
import { MarkdownEditor } from "ui";

const meta: Meta<typeof MarkdownEditor> = {
  title: "Components/MarkdowEditor",
  component: MarkdownEditor,
  tags: ["autodocs"],
  argTypes: {
    value: {
      type: "string",
      table: {
        type: { summary: "Markdown content" },
        defaultValue: { summary: "" },
      },
    },
    onChange: {
      type: "action",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultValue =
  "# Title \n Paragraph \n - list \n  - list \n - list \n \n *Italic* **Bold** ~~Strike Through~~ \n \n https://google.com \n \n And many other Markdown features including GitHub flavoured Markdown. You can also use HTML but HTML is sanitized before rendering";

export const DefaultMarkdownRender: Story = {
  render: () => {
    const [value, setValue] = useState<string>(defaultValue);
    return (
      <div className="p-10 bg-p-10 dark:bg-p-0 text-p-0 dark:text-p-10">
        <MarkdownEditor
          value={value}
          onChange={(e: any) => setValue(e.target?.value)}
        />
      </div>
    );
  },
};
