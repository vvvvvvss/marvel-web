import type { Meta, StoryObj } from "@storybook/react";
import { MdLaunch } from "react-icons/md";

import { Button } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["standard", "outlined", "text"], // values
      control: {
        type: "radio",
      },
      table: {
        type: { summary: "One of 3 Variants of the Button component" },
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
          summary: "One of 3 Button sizes.",
        },
        defaultValue: { summary: "medium" },
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultStandardButton: Story = {
  args: {
    children: "Button",
  },
};

export const ButtonVariants: Story = {
  render: ({ ...args }) => {
    return (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Button {...args} variant="standard">
          Standard
        </Button>
        <Button {...args} variant="outlined">
          Outlined
        </Button>
        <Button {...args} variant="text">
          Text
        </Button>
      </div>
    );
  },
  args: {
    size: "medium",
  },
};

export const DisabledButton: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const LeftIcon: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Button left={MdLaunch}>Button</Button>
        <Button variant="outlined" left={MdLaunch}>
          Button
        </Button>
        <Button variant="text" left={MdLaunch}>
          Button
        </Button>
      </div>
    );
  },
};

export const RightIcon: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Button right={MdLaunch}>Button</Button>
        <Button variant="outlined" right={MdLaunch}>
          Button
        </Button>
        <Button variant="text" right={MdLaunch}>
          Button
        </Button>
      </div>
    );
  },
};
