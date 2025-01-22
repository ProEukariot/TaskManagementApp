import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';
import { Button } from './ui/button';
import { GripVertical } from 'lucide-react';

type SortableItemProps = {
    id: UniqueIdentifier
    children?: ReactNode
    className?: string;
};

const SortableItem = ({ id, children, className }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className={`flex items-center ${className}`}>
            <div className='flex-1'>
                {children}
            </div>

            <Button size='icon' variant="ghost" {...attributes} {...listeners} className='w-auto h-8 aspect-square ms-2'>
                <GripVertical />
            </Button>
        </div>
    );
}

export default SortableItem