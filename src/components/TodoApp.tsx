import React from 'react';
import { TaskInput } from './TaskInput';
import { TaskFilters } from './TaskFilters';
import { TaskStats } from './TaskStats';
import { TaskItem } from './TaskItem';
import { useTasks } from '@/hooks/useTasks';
import { Card } from '@/components/ui/card';
import { ListTodo, Sparkles } from 'lucide-react';

export function TodoApp() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTaskComplete,
    updateTask,
    deleteTask,
    taskCounts,
    taskStats,
  } = useTasks();

  const getEmptyStateContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: Sparkles,
          title: "All caught up!",
          description: "No active tasks remaining. Great job staying on top of things!"
        };
      case 'completed':
        return {
          icon: ListTodo,
          title: "No completed tasks yet",
          description: "Complete some tasks to see them here."
        };
      default:
        return {
          icon: ListTodo,
          title: "Ready to get productive?",
          description: "Add your first task above to get started with your to-do list."
        };
    }
  };

  const emptyState = getEmptyStateContent();
  const EmptyIcon = emptyState.icon;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow">
              <ListTodo className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Todo List
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay organized and boost your productivity with our beautiful task management system.
          </p>
        </div>

        <div className="space-y-6">
          {/* Task Input */}
          <TaskInput onAddTask={addTask} />

          {/* Stats Overview */}
          {taskStats.totalTasks > 0 && (
            <TaskStats
              totalTasks={taskStats.totalTasks}
              completedTasks={taskStats.completedTasks}
              activeTasks={taskStats.activeTasks}
            />
          )}

          {/* Task Filters */}
          {taskStats.totalTasks > 0 && (
            <TaskFilters
              activeFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
          )}

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <Card className="p-12 text-center bg-gradient-card shadow-medium">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-muted rounded-full">
                    <EmptyIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {emptyState.title}
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      {emptyState.description}
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-slide-up"
                >
                  <TaskItem
                    task={task}
                    onToggleComplete={toggleTaskComplete}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                  />
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {taskStats.totalTasks > 0 && (
            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground">
                Keep up the great work! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}