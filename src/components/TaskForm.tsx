import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

type TaskFormProps = {
    onTaskAdd?: (value: string) => void;
};

const TaskForm = ({ onTaskAdd }: TaskFormProps) => {
    const [inputValue, setInputValue] = useState('');
    const { toast } = useToast();

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    return (
        <div className="flex items-center gap-2 border border-border rounded-md p-4">
            <Input type="text" value={inputValue} className="h-8" onChange={handleInputChange} />
            <Button size="sm" className="h-8" onClick={handleAddTask}>Add Task</Button>
        </div>
    );
};

export default TaskForm;