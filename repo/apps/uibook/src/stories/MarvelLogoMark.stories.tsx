import type { Meta, StoryObj } from "@storybook/react";

import { MarvelLogoMark } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Logos&Icons/MarvelLogoMark",
  component: MarvelLogoMark,
  tags: ["autodocs"],
} satisfies Meta<typeof MarvelLogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LogoMark: Story = {
  render: () => <MarvelLogoMark />,
};

export const LogoMarkWhiteStroke: Story = {
  render: () => <MarvelLogoMark className="bg-p-0 text-p-10" />,
};
