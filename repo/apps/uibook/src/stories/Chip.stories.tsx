import type { Meta, StoryObj } from "@storybook/react";
import { MdLaunch } from "react-icons/md";

import { Chip } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["standard", "outlined"], // values
      control: {
        type: "radio",
      },
      table: {
        type: { summary: "One of 2 Variants of Chip" },
        defaultValue: { summary: "standard" },
      },
    },
    size: {
      options: ["small", "medium", "large"], // values
      control: {
        type: "radio",
      },
      table: {
        type: {
          summary: "One of 3 sizes.",
        },
        defaultValue: { summary: "medium" },
      },
    },
    clickable: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Clickable?",
        },
        defaultValue: { summary: false },
      },
    },

    disabled: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Disabled?",
        },
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultStandardChip: Story = {
  args: {
    children: "Chip",
  },
};

export const ChipVariants: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex flex-wrap gap-5">
        <Chip {...args} variant="standard">
          Standard
        </Chip>
        <Chip {...args} variant="outlined">
          Outlined
        </Chip>
      </div>
    );
  },
  args: {
    size: "medium",
  },
};

export const DisabledChip: Story = {
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap">
        <Chip disabled>Chip</Chip>
        <Chip variant="outlined" disabled>
          Chip
        </Chip>
      </div>
    );
  },
};

export const LeftIcon: Story = {
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap">
        <Chip left={MdLaunch}>Chip</Chip>
        <Chip variant="outlined" left={MdLaunch}>
          Chip
        </Chip>
      </div>
    );
  },
};

export const RightIcon: Story = {
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap">
        <Chip right={MdLaunch}>Chip</Chip>
        <Chip variant="outlined" right={MdLaunch}>
          Chip
        </Chip>
      </div>
    );
  },
};

export const ChipSizes: Story = {
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap items-center">
        <Chip size="small">Chip</Chip>
        <Chip size="medium">Chip</Chip>
        <Chip size="large">Chip</Chip>
      </div>
    );
  },
};
