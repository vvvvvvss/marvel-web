import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "ui";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"], // values
      control: {
        type: "radio",
      },
      table: {
        type: {
          summary: "One of 3 Avatar sizes.",
        },
        defaultValue: { summary: "medium" },
      },
    },
    src: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Image source link",
        },
      },
    },
    alt: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Image alt text",
        },
      },
    },
    fallbackChar: {
      control: {
        type: "character",
      },
      table: {
        type: {
          summary: "Character to display when image fails to load",
        },
        defaultValue: "First character of Alt text",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultAvatar: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    src: "https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg",
    alt: "Alt text",
  },
};

export const AvatarFallbackWithAlt: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 flex gap-5 items-center">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    src: "Invalid_link",
    alt: "Alt text",
  },
};

export const AvatarFallbackWithFallbackChar: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 flex gap-5 items-center">
        <Avatar {...args} />
      </div>
    );
  },
  args: {
    src: "Invalid_link",
    alt: "Alt text",
    fallbackChar: "A",
  },
};

export const AvatarSizes: Story = {
  render: ({ ...args }) => {
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10 flex gap-5 items-center">
        <Avatar {...args} size="small" />
        <Avatar {...args} size="medium" />
        <Avatar {...args} size="large" />
      </div>
    );
  },

  args: {
    src: "https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg",
    alt: "Alt text",
  },
};
