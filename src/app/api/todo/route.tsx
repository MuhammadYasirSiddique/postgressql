import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

import React from "react";

export async function GET(request: NextRequest) {
  const client = await db.connect();

  try {
    await client.sql`CREATE TABLE Todos (id serail, varchar(255));`;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "somthing went wrong" });
  }
  return NextResponse.json({ message: "You Called this API" });
}

// export async function GET(request: NextRequest) {
//   const client = await db.connect();

//   try {
//     await client.sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
//     const names = ["Fiona", "Lucy"];
//     await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
//   } catch (error) {
//     return NextResponse.json(
//       { error },
//       {
//         status: 500,
//       }
//     );
//   }

//   const pets = await client.sql`SELECT * FROM Pets;`;
//   return NextResponse.json({ pets });
// }
