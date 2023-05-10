import type { Meta, StoryObj } from "@storybook/react";
//@ts-ignore
import { NumberField, type NumberFieldProps } from "ui";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { number } from "prop-types";

const meta = {
  title: "Components/NumberField",
  component: NumberField,
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
          summary: "Label to display above the NumberField",
        },
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Specifies whether the NumberField is disabled",
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
          summary: "Specifies whether the NumberField is required",
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
          summary: "Description to display below the NumberField",
        },
      },
    },
    defaultValue: {
      control: {
        type: number,
      },
      table: {
        type: {
          summary: "Default value for the NumberField",
        },
      },
    },
    minValue: {
      control: {
        type: number,
      },
      table: {
        type: {
          summary: "Minimum value for the NumberField",
        },
      },
    },
    maxValue: {
      control: {
        type: number,
      },
      table: {
        type: {
          summary: "Maximum value for the NumberField",
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
          summary: "Validation state of the NumberField",
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
          summary:
            "Error message to display below the NumberField when invalid",
        },
      },
    },
    isReadOnly: {
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "Specifies whether the NumberField is read-only",
        },
        defaultValue: { summary: false },
      },
    },
    value: {
      control: {
        type: number,
      },
      table: {
        type: {
          summary: "Current value of the NumberField",
        },
      },
    },
    onChange: {
      action: "onChange",
      table: {
        type: {
          summary:
            "Callback function that is called when the value of the NumberField changes",
        },
      },
    },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberFieldWithLabelAndPlaceholder: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<number>(0);
    return (
      <div className="p-10 bg-p-10 dark:bg-p-0">
        <NumberField value={value} onChange={setValue} {...args} />
      </div>
    );
  },
  args: {
    label: "Number",
    placeholder: "Enter the Number",
    step: 1,
    formatOptions: {
      style: "currency",
      currency: "USD",
    },
    defaultValue: 6,
  },
};

export const FullWidth: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<number>(0);
    return (
      <div className="p-10 bg-p-10 dark:bg-p-0">
        <NumberField value={value} onChange={setValue} {...args} />
      </div>
    );
  },
  args: {
    label: "Number",
    placeholder: "Enter the Number",
    fullWidth: true,
  },
};

export const WithDescription: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<number>(0);

    return (
      <div className="p-10 bg-p-10 dark:bg-p-0">
        <NumberField value={value} onChange={setValue} {...args} />
      </div>
    );
  },
  args: {
    label: "Number",
    placeholder: "Enter the Number",
    description:
      "Names can be upto 60 characters long and also include emojis!",
  },
};

export const WithErrorMessage: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<number>(0);

    return (
      <div className="p-10 bg-p-10 dark:bg-p-0">
        <NumberField value={value} onChange={setValue} {...args} />
      </div>
    );
  },
  args: {
    label: "Number",
    placeholder: "Enter the Number",
    errorMessage: "Invalid Number. Please check and try again.",
  },
};

export const NumberFieldWithIcon: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<number>(0);

    return (
      <div className="p-10 bg-p-10 dark:bg-p-0">
        <NumberField value={value} onChange={setValue} {...args} />
      </div>
    );
  },
  args: {
    label: "Number",
    placeholder: "Enter the Number",
    icon: MdAlternateEmail,
  },
};
