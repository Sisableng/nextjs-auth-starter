"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const idiotOptions: { id: string; label: React.ReactNode }[] = [
  {
    id: "rich",
    label: "I want to be rich",
  },
  {
    id: "spawn",
    label: "Spawn Lambo",
  },
  {
    id: "god",
    label: "God Mode",
  },
  {
    id: "wh",
    label: "Wall Hack",
  },
  {
    id: "meteor",
    label: "Drop a meteor on Israel",
  },
  {
    id: "rocket",
    label: "Spawn rockets in the toilet",
  },
  {
    id: "idiot",
    label: (
      <p>
        {`Your're`} <span className="line-through">Idiots</span> Handsome
      </p>
    ),
  },
  {
    id: "gf",
    label: "Make Taylor Swift my girlfriend",
  },
  {
    id: "reset",
    label: "Reset the world",
  },
  {
    id: "sun",
    label: "Put out the sun",
  },
  {
    id: "dad",
    label: "Dad jokes",
  },
];

export default function BroWtf() {
  const [isIdiot, setIsIdiot] = React.useState<boolean>(false);
  const [switchStates, setSwitchStates] = React.useState<{
    [key: string]: boolean;
  }>(Object.fromEntries(idiotOptions.map((item) => [item.id, false])));

  // Function to handle switch toggle
  const handleSwitchToggle = (id: string) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Function to execute when all switches are checked
  const runFunctionIfUserIsAnIdiot = () => {
    setIsIdiot(true);
  };

  React.useEffect(() => {
    const allChecked = Object.values(switchStates).every(
      (state) => state === true,
    );
    if (allChecked) {
      runFunctionIfUserIsAnIdiot();
    }
  }, [switchStates]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {idiotOptions.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Switch
              id={item.id}
              className="data-[state=unchecked]:bg-accent"
              checked={switchStates[item.id]}
              onCheckedChange={(checked: boolean) => {
                handleSwitchToggle(item.id);
              }}
            />
            <Label htmlFor={item.id} className="cursor-pointer">
              {item.label}
            </Label>
          </div>
        ))}
      </div>

      <Dialog open={isIdiot} onOpenChange={setIsIdiot}>
        <DialogContent>
          <div className="space-y-4 text-center">
            <h2>bro, you really are an idiot.</h2>
            <p className="text-muted-foreground">WoW</p>
          </div>
          <DialogFooter className="w-full items-center sm:justify-center">
            <DialogClose asChild>
              <Button type="button">Okay</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
