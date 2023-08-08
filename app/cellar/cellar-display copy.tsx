import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Bottle } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Bottle1 } from "./page";

interface CellarDisplayProps {
  setShowBtls: React.Dispatch<React.SetStateAction<boolean>>;
  btls: Bottle1[];
}

const cellarDisplay = ({ btls, setShowBtls }: CellarDisplayProps) => {
  console.log(btls);

  return (
    <Card className="mt-4 mx-4">
      <ScrollArea className="h-[300px]">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Rack</TableHead>
              <TableHead>Shelf</TableHead>
              <TableHead className="text-right">vintage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {btls.map((btl) => (
              <TableRow key={btl.id}>
                <TableCell className="font-medium">{btl.id}</TableCell>
                <TableCell>{btl.rack}</TableCell>
                <TableCell>{btl.shelf}</TableCell>
                <TableCell className="text-right">{btl.vintage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Button onClick={() => setShowBtls(false)}>Hide</Button>
    </Card>
  );
};

export default cellarDisplay;
