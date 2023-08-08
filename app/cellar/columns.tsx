"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bottle1 } from "./page";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Delete from "./delete";
import { ConsumeBottleModal } from "@/app/cellar/modal-consume";
import { AddBottleModal } from "@/app/cellar/modal-add-bottle";
import { DeleteBottleModal } from "./modal-delete";
import { EditBottleModal } from "./modal-edit-bottle";

export const columns: ColumnDef<Bottle1>[] = [
  {
    accessorKey: "vintage",
    header: () => <div className="text-center">Vintage</div>,
    cell: (props) => {
      return (
        <div style={{ textAlign: "center" }}>{props.row.original.vintage}</div>
      );
    },
  },

  {
    id: "Wine",
    accessorFn: (row) =>
      `${row.wine.producer} ${row.wine.wineName} (${row.wine.id})`,
  },
  // More lines of code
  // {
  //   id: "Rndom",
  //   accessorFn: (row) => {
  //     console.log(row.id);
  //     return `${row.vintage}`;
  //   },
  // },
  {
    accessorKey: "rack",
  },
  {
    accessorKey: "shelf",
    header: "Shelf",
  },
  {
    accessorKey: "cost",
    // id: "GGG",
    // accessorFn: (x) => x.cost,
    header: () => <div className="text-center">Cost</div>,
    cell: (props) => {
      return (
        <div style={{ textAlign: "center" }}>
          {props.row.original.cost
            ? Number(props.row.original.cost.toString()).toFixed(2)
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-left">Id</div>,
  },

  // Date Example
  // {
  //   accessorKey: "createdAt",
  //   header: () => <div className="text-center">Created</div>,
  //   cell: (props) => {
  //     return (
  //       <div style={{ textAlign: "center" }}>
  //         {props.row.original.createdAt
  //           ? format(new Date(props.row.original.createdAt), "dd/MM/yyyy")
  //           : ""}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const btl = row.original;
      const [whichDialog, setWhichDialog] = useState<
        "edit" | "delete" | "consume" | ""
      >("");
      const [openDialog, setOpenDialog] = useState(false);
      const [openConsumeModal, setOpenConsumeModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
      const [openAddModal, setOpenAddModal] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);

      // const onContinue = () => {
      //   console.log("Set Consume date");
      //   setOpenConsumeModal(false);
      // };
      const [bottleDetails, setBottleDetails] = useState("");
      const [bId, setbId] = useState(0);
      const [bott, setBott] = useState(btl);

      const consume = (bId: number, name: string) => {
        console.log("Consume", bId);
        setBottleDetails(name);
        setbId(bId);
        setOpenConsumeModal(true);
      };

      const deleteModal = (bId: number, name: string) => {
        console.log("Delete", bId);
        setBottleDetails(name);
        setbId(bId);
        setOpenDeleteModal(true);
      };

      const addBottleModal = (btl: any) => {
        console.log("Add", btl);
        setBott(btl);
        setOpenAddModal(true);
      };
      const editBottleModal = (btl: any) => {
        console.log("Edit", btl);
        setBott(btl);
        setOpenEditModal(true);
      };
      return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() =>
                    consume(
                      btl.id,
                      `${btl.vintage} ${btl.wine.producer} ${btl.wine.wineName}`
                    )
                  }
                >
                  Consume
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() =>
                    deleteModal(
                      btl.id,
                      `${btl.vintage} ${btl.wine.producer} ${btl.wine.wineName}`
                    )
                  }
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => addBottleModal(btl)}>
                  Add
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => editBottleModal(btl)}>
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ConsumeBottleModal
            isOpen={openConsumeModal}
            onClose={() => setOpenConsumeModal(false)}
            // onConfirm={onContinue}
            title={bottleDetails}
            bId={bId}
          />

          <DeleteBottleModal
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            // onConfirm={onContinue}
            title={bottleDetails}
            bId={bId}
          />

          <AddBottleModal
            isOpen={openAddModal}
            onClose={() => setOpenAddModal(false)}
            btl={bott}
          />

          <EditBottleModal
            isOpen={openEditModal}
            onClose={() => setOpenEditModal(false)}
            btl={bott}
          />
        </Dialog>
      );
    },
  },
];
