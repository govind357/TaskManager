import { NextResponse } from "next/server";
import Task from "@/lib/taskModel";
import { connectDB } from "@/lib/db";


export async function DELETE(request: Request, context:{ params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; 

    await connectDB();

    const deletedTask = await Task.findByIdAndDelete(id);


    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    
  }
}

export async function PUT(request: Request,  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const { title, description, completed } = await request.json();
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

 
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
}

