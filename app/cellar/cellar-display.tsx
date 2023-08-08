import React from "react";

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
import { ConsumeBottleModal } from "@/components/modals/consume-bottle-modal";

interface CellarDisplayProps {
  btls: Bottle1[];
}

const cellarDisplay = ({ btls }: CellarDisplayProps) => {
  // console.log(btls);
  const { showBtls, setShowBtls } = useGlobalContext();

  return (
    <Card className="mt-2 mr-2 ml-2 sm:ml-0">
      <ScrollArea className="h-[300px] xl:h-[500px]">
        <DataTable columns={columns} data={btls} />
      </ScrollArea>

      <Button onClick={() => setShowBtls(false)}>Hide</Button>
    </Card>
  );
};

export default cellarDisplay;
