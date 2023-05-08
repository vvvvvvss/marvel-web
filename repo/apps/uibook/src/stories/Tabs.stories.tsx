import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
//@ts-ignore
import { TabGroup, Tab } from "ui";

const meta: Meta<typeof TabGroup> = {
  title: "Components/Tabs",
  component: TabGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(1);
    return (
      <div className="bg-p-10 dark:bg-p-0 p-10">
        <TabGroup>
          <Tab active={activeTab == 1} onClick={() => setActiveTab(1)}>
            Tab 1
          </Tab>
          <Tab active={activeTab == 2} onClick={() => setActiveTab(2)}>
            Tab 2
          </Tab>
          <Tab active={activeTab == 3} onClick={() => setActiveTab(3)}>
            Tab 3
          </Tab>
        </TabGroup>
      </div>
    );
  },
};
