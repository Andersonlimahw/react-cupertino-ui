import { useState } from "react";
import "./App.css";

import { Button } from "@/components/ui/Button";
import Title from "./components/ui/Title";
import Caption from "./components/ui/Caption";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/Card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="playgroud">
      <Button
        variant="default"
        size="lg"
        onClick={() => setCount((count) => count + 1)}
      >
        button sample count is {count}
      </Button>
      <Title variant="heading">Title</Title>
      <Title variant="heading3">Title</Title>
      <Caption variant="default">Caption default</Caption>
      <Caption variant="secondary" size="lg">
        Caption secondary
      </Caption>
      <div className="card-sample">
        <Card className="w-[380px]">
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
      </div>
    </div>
  );
}

export default App;
