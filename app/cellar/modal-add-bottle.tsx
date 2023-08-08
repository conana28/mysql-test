"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useGlobalContext } from "@/context/store";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  btl: any;
}

export const AddBottleModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  btl,
}) => {
  const addFormSchema = z.object({
    vintage: z.coerce.number().gt(1900).lt(2030),
    rack: z.string().min(2),
    shelf: z.string(),
    qty: z.coerce.number().int().gte(1),
    cost: z.coerce.number().optional(),
  });

  type AddFormValues = z.infer<typeof addFormSchema>;

  const form = useForm<AddFormValues>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      vintage: btl.vintage,
      rack: btl.rack,
      shelf: btl.shelf,
      qty: 1,
      cost: btl.cost || undefined,
    },
  });

  const cancelHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Cancel ..");
    event.preventDefault();
    onClose(); // function to close dialog
  };

  const { userId, setUserId } = useGlobalContext();

  async function onSubmit(data: AddFormValues) {
    console.log("Submit ", data);
    // POST /api/bottles

    for (let i = 0; i < data.qty; i++) {
      try {
        await axios.post("/api/bottle", {
          wineId: btl.wine.id,
          vintage: data.vintage,
          rack: data.rack,
          shelf: data.shelf,
          // qty: data.qty,
          cost: data.cost,
        });
        toast({
          description: "Bottle Added.",
        });
      } catch (error) {
        console.error(error);
      }
    }

    setUserId(!userId);
    onClose();
  }

  return (
    <>
      <Modal
        title="Add Bottle"
        description={`${btl.wine.producer}, ${btl.wine.wineName}`}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="vintage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vintage</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="rack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rack</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shelf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shelf</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="qty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qty</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-6 flex items-center justify-end space-x-2">
                  <Button variant="outline" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button variant="destructive" type="submit">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
