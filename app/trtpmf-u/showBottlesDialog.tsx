import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ShowBottlesDialogProps = {
  setShowBottle: (show: boolean) => void;
};

const ShowBottlesDialog = ({ setShowBottle }: ShowBottlesDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Show Bottles</DialogTitle>
        <DialogDescription>AAAAAAAAAAAAAAAAA</DialogDescription>
      </DialogHeader>
      <Button onClick={() => setShowBottle(false)}>Close</Button>
      {/* <DialogFooter>
                <p>Footer</p>
            </DialogFooter> */}
    </DialogContent>
  );
};

export default ShowBottlesDialog;
