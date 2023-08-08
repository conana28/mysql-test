"use client";

import React, { FC } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  params: { slug: string };
}

const showParams: FC<Props> = ({ params }) => {
  const searchParams = useSearchParams();

  // extract the wine and vintage from the search params
  const wine = searchParams.get("wine");
  const vintage = searchParams.get("vintage");
  console.log(wine, vintage);

  const pp = Array.from(searchParams.entries());
  console.log("Input params", pp);
  // Display the key/value pairs
  for (const [key, value] of Array.from(searchParams.entries())) {
    console.log(`${key}, ${value}`);
  }

  return (
    <div>
      Params
      {pp.map((p) => (
        <div key={p[0]}>
          {p[0]} {p[1]}
        </div>
      ))}
    </div>
  );
};

export default showParams;
