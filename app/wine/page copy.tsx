"use client";

import { useEffect, useState } from "react";
import { Decimal } from "@prisma/client/runtime/library";

import CellarDisplay from "@/app/cellar/cellar-display";
import CellarSearchForm from "@/app/cellar/cellar-search-form";
import { useGlobalContext } from "@/context/store";
// import CellarDisplayMobile from "./cellar-display-mobile";
import WineSearchForm from "./wine-search-form";
import { Bottle } from "@prisma/client";
import WineDisplay from "./wine-display";

export type WineData = {
  id: number;
  producer: string;
  wineName: string;
  country: string;
  region: string;
  type: string;
  bottle: Array<Bottle | "">;
};

const wine = () => {
  const { showWines, setShowWines } = useGlobalContext(); // Controls whether CellarDisplay is shown.
  const [wines, setWines] = useState<WineData[]>([]); // The array of bottles to be displayed.
  const [search, setSearch] = useState<string>(""); // Search string.
  const [pageCount, setPageCount] = useState(0);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { userId } = useGlobalContext(); // togle to force refresh of data

  useEffect(() => {
    const fetchData = async () => {
      console.log("UseEffect: ", search);
      const response = await fetch(
        `/api/wine/${pageIndex}/${pageSize}/${search}`
      );
      const data = await response.json();
      console.log(data.pageCount, data.rows);
      setWines(data.rows);
      setPageCount(data.pageCount);
      // if (data.rows.length > 0) {
      setShowWines(true); // update the global context
      // }
    };
    setShowWines(false); // update the global context
    if (search.length > 0) {
      fetchData();
    }
  }, [search, userId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile View */}
      <div className="sm:hidden">
        {/* show the cellar search form and return the search string to setSearch */}
        <WineSearchForm setSearch={setSearch} />
        {/* show the cellar display if showBtls (useContext) is true */}
        {/* {showBtls && <CellarDisplayMobile btls={btls1} />} */}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex flex-1">
        <div className="w-1/4">
          <WineSearchForm setSearch={setSearch} />
        </div>

        <div className="w-3/4">
          {/* show the cellar display if showBtls (useContext) is true */}
          {showWines && <WineDisplay wines={wines} />}
        </div>
      </div>
    </div>
  );
};

export default wine;
