import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { 
    ActionSheet, 
    ActionSheetTrigger, 
    ActionSheetContent, 
    ActionSheetAction, 
    ActionSheetCancel 
} from "@components/organisms/ActionSheet";
import { describe, it, expect, vi } from "vitest";

// Radix Dialog requires a bit of setup for testing or mocking pointer events sometimes,
// but usually simple click interactions work.

describe("ActionSheet", () => {
  it("opens when trigger is clicked", async () => {
    render(
      <ActionSheet>
        <ActionSheetTrigger>Open</ActionSheetTrigger>
        <ActionSheetContent>
          <ActionSheetAction>Action 1</ActionSheetAction>
        </ActionSheetContent>
      </ActionSheet>
    );

    fireEvent.click(screen.getByText("Open"));
    
    expect(await screen.findByText("Action 1")).toBeVisible();
  });

  it("calls action on select", async () => {
    const handleSelect = vi.fn();
    render(
      <ActionSheet>
        <ActionSheetTrigger>Open</ActionSheetTrigger>
        <ActionSheetContent>
          <ActionSheetAction onSelect={handleSelect}>Action 1</ActionSheetAction>
        </ActionSheetContent>
      </ActionSheet>
    );

    fireEvent.click(screen.getByText("Open"));
    const action = await screen.findByText("Action 1");
    fireEvent.click(action);
    
    expect(handleSelect).toHaveBeenCalled();
  });

  it("closes on cancel", async () => {
    render(
      <ActionSheet>
        <ActionSheetTrigger>Open</ActionSheetTrigger>
        <ActionSheetContent>
            <ActionSheetAction>Action 1</ActionSheetAction>
          <ActionSheetCancel>Cancel</ActionSheetCancel>
        </ActionSheetContent>
      </ActionSheet>
    );

    fireEvent.click(screen.getByText("Open"));
    const cancel = await screen.findByText("Cancel");
    fireEvent.click(cancel);
    
    await waitFor(() => {
        expect(screen.queryByText("Action 1")).not.toBeVisible();
    });
  });
});
