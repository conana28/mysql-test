"use client"

import React, { useEffect, useState } from "react"

import DataTable from "./data-table"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl text-blue-600">
        Table - ss manual filter pagination with edit/update
      </h1>
      <div className="container mx-auto py-5">
        <DataTable />
      </div>
    </div>
  )
}

export default page
