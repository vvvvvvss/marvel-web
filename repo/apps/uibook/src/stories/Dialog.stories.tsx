import type { Meta, StoryObj } from "@storybook/react";

//@ts-ignore
import { Dialog, IconButton, Button } from "ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultDialog: Story = {
  render: () => {
    return (
      <div className="relative h-96 py-10 px-5 bg-[url(image.jpg)] bg-no-repeat bg-cover">
        <Dialog>
          <div className="flex w-full flex-col gap-5">
            <p>Dialog text</p>
            <Button>Login</Button>
          </div>
        </Dialog>
      </div>
    );
  },
};
