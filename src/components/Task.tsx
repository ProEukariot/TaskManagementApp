import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent, MouseEventHandler, ReactNode, useState } from "react";
import { Pencil, X, Check, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type TaskProps = {
    id: string;
    title: string;
    done?: boolean;
    onChange?: (id: string, value: string) => void;
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
};

type TaskLayoutProps = {
    handlers: ReactNode;
    actions: ReactNode;
};

const TaskLayout = ({ handlers, actions }: TaskLayoutProps) => (
    <div className="flex items-center gap-2 border border-border rounded-md bg-background p-4">
        <div className="flex items-center flex-nowrap w-full gap-2">
            {handlers}
        </div>

        <div className="flex items-center flex-nowrap gap-2 ms-auto">
            {actions}
        </div>
    </div>
);

const Task = ({ id, title, done = false, onChange, onToggle, onDelete }: Readonly<TaskProps>) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleOnEditStart = () => setIsEditing(true);

    const handleCancelChanges = () => {
        setIsEditing(false);
        setEditedTitle(title);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEditedTitle(e.target.value);


    const handleSaveChanges = () => {
        setIsEditing(false);

        onChange?.(id, editedTitle);
    };

    const handleCheck = () => onToggle?.(id);

    const handleDelete = () => onDelete?.(id);

    if (isEditing) {
        return (
            <TaskLayout
                handlers={(
                    <>
                        <Checkbox id={id} checked={done} className="w-auto h-8 aspect-square" onCheckedChange={handleCheck} />
                        <Input type="text" value={editedTitle} className="h-8" onChange={handleChange} />
                    </>
                )}
                actions={(
                    <>
                        <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleSaveChanges} >
                            <Check />
                        </Button>

                        <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleCancelChanges} >
                            <X />
                        </Button>
                    </>)}
            />
        );
    }

    return (
        <TaskLayout
            handlers={(
                <>
                    <Checkbox id={id} checked={done} className="w-auto h-8 aspect-square" onCheckedChange={handleCheck} />
                    <Label htmlFor={id} className="h-full p-2 cursor-pointer">{title}</Label>
                </>
            )}
            actions={(
                <>
                    <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleOnEditStart} >
                        <Pencil />
                    </Button>

                    <Button size="icon" className="w-auto h-8 aspect-square" onClick={handleDelete} >
                        <Trash />
                    </Button>
                </>)}
        />
    );
};

export default Task;