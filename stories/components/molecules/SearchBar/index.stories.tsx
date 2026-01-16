import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar, SearchBarProps } from "@components/molecules/SearchBar";
import { useState } from "react";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    loading: { control: "boolean" },
    glass: { control: "boolean" },
    showVoice: { control: "boolean" },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchBarWithState = (args: SearchBarProps) => {
  const [value, setValue] = useState("");
  
  return (
    <div style={{ width: "375px", padding: "20px", background: "var(--background)", minHeight: "300px" }}>
        <SearchBar 
            {...args} 
            value={value} 
            onChangeValue={setValue} 
            onCancel={() => console.log("Cancelled")}
            onSelectSuggestion={(s) => setValue(s)}
        />
    </div>
  );
};

export const Default: Story = {
  args: {
    value: "",
  },
  render: (args) => <SearchBarWithState {...args} />,
};

export const WithSuggestions: Story = {
  args: {
    value: "",
    suggestions: ["Apple", "Apricot", "Avocado", "Banana", "Blueberry"],
  },
  render: (args) => <SearchBarWithState {...args} />,
};

export const Loading: Story = {
  args: {
    value: "",
    loading: true,
  },
  render: (args) => <SearchBarWithState {...args} />,
};
