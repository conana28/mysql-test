"use client";

import { useGlobalContext } from "@/context/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { EditFormProps } from "./editFormDialog";

const FormSchema = z.object({
  id: z.number(),
  producer: z.string().min(2, {
    message: "Producer must be at least 2 characters.",
  }),
  wineName: z.string().min(2, {
    message: "Wine name must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country name must be at least 2 characters.",
  }),
});

const InputReactHookForm = ({ data, setWhichDialog }: EditFormProps) => {
  const { userId, setUserId } = useGlobalContext();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data.id,
      producer: data.producer,
      wineName: data.wineName,
      country: data.country,
    },
  });

  let a = form.watch("producer");
  // console.log("Userame", a)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submit", data);
    const response = await fetch("api/wine", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    console.log("response", response);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setUserId(!userId);
    setWhichDialog("");
  }

  return (
    // <div className="flex flex-col items-center mt-4 min-h-screen">
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 rounded-lg  border border-blue-200  p-5"
        >
          <div>Watch = {a}</div>
          <FormField
            control={form.control}
            name="producer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producer</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn1" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wineName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wine name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button type="submit"> */}
          <Button onClick={() => console.log("A")}>
            <Send size={16} className="mr-2" />
            Sub
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InputReactHookForm;
