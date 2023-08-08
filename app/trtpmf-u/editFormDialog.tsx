import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditForm from "./editForm";

export type EditFormProps = {
  title: string;
  // data: { id?: string; amount?: number; status?: string; email?: string }
  data: {
    id?: number;
    producer?: string;
    wineName?: string;
    country?: string;
    region?: string;
    subRegion?: string;
    type?: string;
  };
  setWhichDialog: React.Dispatch<
    React.SetStateAction<"edit" | "delete" | "view" | "">
  >;
};

const editFormDialog = ({ title, data, setWhichDialog }: EditFormProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Edit {title} {data.id} {data.producer} {data.wineName}
        </DialogTitle>
        <DialogDescription>
          <EditForm title="" data={data} setWhichDialog={setWhichDialog} />
        </DialogDescription>
      </DialogHeader>

      {/* <DialogFooter>
        <p>Footer</p>
      </DialogFooter> */}
    </DialogContent>
  );
};

export default editFormDialog;
