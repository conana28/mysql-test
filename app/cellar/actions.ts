'use server'

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

 
export async function searchCellar() {
    console.log("Server action")
 const btls = await prisma.bottle.findMany({
})
console.log(typeof btls)
return btls

}