import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, todoTable, db } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";

import React from "react";
import { InferModel, eq } from "drizzle-orm";
import { type } from "os";
import { clearScreenDown } from "readline";

export async function GET(request: NextRequest) {
  // const client = await db.connect();

  try {
    await sql`CREATE TABLE IF NOT EXISTS Todos (id serial, Task varchar(255));`;
    const res = await db.select().from(todoTable);

    // console.log(res[0].task);
    return NextResponse.json({ data: res });
  } catch (err) {
    // console.log(err);
    // console.log((err as { message: string }).message);
    return NextResponse.json({ message: "something went wrong" });
  }
}

export async function POST(request: NextRequest) {
  // const client = await db.connect();
  const req = await request.json();

  try {
    if (req.task) {
      const res = await db
        .insert(todoTable)
        .values({
          task: req.task,
        })
        .returning();
      // console.log((await res).rowCount);
      // console.log(res);
      return NextResponse.json({
        message: `New Task '${req.task}' Added`,
      });
    } else throw new Error("Task cannot be blank");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}

export async function PUT(request: NextRequest) {
  const req = await request.json();

  try {
    if (req.id && req.task) {
      const existingTask = await db
        .select()
        .from(todoTable)
        .where(eq(todoTable.id, req.id))
        .limit(1);

      if (existingTask.length === 0) {
        return NextResponse.json({
          message: `No task with ID ${req.id} is found to update`,
        });
      }
    }

    if (req.id && req.task) {
      const res = await db
        .update(todoTable)
        .set({ task: req.task })
        .where(eq(todoTable.id, req.id));
      console.log(res);
      return NextResponse.json({ message: "Task updated" });
    } else {
      throw new Error("Task ID and task content are required");
    }
  } catch (error) {
    // console.log(error as { message: string });
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id || isNaN(parseInt(id, 10))) {
    return NextResponse.json(
      {
        message: "Invalid task ID",
      },
      { status: 400 }
    );
  }
  const numericId = parseInt(id, 10);

  try {
    const existingTask = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, numericId))
      .limit(1);
    // console.log(existingTask);
    if (existingTask.length === 0) {
      return NextResponse.json(
        {
          message: `Task with ID ${numericId} does not exist`,
        },
        { status: 404 }
      );
    }

    await db.delete(todoTable).where(eq(todoTable.id, numericId));
    // console.log(`Task deleted with ID ${numericId}`);
    return NextResponse.json({ message: `Task deleted with ID ${numericId}` });
  } catch (error) {
    // console.log(error as { message: string });
    return NextResponse.json(
      {
        message: (error as { message: string }).message,
      },
      { status: 500 }
    );
  }
}
