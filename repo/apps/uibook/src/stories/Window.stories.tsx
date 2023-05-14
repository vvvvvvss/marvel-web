import type { Meta, StoryObj } from "@storybook/react";

//@ts-ignore
import { Window } from "ui";

const meta: Meta<typeof Window> = {
  title: "Components/Window",
  component: Window,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Window className="bg-p-9 dark:text-p-10">
        <div className="max-w-sm w-full bg-p-8 dark:bg-p-2 p-5">
          Window can be used to contain page contents. It fills the available
          screen and centers content
        </div>
      </Window>
    );
  },
};
