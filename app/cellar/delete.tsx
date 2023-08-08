import React from "react"

import { Button } from "@/components/ui/button"
import {
  // added this myself from https://github.com/shadcn/ui/issues/88
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type DeleteProps = {
  closeD: React.Dispatch<React.SetStateAction<boolean>>
}
const dialog2 = ({ closeD }: DeleteProps) => {
  const deleteHandler = () => {
    console.log("Delete..")
    closeD(false) // function to close dialog
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={deleteHandler}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default dialog2
