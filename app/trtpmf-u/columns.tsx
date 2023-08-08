"use client";

import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { WineData } from "./data-table";
import Delete from "./delete";
import EditFormDialog from "./editFormDialog";
import ShowBottleDialog from "./showBottlesDialog";
import Test from "./test";
import { Badge } from "@/components/ui/badge";
import { FormModal } from "@/components/modals/form-modal";
import { ShowBottlesModal } from "@/components/modals/show-bottles-modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<WineData>[] = [
  {
    accessorKey: "Bottle",
    header: () => <div className="text-center">Btls</div>,
    cell: (props) => {
      const [showBottle, setShowBottle] = useState(true);
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const toggleBottle = () => {
        // setShowBottle(!showBottle);
        setOpen(!open);
      };

      const onContinue = () => {
        console.log("first");
        setOpen(false);
      };

      return (
        <div style={{ textAlign: "center" }}>
          {props.row.original.bottle.length > 0 && (
            <Badge onClick={toggleBottle}>
              {props.row.original.bottle.length}
            </Badge>
          )}
          {/* <button onClick={toggleBottle}>Show Bottle</button> */}
          {showBottle && (
            // props.row.original.Bottle.map((bottle, index) => (
            // <div key={index}>
            //   {bottle && bottle.rack ? bottle.rack : "N/A"}/
            //   {bottle && bottle.shelf ? bottle.shelf : "N/A"}
            // </div>

            // ))
            // <Dialog open={showBottle}>
            //   <ShowBottleDialog setShowBottle={setShowBottle} />
            // </Dialog>

            <ShowBottlesModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={onContinue}
              loading={loading}
              title={
                props.row.original.producer + " " + props.row.original.wineName
              }
              bottles={props.row.original.bottle}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "producer",
    header: "Producer",
  },
  {
    accessorKey: "wineName",
    header: "Wine Name",
  },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "region", header: "Region" },
  { accessorKey: "subRegion", header: "Sub Region" },
  {
    accessorKey: "type",
    header: () => <div className="text-center">Type</div>,
    cell: (props) => {
      const router = useRouter();
      const goToBottles = () => {
        router.push(`/bottle/${props.row.original.id}`);
      };

      return (
        <div style={{ textAlign: "center" }}>
          {props.row.original.bottle.length > 0 && (
            <Badge onClick={goToBottles}>
              {props.row.original.bottle.length}
            </Badge>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "Botttle",
  //   header: () => <div className="text-center">Btls</div>,
  //   cell: (props) => (
  //     <div
  //       style={{ textAlign: "center" }}
  //     >{`${props.row.original.Bottle.length}`}</div>
  //   ),
  // },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const wine = row.original;
      // const rid = row.id  // array index of row
      const [whichDialog, setWhichDialog] = useState<
        "edit" | "delete" | "view" | ""
      >("");
      const [rowDetails, setRowDetails] = useState({});
      const [open, setOpen] = useState(false);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="float-right mr-2 h-8 w-8 p-0">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setRowDetails(wine);
                    setWhichDialog("edit");
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setWhichDialog("delete")}>
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setWhichDialog("view")}>
                  View wine details
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  // onClick={() => navigator.clipboard.writeText(payment.id)}
                  onClick={() => setWhichDialog("")}
                >
                  Clip
                </DropdownMenuItem>
              </DialogTrigger>
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>

          {whichDialog === "edit" && (
            <EditFormDialog
              title="abc"
              data={wine}
              setWhichDialog={setWhichDialog}
            />
          )}
          {whichDialog === "delete" && <Delete closeD={setOpen} />}
          {whichDialog === "view" && <Test closeD={setOpen} />}
        </Dialog>
      );
    },
  },
];
