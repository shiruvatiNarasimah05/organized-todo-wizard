import { useState, useCallback, useMemo } from 'react';
import type { Task, Priority, TaskFilter } from '@/types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');

  const addTask = useCallback((title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const toggleTaskComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined
          }
        : task
    ));
  }, []);

  const updateTask = useCallback((id: string, title: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, title } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  }), [tasks]);

  const taskStats = useMemo(() => ({
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    activeTasks: tasks.filter(task => !task.completed).length,
  }), [tasks]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTaskComplete,
    updateTask,
    deleteTask,
    taskCounts,
    taskStats,
  };
}