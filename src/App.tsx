import { useState } from "react";
import "./App.css";
import "../dist/output.css";

import { Button } from "@/components/ui/Button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/Card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/Dialog";
import Switcher from "./components/ui/Switcher";

export function AlertDialogSample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="playgroud">
      <div className="card-sample gap-4">
        {[1, 1, 2].map(() => (
          <Card variant="secondary">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {[
                  {
                    title: "New message",
                    description: "You have",
                  },
                  {
                    title: "New message",
                    description: "You have",
                  },
                  {
                    title: "New message",
                    description: "You have",
                  },
                ].map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Mark all as read</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="dialog-sample">
        <AlertDialogSample />
      </div>

      <div className="switcher-sample">
        <Switcher />
      </div>
    </div>
  );
}

export default App;
