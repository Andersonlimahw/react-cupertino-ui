import type { Meta, StoryObj } from '@storybook/react';

import Select from '@/components/ui/Select';
import "@globalstyles";

const sampleOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["glass", "solid", "outline"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select a fruit",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Choose your favorite fruit",
    options: sampleOptions,
    placeholder: "Select a fruit",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select your country",
    helperText: "Choose the country you currently reside in",
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select your country",
    error: "Please select a country",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Select",
    options: sampleOptions,
    placeholder: "Select...",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Select",
    options: sampleOptions,
    placeholder: "Select...",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Outline Variant",
    options: sampleOptions,
    placeholder: "Select...",
  },
};

export const Solid: Story = {
  args: {
    variant: "solid",
    label: "Solid Variant",
    options: sampleOptions,
    placeholder: "Select...",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Select",
    options: sampleOptions,
    placeholder: "Cannot select",
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Some options disabled",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2 (disabled)", disabled: true },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4 (disabled)", disabled: true },
      { value: "5", label: "Option 5" },
    ],
    placeholder: "Select an option",
  },
};

export const PreSelected: Story = {
  args: {
    label: "Pre-selected value",
    options: sampleOptions,
    defaultValue: "banana",
  },
};
