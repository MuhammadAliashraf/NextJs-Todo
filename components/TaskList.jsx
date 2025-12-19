import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <ClipboardList className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            You don&apos;t have any tasks yet. Create one above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          id={task._id}
          title={task.title}
          description={task.description}
          completed={task.isCompleted}
          date={task.createdAt}
        />
      ))}
    </div>
  );
};

export default TaskList;
