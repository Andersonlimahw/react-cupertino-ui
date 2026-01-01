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
      "../../packages/ui",
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

    const slug = componentName
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
      .toLowerCase();

    const packageJson = {
      name: `@react-cupertino-ui/${slug}`,
      version: "0.0.0",
      description: `${componentName} component from React Cupertino UI`,
      type: "module",
      main: "./dist/index.js",
      module: "./dist/index.js",
      types: "./dist/index.d.ts",
      files: ["dist"],
      sideEffects: ["./dist/**/*.css", "./dist/**/*.scss"],
      scripts: {
        build: "tsc -p tsconfig.build.json && npm run build:styles",
        "build:styles": "node ../../../scripts/build-styles.mjs",
      },
      peerDependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
      },
      dependencies: {
        "@react-cupertino-ui/shared": "workspace:*",
      },
    };
    fs.writeFileSync(
      path.join(componentDir, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );

    const tsconfig = {
      extends: "../../../tsconfig.packages.json",
      compilerOptions: {
        rootDir: ".",
        outDir: "./dist",
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["dist", "node_modules"],
    };
    fs.writeFileSync(
      path.join(componentDir, "tsconfig.build.json"),
      JSON.stringify(tsconfig, null, 2)
    );

    // Create styles file
    const wrapperName = `react-cupertino-ui-${componentName.toLowerCase()}`;
    const stylesTemplate = `.${wrapperName} {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        

        &:focus-visible,
        &:focus {
          outline: none;
          outline-color: transparent;
          outline-offset: 2px;
        }

        &:disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        &.variant-default {
          
        }

        &.variant-destructive {
          
        }

        &.variant-outline {
          
        }

        &.variant-secondary {
        
        }

        &.variant-ghost {
        
        }

        &.variant-link {
          
        }

        &.size-default {
          height: 2.5rem;
          padding: 0.5rem 1rem;
        }

        &.size-sm {
          height: 2.25rem;
          padding: 0.75rem;
        }

        &.size-lg {
          height: 2.75rem;
          padding: 0.5rem 2rem;
        }

        &.size-icon {
          height: 2.5rem;
          width: 2.5rem;
        }
    }`;
    fs.writeFileSync(stylesFile, stylesTemplate.trim());

    // Create component file
    const componentTemplate = `
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps, BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

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
        className={cn(BaseVariants("${wrapperName}", { variant, size, className }))}
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

import ${componentName} from '@components/ui/${componentName}';
import "../../../../dist/output.css";

const meta = {
  title: 'UI/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: "Sample",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
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
import { ${componentName} } from "@components/ui/${componentName}";

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
    expect(element).toHaveClass("variant-destructive");
  });

  it("applies the correct size class", () => {
    render(
      <${componentName} variant="destructive" size="lg" onClick={() => {}}>
        Delete
      </${componentName}>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("size-lg");
  });
});
    `;
    fs.writeFileSync(testFile, testTemplate.trim());

    console.log(`Component ${componentName} created successfully.`);
    console.log("Run 'npm run sync:paths' to refresh TypeScript aliases.");
  });

program.parse(process.argv);
