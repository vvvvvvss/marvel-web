import type { Meta, StoryObj } from "@storybook/react";

//@ts-ignore
import { Paper } from "ui";

const meta: Meta<typeof Paper> = {
  title: "Components/Paper",
  component: Paper,
  tags: ["autodocs"],
  argTypes: {
    shadow: {
      options: [true, false, "hover"],
      control: {
        type: "radio",
      },
      table: {
        type: { summary: "Adds a shadow to Paper accordingly." },
        defaultValue: { summary: false },
      },
    },
    border: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Adds a border to Paper",
        },
        defaultValue: { summary: false },
      },
    },
    elevateOnHover: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary:
            "When enabled, Paper elevates on hover and behaves like a button. Can be used with Cards that are hyperlinks",
        },
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 dark:text-p-10">
        <Paper {...args} className="p-5">
          Paper is a primitive surface component, used to build cards and other
          ui elements
        </Paper>
      </div>
    );
  },
};

export const PaperWithBorder: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 dark:text-p-10">
        <Paper {...args} className="p-5">
          Paper is a primitive surface component, used to build cards and other
          ui elements
        </Paper>
      </div>
    );
  },
  args: {
    border: true,
  },
};

export const PaperWithShadow: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 dark:text-p-10">
        <Paper {...args} className="p-5">
          Paper is a primitive surface component, used to build cards and other
          ui elements
        </Paper>
      </div>
    );
  },
  args: {
    shadow: true,
    border: true,
  },
};

export const ShadowOnHover: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 dark:text-p-10">
        <Paper {...args} className="p-5">
          Paper is a primitive surface component, used to build cards and other
          ui elements
        </Paper>
      </div>
    );
  },
  args: {
    shadow: "hover",
    border: true,
  },
};

export const PaperThatBehavesLikeAButton: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 dark:text-p-10">
        <Paper {...args} className="p-5">
          Paper is a primitive surface component, used to build cards and other
          ui elements
        </Paper>
      </div>
    );
  },
  args: {
    elevateOnHover: true,
    border: true,
  },
};

export const ButtonLikePaperButWithShadow: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 dark:text-p-10">
        <Paper {...args} className="p-5">
          Paper is a primitive surface component, used to build cards and other
          ui elements
        </Paper>
      </div>
    );
  },
  args: {
    elevateOnHover: true,
    shadow: "hover",
    border: true,
  },
};
