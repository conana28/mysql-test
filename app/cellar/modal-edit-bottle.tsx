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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  btl: any;
}

export const EditBottleModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  btl,
}) => {
  const editFormSchema = z.object({
    vintage: z.coerce.number().gt(1900).lt(2030),
    rack: z.string().min(2),
    shelf: z.string(),
    cost: z.coerce.number().optional(),
  });

  type EditFormValues = z.infer<typeof editFormSchema>;

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      vintage: btl.vintage,
      rack: btl.rack,
      shelf: btl.shelf,
      cost: btl.cost || undefined,
    },
  });

  const cancelHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Cancel ..");
    event.preventDefault();
    onClose(); // function to close dialog
  };

  const { userId, setUserId } = useGlobalContext();

  async function onSubmit(data: EditFormValues) {
    console.log("Edit Submit ", data);
    try {
      await axios.patch(`/api/bottle/${btl.id}`, {
        vintage: data.vintage,
        rack: data.rack,
        shelf: data.shelf,
        cost: data.cost,
      });
      toast({
        description: "Bottle Updated.",
      });
    } catch (error) {
      console.error(error);
    }

    setUserId(!userId);
    onClose();
  }

  return (
    <>
      <Modal
        title="Edit Bottle"
        description="Description"
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
                </div>
                <div className="pt-6 flex items-center justify-end space-x-2">
                  <Button variant="outline" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button variant="destructive" type="submit">
                    Edit
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
