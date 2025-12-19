import { NextResponse } from "next/server";
import Task from "@/lib/taskModel";
import { connectDB } from "@/lib/db";


export async function GET() {
  await connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}


export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  const newTask = await Task.create(data);
  return NextResponse.json(newTask, { status: 201 });
}