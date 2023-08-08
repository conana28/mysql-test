"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bottleSearchFormSchema = z.object({
  wineDetails: z.string().default("").optional(),
  vintage: z.coerce
    .number()
    // .gte(1970, { message: "Inalid date.." })
    .int()
    .nonnegative()
    .optional(),
  rack: z.string().default("").optional(),
  shelf: z.string().default("").optional(),
  bottleId: z.coerce.number().int().nonnegative().optional(),
  wineId: z.coerce.number().int().nonnegative().optional(),
  showConsumed: z.boolean().default(false).optional(),
});

type BottleSearchFormValues = z.infer<typeof bottleSearchFormSchema>;

const defaultValues: Partial<BottleSearchFormValues> = {
  wineDetails: "",
  vintage: undefined,
  rack: "",
  shelf: "",
  bottleId: undefined,
  wineId: undefined,
  showConsumed: false,
};

export function BottleSearchForm() {
  const form = useForm<BottleSearchFormValues>({
    resolver: zodResolver(bottleSearchFormSchema),
    defaultValues,
  });

  function onSubmit(data: BottleSearchFormValues) {
    let searchUrl = "";
    if (data.wineDetails) {
      searchUrl += `name=${data.wineDetails}`;
    }
    if (data.vintage) {
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}vintage=${data.vintage}`;
    }
    if (data.rack) {
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}rack=${data.rack}`;
    }
    if (data.shelf) {
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}shelf=${data.shelf}`;
    }
    if (data.wineId) {
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}wId=${data.wineId}`;
    }
    if (data.showConsumed) {
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}consumed=${
        data.showConsumed
      }`;
    }

    // console.log("searchUrl ", searchUrl)
    toast({
      title: "searchUrl :  " + searchUrl,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[350px] mt: m-8">
        <CardHeader>
          <CardTitle>Bottle Search Params</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="wineDetails"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Name</FormLabel> */}
                        <FormControl>
                          <Input placeholder="Wine name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vintage"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Vintage</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="Vintage"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                    This is the name that will be displayed on your profile and
                    in emails.
                  </FormDescription> */}
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
                          <FormControl>
                            <Input placeholder="Rack" {...field} />
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
                          <FormControl>
                            <Input
                              placeholder="Shelf"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <FormField
                      control={form.control}
                      name="bottleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Bottle id"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wineId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Wine id"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="showConsumed"
                    render={({ field }) => (
                      // <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <FormItem className="flex flex-row items-center justify-between ">
                        <div className="space-y-0.5">
                          {/* <FormLabel className="text-base"> */}
                          <span className="text-sm text-slate-300 ml-4">
                            Consumed bottles
                          </span>
                          {/* </FormLabel> */}
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                className="mx-auto flex flex-row items-center"
                size="xs"
                type="submit"
              >
                Search
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
