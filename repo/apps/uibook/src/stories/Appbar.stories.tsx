import type { Meta, StoryObj } from "@storybook/react";
import { MdMenu } from "react-icons/md";

import { Appbar, IconButton, Button } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Appbar",
  component: Appbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Appbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultAppbar: Story = {
  render: () => {
    return (
      <div className="relative py-10 px-5 bg-[url(image.jpg)] bg-no-repeat bg-cover">
        <Appbar className="relative w-full">
          <div className="flex w-full justify-between items-center">
            <IconButton variant="text">
              <MdMenu />
            </IconButton>
            UVCE MARVEL
            <Button>Login</Button>
          </div>
        </Appbar>
      </div>
    );
  },
};
