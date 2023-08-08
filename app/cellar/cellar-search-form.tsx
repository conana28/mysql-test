"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bottle } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Search, SearchX } from "lucide-react";
import { Bottle1 } from "./page";
// import { useBtlsContext } from "@/context/BtlsContext";
import { useGlobalContext } from "@/context/store";

const cellarSearchFormSchema = z.object({
  wineDetails: z.string().default("").optional(),
  vintage: z.coerce.number().int().nonnegative().optional(),
  rack: z.string().default("").optional(),
  shelf: z.string().default("").optional(),
  bottleId: z.coerce.number().int().nonnegative().optional(),
  wineId: z.coerce.number().int().nonnegative().optional(),
  showConsumed: z.boolean().default(false).optional(),
});

type CellarSearchFormValues = z.infer<typeof cellarSearchFormSchema>;

const defaultValues: Partial<CellarSearchFormValues> = {
  wineDetails: "",
  vintage: undefined,
  rack: "",
  shelf: "",
  bottleId: undefined,
  wineId: undefined,
  showConsumed: false,
};

interface CellarSearchFormProps {
  // setShowBtls: React.Dispatch<React.SetStateAction<boolean>>;
  // setSearch: React.Dispatch<React.SetStateAction<Bottle1[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

// const cellarSearchForm = ({ setBtls }: CellarSearchFormProps) => {
const cellarSearchForm = ({ setSearch }: CellarSearchFormProps) => {
  const { showBtls, setShowBtls } = useGlobalContext();

  // useEffect(() => {
  //   form.reset(defaultValues);
  // }, [showBtls]);

  const form = useForm<z.infer<typeof cellarSearchFormSchema>>({
    resolver: zodResolver(cellarSearchFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof cellarSearchFormSchema>) => {
    console.log(data);

    let searchUrl = "";
    if (data.wineDetails) {
      searchUrl += `name=${data.wineDetails}`;
    }
    if (data.vintage) {
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}vint=${data.vintage}`;
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
      searchUrl += `${searchUrl.length > 1 ? "/" : ""}consume=${
        data.showConsumed
      }`;
    }

    if (searchUrl.length === 0) {
      searchUrl = "a=a";
    }

    console.log("Search URL", searchUrl);

    setSearch(searchUrl);

    // const res = await fetch("api/bottle/" + searchUrl);
    // const btls = await res.json();

    setShowBtls(true); // update the global context.
    // setBtls(btls);
  };

  return (
    <>
      <Card className={`${showBtls ? "opacity-80" : ""} mt-2 mx-2`}>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row justify-between">
              <span>Cellar Search </span>
              <Button
                size="xs"
                className="-mt-1 h-6 w-6"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  form.reset(defaultValues);
                  setShowBtls(false);
                }}
              >
                <SearchX />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="space-y-4">
                  <div className="flex flex-row sm:flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="wineDetails"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Name</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Wine name"
                              disabled={showBtls}
                              {...field}
                            />
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
                              disabled={showBtls}
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
                      name="rack"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Rack"
                              disabled={showBtls}
                              {...field}
                            />
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
                              disabled={showBtls}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="flex flex-row gap-2"> */}
                  <div className="hidden sm:flex flex-row gap-2">
                    <FormField
                      control={form.control}
                      name="bottleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Bottle id"
                              type="number"
                              disabled={showBtls}
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
                              disabled={showBtls}
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
                            disabled={showBtls}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mx-auto flex flex-row items-center justify-around">
                <Button
                  size="xs"
                  type="submit"
                  variant="ghost"
                  disabled={showBtls}
                >
                  <Search className="" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default cellarSearchForm;
