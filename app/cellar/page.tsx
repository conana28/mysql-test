"use client";

import { useEffect, useState } from "react";
import { Decimal } from "@prisma/client/runtime/library";

import CellarDisplay from "@/app/cellar/cellar-display";
import CellarSearchForm from "@/app/cellar/cellar-search-form";
import { useGlobalContext } from "@/context/store";
import CellarDisplayMobile from "./cellar-display-mobile";

export type Bottle1 = {
  id: number;
  vintage: number;
  rack: string;
  shelf: string | null;
  cost: Decimal | null;
  consume: Date | null;
  occasion: string | null;
  createdAt: Date;
  updatedAt: Date;
  wineId: number;
  wine: {
    id: number;
    producer: string;
    wineName: string;
  };
};

const page = () => {
  const { showBtls } = useGlobalContext(); // Controls whether CellarDisplay is shown.
  const [btls, setBtls] = useState<Bottle1[]>([]); // The array of bottles to be displayed.
  const [btls1, setBtls1] = useState<Bottle1[]>([]); // The array of bottles to be displayed.
  const [search, setSearch] = useState<string>(""); // Search string.

  const { userId } = useGlobalContext(); // togle to force refresh of data

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/bottle/${search}`);
      const data = await res.json();
      console.log("Fetch Data", data);
      setBtls1(data);
    };

    if (search.length > 0) {
      fetchData();
    }
  }, [search, userId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* The min-h-screen class makes sure that the page has at least the height of the viewport.
    The flex class with flex-col makes sure that the components are stacked vertically on mobile view and horizontally on desktop view.
    The sm:hidden class hides the components on small screens, making them visible only on xs screens.
    The hidden sm:flex class hides the components on xs screens and shows them as a flex container on sm and above screens.
    The flex-1 class ensures that the flex container takes up the remaining space on the page. */}

      {/* Mobile View */}
      <div className="sm:hidden">
        {/* show the cellar search form and return the search string to setSearch */}
        <CellarSearchForm setSearch={setSearch} />
        {/* show the cellar display if showBtls (useContext) is true */}
        {showBtls && <CellarDisplayMobile btls={btls1} />}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex flex-1">
        <div className="w-1/4">
          <CellarSearchForm setSearch={setSearch} />
        </div>

        <div className="w-3/4">
          {/* show the cellar display if showBtls (useContext) is true */}
          {showBtls && <CellarDisplay btls={btls1} />}
        </div>
      </div>
    </div>
  );
};

export default page;
