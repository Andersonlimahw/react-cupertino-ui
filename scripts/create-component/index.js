#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const program = new Command();

program
  .version("1.0.0")
  .description("CLI to generate new components with ShadCN")
  .argument("<component-name>", "Name of the component")
  .action((componentName) => {
    const componentDir = path.join(
      __dirname,
      "../../src/components/ui",
      componentName
    );
    const componentFile = path.join(componentDir, `index.tsx`);
    const stylesFile = path.join(componentDir, `index.scss`);
    const storyDir = path.join(
      __dirname,
      "../../stories/components/ui",
      componentName
    );
    const storyFile = path.join(storyDir, `index.stories.tsx`);
    const testDir = path.join(
      __dirname,
      "../../tests/components/ui",
      componentName
    );
    const testFile = path.join(testDir, `index.test.tsx`);

    // Create component directory
    fs.ensureDirSync(componentDir);

    // Create styles file
    const stylesTemplate = `.react-cupertino-ui-${componentName.toLowerCase()} {}`;
    fs.writeFileSync(stylesFile, stylesTemplate.trim());

    // Create component file
    const componentTemplate = `
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface ${componentName}Props
  extends BaseProps {
  asChild?: boolean;
}

const ${componentName} : React.FC<${componentName}Props> = (
  ({ className, variant, size, asChild = false, ...props } : ${componentName}Props) => {
    const Comp = asChild ? Slot : "${componentName}";
    return (
      <Comp
        className={cn(BaseVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
${componentName}.displayName = "${componentName}";

export { ${componentName} };

export default ${componentName};
    `;
    fs.writeFileSync(componentFile, componentTemplate.trim());

    // Create story directory
    fs.ensureDirSync(storyDir);

    // Create story file
    const storyTemplate = `
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ${componentName} from '@/components/ui/${componentName}';

const meta = {
  title: 'Example/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    // Define default args here
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Define primary story args here
  },
};

export const Secondary: Story = {
  args: {
    // Define secondary story args here
  },
};
    `;
    fs.writeFileSync(storyFile, storyTemplate.trim());

    // Create test directory
    fs.ensureDirSync(testDir);

    // Create test file
    const testTemplate = `
import { render, screen } from "@testing-library/react";
import { ${componentName} } from "@/components/ui/${componentName}";

describe("${componentName} Component", () => {
  it("renders correctly with default props", () => {
    render(<${componentName} onClick={() => {}}>Click Me</${componentName}>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <${componentName} variant="destructive" onClick={() => {}}>
        Delete
      </${componentName}>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("bg-destructive");
  });
});
    `;
    fs.writeFileSync(testFile, testTemplate.trim());

    console.log(`Component ${componentName} created successfully.`);
  });

program.parse(process.argv);
