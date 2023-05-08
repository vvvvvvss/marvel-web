import type { Meta, StoryObj } from "@storybook/react";
import { MdLaunch } from "react-icons/md";

import { Button } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Button",
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
  render: ({ ...args }) => {
    return (
      <div className="flex p-5 flex-wrap gap-5 bg-p-10 dark:bg-p-0">
        <Button {...args} />
      </div>
    );
  },
  args: {
    children: "Button",
  },
};

export const ButtonVariants: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex flex-wrap gap-5 bg-p-10 dark:bg-p-0 p-10">
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
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap bg-p-10 dark:bg-p-0 p-10">
        <Button disabled>Button</Button>
        <Button variant="outlined" disabled>
          Button
        </Button>
        <Button variant="text" disabled>
          Button
        </Button>
      </div>
    );
  },
};

export const LeftIcon: Story = {
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap bg-p-10 dark:bg-p-0 p-10">
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
      <div className="flex gap-5 flex-wrap bg-p-10 dark:bg-p-0 p-10">
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

export const ButtonSizes: Story = {
  render: () => {
    return (
      <div className="flex gap-5 flex-wrap items-center bg-p-10 dark:bg-p-0 p-10">
        <Button size="small">Button</Button>
        <Button size="medium">Button</Button>
        <Button size="large">Button</Button>
      </div>
    );
  },
};
