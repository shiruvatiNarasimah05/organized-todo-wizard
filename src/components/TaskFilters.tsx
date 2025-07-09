import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { List, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TaskFilter } from '@/types/task';

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TaskFilters({ activeFilter, onFilterChange, taskCounts }: TaskFiltersProps) {
  const filters = [
    {
      key: 'all' as TaskFilter,
      label: 'All Tasks',
      icon: List,
      count: taskCounts.all,
      color: 'bg-primary text-primary-foreground'
    },
    {
      key: 'active' as TaskFilter,
      label: 'Active',
      icon: Clock,
      count: taskCounts.active,
      color: 'bg-warning text-warning-foreground'
    },
    {
      key: 'completed' as TaskFilter,
      label: 'Completed',
      icon: CheckCircle2,
      count: taskCounts.completed,
      color: 'bg-success text-success-foreground'
    }
  ];

  return (
    <Card className="p-4 bg-gradient-card shadow-medium">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.key;
          
          return (
            <Button
              key={filter.key}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onFilterChange(filter.key)}
              className={cn(
                "flex items-center gap-2 h-10 px-4 transition-all duration-300",
                isActive 
                  ? "bg-gradient-primary shadow-glow" 
                  : "hover:bg-muted hover:shadow-soft"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{filter.label}</span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-1 min-w-[1.5rem] h-5 text-xs",
                  isActive 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-muted-foreground/20 text-muted-foreground"
                )}
              >
                {filter.count}
              </Badge>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}