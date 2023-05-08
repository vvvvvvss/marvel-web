import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { FullScreenDialog, Button } from "ui";

const meta = {
  title: "Components/FullScreenDialog",
  component: FullScreenDialog,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      control: {
        type: null,
      },
      table: {
        type: {
          summary: "Callback function to be called when the dialog is closed.",
        },
      },
    },
  },
} satisfies Meta<typeof FullScreenDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDialog: Story = {
  render: ({ ...args }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
      <div className="relative h-40 py-10 px-5 bg-[url(image.jpg)] bg-no-repeat bg-cover">
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>

        <FullScreenDialog {...args} open={open} onClose={() => setOpen(false)}>
          <div className="flex w-full flex-col items-start gap-5 text-p-0 dark:text-p-10">
            <h1 className="text-2xl">Terms & Conditions</h1>
            <p>
              By clicking on "Agree", you're agreeing to our terms and
              conditions. By clicking on "Agree", you're agreeing to our terms
              and conditions.
            </p>
            <div className="w-full flex gap-5 justify-end">
              <Button>Agree</Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </FullScreenDialog>
      </div>
    );
  },
};
