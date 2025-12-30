import { render, screen } from "@testing-library/react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/Sidesheet";

describe("Sidesheet", () => {
  it("renders the trigger button", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
      </Sheet>
    );

    expect(screen.getByText(/Open Sheet/i)).toBeInTheDocument();
  });

  it("shows content when opened by default", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Manage your preferences</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage your preferences/i)).toBeInTheDocument();
  });
});
