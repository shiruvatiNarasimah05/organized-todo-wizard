import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Target } from 'lucide-react';

interface TaskStatsProps {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
}

export function TaskStats({ totalTasks, completedTasks, activeTasks }: TaskStatsProps) {
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-card shadow-medium">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Progress Overview</h2>
          <Badge 
            variant="secondary" 
            className="bg-primary/10 text-primary font-medium"
          >
            {Math.round(completionPercentage)}% Complete
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion Progress</span>
            <span className="font-medium text-foreground">
              {completedTasks} of {totalTasks} tasks
            </span>
          </div>
          <Progress 
            value={completionPercentage} 
            className="h-2 bg-muted"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-foreground">{totalTasks}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div className="text-xl font-bold text-foreground">{activeTasks}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div className="text-xl font-bold text-foreground">{completedTasks}</div>
            <div className="text-xs text-muted-foreground">Done</div>
          </div>
        </div>
      </div>
    </Card>
  );
}