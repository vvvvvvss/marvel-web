import type { Meta, StoryObj } from "@storybook/react";
//@ts-ignore
import { TextField, type TextFieldProps } from "ui";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    fullWidth: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Full width?",
        },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "CSS classes to apply to the component",
        },
      },
    },
    label: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Label to display above the TextField",
        },
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Specifies whether the TextField is disabled",
        },
        defaultValue: { summary: false },
      },
    },
    isRequired: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Specifies whether the TextField is required",
        },
        defaultValue: { summary: false },
      },
    },
    description: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Description to display below the TextField",
        },
      },
    },
    defaultValue: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Default value for the TextField",
        },
      },
    },
    validationState: {
      options: ["valid", "invalid", "unknown"],
      control: {
        type: "radio",
      },
      table: {
        type: {
          summary: "Validation state of the TextField",
        },
        defaultValue: { summary: "unknown" },
      },
    },
    errorMessage: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Error message to display below the TextField when invalid",
        },
      },
    },
    isReadOnly: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Specifies whether the TextField is read-only",
        },
        defaultValue: { summary: false },
      },
    },
    value: {
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "Current value of the TextField",
        },
      },
    },
    onChange: {
      action: "onChange",
      table: {
        type: {
          summary:
            "Callback function that is called when the value of the TextField changes",
        },
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFieldWithLabelAndPlaceholder: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    fullWidth: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    description:
      "Names can be upto 60 characters long and also include emojis!",
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    errorMessage: "Invalid Name. Please check and try again.",
  },
};
