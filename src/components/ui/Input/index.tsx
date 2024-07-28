import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface InputProps extends BaseProps {
  asChild?: boolean;
}

const Input: React.FC<InputProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: InputProps) => {
  const Comp = asChild ? Slot : "input";
  return (
    <Comp
      className={cn(BaseVariants({ variant, size, className }))}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };

export default Input;
