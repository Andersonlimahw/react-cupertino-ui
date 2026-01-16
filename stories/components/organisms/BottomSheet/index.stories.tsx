import type { Meta, StoryObj } from "@storybook/react";
import {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetDescription,
} from "@components/organisms/BottomSheet";
import { Button } from "@components/molecules/Button";
import { Switcher } from "@components/ui/Switcher";
import { useState } from "react";

const meta = {
  title: "Organisms/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SettingsList = () => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);

  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        listStyle: "none",
        padding: 0,
        margin: "0.5rem 0 1rem",
      }}
    >
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>Wi-Fi</p>
          <span>Home Network</span>
        </div>
        <Switcher checked={wifi} onCheckedChange={setWifi} />
      </li>
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>Bluetooth</p>
          <span>AirPods Nearby</span>
        </div>
        <Switcher checked={bluetooth} onCheckedChange={setBluetooth} />
      </li>
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>AirDrop</p>
          <span>Contacts Only</span>
        </div>
      </li>
    </ul>
  );
};

export const Default: Story = {
  render: () => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="glass">Open Bottom Sheet</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetTitle>Connection Controls</BottomSheetTitle>
        <BottomSheetDescription>Quickly toggle frequently used settings.</BottomSheetDescription>
        <SettingsList />
        <Button fullWidth>Done</Button>
      </BottomSheetContent>
    </BottomSheet>
  ),
};

export const CustomSnapPoints: Story = {
  render: () => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="outline">Show Filters</Button>
      </BottomSheetTrigger>
      <BottomSheetContent snapPoints={[0.35, 0.6, 0.92]} initialSnap={0.6} onSnapChange={(value, index) => console.log({ value, index })}>
        <BottomSheetTitle>Display Options</BottomSheetTitle>
        <BottomSheetDescription>Drag to resize and reveal more controls.</BottomSheetDescription>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Button variant="ghost">Show Only Favorites</Button>
          <Button variant="ghost">Sort by Date</Button>
          <Button variant="ghost">Sort by Name</Button>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  ),
};
