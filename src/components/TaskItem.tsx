import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Edit2, Trash2, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task, Priority } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onUpdateTask, onDeleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdateTask(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const priorityConfig = {
    low: { color: 'bg-priority-low', label: 'Low' },
    medium: { color: 'bg-priority-medium', label: 'Medium' },
    high: { color: 'bg-priority-high', label: 'High' }
  };

  return (
    <Card className={cn(
      "p-4 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up",
      task.completed && "opacity-70"
    )}>
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <div className="relative">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className={cn(
              "w-5 h-5 rounded-full border-2 transition-all duration-300",
              task.completed 
                ? "bg-success border-success data-[state=checked]:bg-success data-[state=checked]:border-success" 
                : "border-border hover:border-primary"
            )}
          />
          {task.completed && (
            <Check className="w-3 h-3 absolute top-1 left-1 text-success-foreground animate-checkmark" />
          )}
        </div>

        {/* Priority indicator */}
        <div className={cn(
          "w-1 h-8 rounded-full flex-shrink-0",
          priorityConfig[task.priority].color
        )} />

        {/* Task content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                className="flex-1 text-base"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                disabled={!editTitle.trim()}
                className="text-success hover:text-success hover:bg-success/10"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "text-base font-medium transition-all duration-300",
                  task.completed 
                    ? "line-through text-muted-foreground" 
                    : "text-foreground"
                )}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {priorityConfig[task.priority].label} priority
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {task.createdAt.toLocaleDateString()}
                  </span>
                  {task.completed && task.completedAt && (
                    <span className="text-xs text-success">
                      • Completed {task.completedAt.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTask(task.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}