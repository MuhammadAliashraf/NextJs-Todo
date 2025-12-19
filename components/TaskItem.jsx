'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TodoButton } from '@/components/Clients';
import { cn } from '@/utils/cn';
import { Clock } from 'lucide-react';

const TaskItem = ({ id, title, description, completed, date }) => {
  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-200 hover:shadow-md",
      completed ? "opacity-75 bg-muted/50" : "bg-card"
    )}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn(
            "font-semibold leading-none tracking-tight line-clamp-1",
            completed && "line-through text-muted-foreground"
          )}>
            {title}
          </h3>
          <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors",
             completed 
               ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
               : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          )}>
            {completed ? "Done" : "Pending"}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <p className={cn(
          "text-sm text-muted-foreground line-clamp-3 min-h-[3rem]",
           completed && "italic"
        )}>
          {description || "No description provided."}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t bg-muted/10 mt-auto">
        <div className="flex items-center text-xs text-muted-foreground">
           <Clock className="mr-1 h-3 w-3" />
           <span>Task</span>
        </div>
        <div className="flex items-center">
          <TodoButton id={id} completed={completed} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
