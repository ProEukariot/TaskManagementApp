import SortableItem from "./SortableItem";
import Task from "./Task";
import { Task as ITask } from "./TaskBoard";
import { DndContext, DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { cn } from "@/lib/utils";
import { useState } from "react";

type TaskListProps = {
    tasks: Array<ITask>;
    onToggle: (id: string) => void;
    onChange: (id: string, value: string) => void;
    onDelete: (id: string) => void;
    onDragStart?: (id: string) => void;
    onDragEnd?: (id: string, overId?: string) => void;
};

const TaskList = ({ tasks, onToggle, onChange, onDelete, onDragStart, onDragEnd }: TaskListProps) => {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const handleDragEnd = (e: DragEndEvent) => {
        onDragEnd?.(String(e.active.id), e.over ? String(e.over.id) : undefined);

        setActiveId(null);
    };

    const handleDragStart = (e: DragStartEvent) => {
        onDragStart?.(String(e.active.id));

        setActiveId(e.active.id);
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {
                    tasks.map(({ id, title, done }) => (
                        <SortableItem key={id} id={id} className={cn('relative border border-border rounded-md bg-background p-4', { 'z-50': activeId == id })}>
                            <Task
                                id={id}
                                title={title}
                                done={done}
                                onToggle={onToggle}
                                onChange={onChange}
                                onDelete={onDelete}>
                            </Task>
                        </SortableItem >
                    ))
                }
            </SortableContext>
        </DndContext>
    );
};

export default TaskList;