// "use client";

import React, { FC } from "react";
// import { useParams } from "next/navigation";

interface Props {
  params: { id: string };
}

const showBottles: FC<Props> = ({ params }) => {
  // const params = useParams();
  const { id } = params;
  return <div>Bottles for wine id {id}</div>;
};

export default showBottles;
