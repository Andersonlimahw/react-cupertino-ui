import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetTitle,
} from "@/components/organisms/BottomSheet";
import { Button } from "@/components/molecules/Button";

if (typeof window.PointerEvent === "undefined") {
  class PointerEventPolyfill extends MouseEvent {
    constructor(type: string, props?: MouseEventInit) {
      super(type, props);
    }
  }
  // @ts-ignore
  window.PointerEvent = PointerEventPolyfill;
}

describe("BottomSheet", () => {
  const restoreInnerHeight = () => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 768,
    });
  };

  afterEach(() => {
    restoreInnerHeight();
  });

  it("opens when trigger is clicked", async () => {
    render(
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <Button>Open Sheet</Button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetTitle>Drawer</BottomSheetTitle>
        </BottomSheetContent>
      </BottomSheet>
    );

    fireEvent.click(screen.getByText("Open Sheet"));
    expect(await screen.findByText("Drawer")).toBeVisible();
  });

  it("calls onSnapChange when dragged to a different snap point", async () => {
    const onSnapChange = vi.fn();
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });

    render(
      <BottomSheet defaultOpen>
        <BottomSheetContent
          snapPoints={[0.3, 0.6]}
          initialSnap={0.3}
          onSnapChange={onSnapChange}
        >
          <p>Sheet body</p>
        </BottomSheetContent>
      </BottomSheet>
    );

    const handle = await screen.findByLabelText("Ajustar painel");
    fireEvent.pointerDown(handle, { clientY: 700, button: 0 });
    window.dispatchEvent(new PointerEvent("pointermove", { clientY: 200 }));
    window.dispatchEvent(new PointerEvent("pointerup", { clientY: 200 }));

    await waitFor(() => {
      expect(onSnapChange).toHaveBeenLastCalledWith(0.6, 1);
    });
  });

  it("requests close when dragged below the minimum threshold", async () => {
    const handleOpenChange = vi.fn();
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });

    render(
      <BottomSheet defaultOpen onOpenChange={handleOpenChange}>
        <BottomSheetContent snapPoints={[0.25, 0.5]} initialSnap={0.25}>
          <p>Content</p>
        </BottomSheetContent>
      </BottomSheet>
    );

    const handle = await screen.findByLabelText("Ajustar painel");
    fireEvent.pointerDown(handle, { clientY: 200, button: 0 });
    window.dispatchEvent(new PointerEvent("pointermove", { clientY: 760 }));
    window.dispatchEvent(new PointerEvent("pointerup", { clientY: 760 }));

    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
