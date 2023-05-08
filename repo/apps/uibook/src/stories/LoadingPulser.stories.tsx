import type { Meta, StoryObj } from "@storybook/react";

import { LoadingPulser } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LoadingPulser> = {
  title: "Components/LoadingPulser",
  component: LoadingPulser,
  tags: ["autodocs"],
  argTypes: {
    label: {
      type: "string",
      table: {
        type: { summary: "Label for Loading Indicator" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultLoadingPulser: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10">
        <LoadingPulser {...args} />
      </div>
    );
  },
  args: {
    label: "Breathe in. Breathe out.",
  },
};
