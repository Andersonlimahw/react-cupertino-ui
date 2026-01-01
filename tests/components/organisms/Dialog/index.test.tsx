import type React from "react";
import { render, screen } from "@testing-library/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/organisms/Dialog";

const renderDialog = (
  contentProps?: Partial<React.ComponentProps<typeof AlertDialogContent>>
) =>
  render(
    <AlertDialog open>
      <AlertDialogContent {...contentProps}>
        <AlertDialogHeader>
          <AlertDialogTitle>Liquid Glass</AlertDialogTitle>
          <AlertDialogDescription>
            Migrating the dialog to iOS 26 visuals.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel loading>Cancel</AlertDialogCancel>
          <AlertDialogAction buttonVariant="solid">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

describe("Dialog", () => {
  it("applies glass attributes and overlay blur tokens", () => {
    renderDialog({ blur: "lg", tone: "destructive", intensity: 0.6 });

    const overlay = document.querySelector(
      ".react-cupertino-ui-dialog__overlay"
    ) as HTMLElement;
    const content = screen.getByRole("alertdialog");

    expect(overlay?.style.getPropertyValue("--dialog-overlay-blur")).toBe(
      "48px"
    );
    expect(content).toHaveAttribute("data-glass", "true");
    expect(content).toHaveAttribute("data-tone", "destructive");
    expect(content).toHaveStyle("--dialog-glass-opacity: 0.6");
  });

  it("allows disabling the glass treatment", () => {
    renderDialog({ glass: false });
    const content = screen.getByRole("alertdialog");
    expect(content).not.toHaveAttribute("data-glass");
  });

  it("wraps actions with the Button component", () => {
    renderDialog();
    const actionButton = screen.getByRole("button", { name: /Continue/i });
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    expect(actionButton).toHaveClass("react-cupertino-ui-button");
    expect(cancelButton.querySelector(".react-cupertino-ui-button__spinner")).toBeInTheDocument();
  });
});
