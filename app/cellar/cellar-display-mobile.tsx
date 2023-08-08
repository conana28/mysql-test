import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGlobalContext } from "@/context/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/cellar/columns";
import { Bottle1 } from "@/app/cellar/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { set } from "date-fns";
import { ConsumeBottleModal } from "./modal-consume";
import { DeleteBottleModal } from "./modal-delete";
import { MoreHorizontal } from "lucide-react";

interface CellarDisplayMobileProps {
  btls: Bottle1[];
}

const cellarDisplayMobile = ({ btls }: CellarDisplayMobileProps) => {
  // console.log(btls);
  const { setShowBtls } = useGlobalContext();
  const [openConsumeModal, setOpenConsumeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [bottleDetails, setBottleDetails] = useState("");
  const [bId, setbId] = useState(0);
  // const [loading, setLoading] = useState(false);

  const dispMenu = (bId: number, name: string) => {
    console.log("dispMenu", bId);
    setBottleDetails(name);
  };
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
  const onConsumeContinue = () => {
    console.log("Set Consume date");
    setOpenConsumeModal(false);
  };

  const onDeleteContinue = () => {
    console.log("Delete...");
    setOpenDeleteModal(false);
  };

  if (btls.length === 0) {
    btls[0] = {
      id: 0,
      vintage: 0,
      rack: "",
      shelf: "",
      cost: null,
      consume: null,
      occasion: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      wineId: 0,
      wine: {
        id: 0,
        producer: "No Bottles Match",
        wineName: "",
      },
    };
  }

  return (
    <Card className="mt-2 mr-2 ml-2">
      <ScrollArea className="h-[400px]">
        {btls.map((bottle, index) => (
          <div className="ml-2 p-2 " key={index}>
            {/* <Checkbox id="terms" />
            <label htmlFor="terms" className="ml-2">
              {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}{" "}
              {bottle.rack} / {bottle.shelf}
            </label> */}

            <div className="flex justify-between">
              {/* No bottles mmatch */}
              {bottle.id === 0 && <div>{bottle.wine.producer}</div>}

              {bottle.id > 0 && (
                <>
                  <div
                    onClick={() =>
                      consume(
                        bottle.id,
                        `${bottle.vintage} ${bottle.wine.producer} ${bottle.wine.wineName}`
                      )
                    }
                  >
                    {bottle.vintage} {bottle.wine.producer}{" "}
                    {bottle.wine.wineName}{" "}
                    <div>
                      {bottle.rack} / {bottle.shelf}
                    </div>
                  </div>

                  <span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            dispMenu(
                              bottle.id,
                              `${bottle.vintage} ${bottle.wine.producer} ${bottle.wine.wineName}`
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Move</DropdownMenuItem>
                        <DropdownMenuItem>Add</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            deleteModal(
                              bottle.id,
                              `${bottle.vintage} ${bottle.wine.producer} ${bottle.wine.wineName}`
                            )
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                </>
              )}
            </div>
            <Separator />
          </div>
        ))}
        <ConsumeBottleModal
          isOpen={openConsumeModal}
          onClose={() => setOpenConsumeModal(false)}
          // onConfirm={onConsumeContinue}
          title={bottleDetails}
          bId={bId}
        />
        <DeleteBottleModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          // onConfirm={onDeleteContinue}
          title={bottleDetails}
          bId={bId}
        />
      </ScrollArea>
      <Button onClick={() => setShowBtls(false)}>Mob Hide</Button>
    </Card>
  );
};

export default cellarDisplayMobile;
