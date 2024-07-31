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
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "./components/ui/Dialog";
import { Copy } from "lucide-react";
import Title from "./components/ui/Title";

export function DialogSample() {
  return (
    <Dialog>
      <DialogTrigger asChild>Open</DialogTrigger>
      <DialogContent className="sm:max-w-md w-full h-full">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start flex items-center space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
        <DialogSample />
      </div>
    </div>
  );
}

export default App;
