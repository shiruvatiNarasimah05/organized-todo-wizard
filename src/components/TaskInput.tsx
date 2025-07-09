import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import type { Priority } from '@/types/task';

interface TaskInputProps {
  onAddTask: (title: string, priority: Priority) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-medium">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 h-12 text-base bg-background border-border focus:ring-primary focus:border-primary transition-smooth"
        />
        
        <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
          <SelectTrigger className="w-full sm:w-32 h-12 bg-background border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-priority-low"></div>
                Low
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-priority-medium"></div>
                Medium
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-priority-high"></div>
                High
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Button 
          type="submit" 
          className="h-12 px-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
          disabled={!title.trim()}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Button>
      </form>
    </Card>
  );
}