import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent, useState } from "react";
import { Pencil, X, Check, Trash, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ITask } from "@/App";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { cn } from "@/lib/utils";

type TaskProps = {
    task: ITask;
    active?: boolean
    onChange?: (id: string, value: string) => void;
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
};

const Task = ({ task, active, onChange, onToggle, onDelete }: Readonly<TaskProps>) => {
    const { id, title, done = false } = task;

    console.log("TASK_RENDER");


    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const handleOnEditStart = () => setIsEditing(true);

    const handleCancelChanges = () => {
        setIsEditing(false);
        setEditedTitle(title);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value);

    const handleSaveChanges = () => {
        setIsEditing(false);

        onChange?.(id, editedTitle);
    };

    const handleToggle = () => onToggle?.(id);

    const handleDelete = () => onDelete?.(id);

    return (
        <div ref={setNodeRef} style={style} className={cn("flex relative border border-border rounded-md bg-background p-4", { 'z-50': active })}>
            <div className="flex items-center flex-nowrap w-full gap-2">
                {
                    isEditing ? (
                        <>
                            <Checkbox id={id} checked={done} className="w-auto h-8 aspect-square" onCheckedChange={handleToggle} />
                            <Input type="text" value={editedTitle} className="h-8 me-2" onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <Checkbox id={id} checked={done} className="w-auto h-8 aspect-square" onCheckedChange={handleToggle} />
                            <Label htmlFor={id} className="h-full p-2 cursor-pointer">{title}</Label>
                        </>
                    )
                }
            </div>

            <div className="flex items-center flex-nowrap gap-2 ms-auto">
                {
                    isEditing ? (
                        <>
                            <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleSaveChanges} >
                                <Check />
                            </Button>

                            <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleCancelChanges} >
                                <X />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleOnEditStart} >
                                <Pencil />
                            </Button>

                            <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleDelete} >
                                <Trash />
                            </Button>
                        </>
                    )
                }

                <Button size='icon' variant="ghost" {...attributes} {...listeners} className='w-auto h-8 aspect-square'>
                    <GripVertical />
                </Button>
            </div>
        </div>
    );

};

export default Task;