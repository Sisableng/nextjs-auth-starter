"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteAccount } from "@/app/(dashboard)/dashboard/profile/actions";
import { toast } from "sonner";

export default function DangerArea() {
  const { data: session } = useSession();
  const [showDialog, setShowDialog] = React.useState<boolean>(false);

  // Here you can add some logic before the user deletes the account, for example: verification, etc.

  const handleDeleteAccount = async () => {
    const toastId = toast.loading("Just wait bro...");
    if (!session) {
      toast.error("Session not found.", {
        id: toastId,
      });
      return;
    }

    try {
      const response = await deleteAccount(String(session.user.id));

      if (response) {
        toast.success("See you bro...", {
          id: toastId,
        });
        signOut();
      } else {
        toast.error(`Oh shit, there's a problem!`, {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Dammm, we got a problem from server!`, {
        id: toastId,
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TriangleAlert className="text-destructive" />
          <h2>Danger Area</h2>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Before you proceed with deleting your account, please be aware that
            this action is permanent and cannot be undone. All of your data will
            be permanently removed from our database.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            size={"lg"}
            variant={"destructive"}
            onClick={() => setShowDialog(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Wait! Don't Go Just Yet!`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`Before you hit that red button, remember the good times we've had!
              We've shared some great moments. If you really have to go, we
              understand. But are you fucking serious bro?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>I change my mind</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/80"
              onClick={handleDeleteAccount}
            >
              {`Bwa bwa!`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
