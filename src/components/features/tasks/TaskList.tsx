import Task from "@/components/features/tasks/Task";
import { ITask } from "@/App";
import {
    DndContext, DragEndEvent, DragStartEvent, useSensor, KeyboardSensor, MouseSensor, TouchSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type TaskListProps = {
    tasks: Array<ITask>;
    onToggle?: (id: string) => void;
    onTaskAdd?: (value: string) => void;
    onChange?: (id: string, value: string) => void;
    onDelete?: (id: string) => void;
    onDragStart?: (id: string) => void;
    onDragEnd?: (id: string, overId?: string) => void;
};

const TaskList = ({ tasks, onToggle, onTaskAdd, onChange, onDelete, onDragStart, onDragEnd }: Readonly<TaskListProps>) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const { toast } = useToast();

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
    );

    console.log("TASK_LIST_RENDER");


    const handleAddTask = () => {
        if (!inputValue.trim()) {
            toast({
                title: "Task has no value",
                description: "Please, provide the text value"
            });

            return;
        }

        onTaskAdd?.(inputValue);
        setInputValue('');
    };

    const handleDragEnd = (e: DragEndEvent) => {
        onDragEnd?.(String(e.active.id), e.over ? String(e.over.id) : undefined);

        setActiveId(null);
    };

    const handleDragStart = (e: DragStartEvent) => {
        onDragStart?.(String(e.active.id));

        setActiveId(String(e.active.id));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const memoizedTasks = useMemo(() => (
        tasks.map((task) => (
            <Task
                key={task.id}
                task={task}
                active={activeId === task.id}
                onToggle={onToggle}
                onChange={onChange}
                onDelete={onDelete}
            />
        ))
    ), [tasks, activeId, onToggle, onChange, onDelete]);

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 border border-border rounded-md p-4 mb-4">
                <Input type="text" value={inputValue} className="h-8" onChange={handleInputChange} />
                <Button size="sm" className="h-8" onClick={handleAddTask}>Add Task</Button>
            </div>

            <ul>
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]} sensors={sensors}>
                    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                        {memoizedTasks}
                    </SortableContext>
                </DndContext>
            </ul>
        </div>
    );
};

export default TaskList;