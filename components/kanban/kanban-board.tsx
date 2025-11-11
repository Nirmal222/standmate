"use client";

import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState, ChangeEvent, FormEvent, useMemo } from "react";
import { initialBoard } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface CardData {
  id: string;
  title: string;
  content: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
}

interface ColumnData {
  id: string;
  title: string;
  cards: CardData[];
}

export function KanbanBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [groupBy, setGroupBy] = useState('status');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [cardSize, setCardSize] = useState('medium');
  const [showContent, setShowContent] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  const columns: ColumnData[] = useMemo(() => {
    if (groupBy === 'status') {
      return board.columns.map(col => ({
        ...col,
        cards: board.cards.filter(card => card.status === col.id)
      }));
    } else {
      const priorities = ['low', 'medium', 'high'];
      return priorities.map(priority => ({
        id: priority,
        title: priority.charAt(0).toUpperCase() + priority.slice(1),
        cards: board.cards.filter(card => card.priority === priority)
      }));
    }
  }, [board, groupBy]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId, type } = result;

    if (type === 'COLUMN') {
      const newColumnOrder = Array.from(columns);
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed);
      // This is a visual change only, the actual board.columns order is not changed
      // to prevent re-ordering when switching between grouping modes.
      // A more persistent solution would require updating the board state.
      return;
    }

    const newCards = Array.from(board.cards);
    const movedCard = newCards.find(c => c.id === draggableId);

    if (!movedCard) return;

    if (groupBy === 'status') {
      movedCard.status = destination.droppableId;
    } else {
      movedCard.priority = destination.droppableId as 'low' | 'medium' | 'high';
    }

    const cardIndex = newCards.findIndex(c => c.id === draggableId);
    newCards.splice(cardIndex, 1);

    const destinationCards = newCards.filter(c => (groupBy === 'status' ? c.status : c.priority) === destination.droppableId);
    const destinationIndex = destination.index > destinationCards.length ? destinationCards.length : destination.index;

    let targetIndex = 0;
    if (destinationCards.length > 0) {
      const cardAtDestination = destinationCards[destinationIndex];
      if (cardAtDestination) {
        targetIndex = newCards.findIndex(c => c.id === cardAtDestination.id);
      } else {
        const lastCardInColumn = destinationCards[destinationCards.length - 1];
        targetIndex = newCards.findIndex(c => c.id === lastCardInColumn.id) + 1;
      }
    } else {
      // Find the index of the first card of the next column
      const columnIndex = columns.findIndex(c => c.id === destination.droppableId);
      const nextColumn = columns[columnIndex + 1];
      if (nextColumn) {
        const firstCardOfNextColumn = board.cards.find(c => (groupBy === 'status' ? c.status : c.priority) === nextColumn.id);
        if (firstCardOfNextColumn) {
          targetIndex = newCards.findIndex(c => c.id === firstCardOfNextColumn.id);
        } else {
          targetIndex = newCards.length;
        }
      } else {
        targetIndex = newCards.length;
      }
    }

    newCards.splice(targetIndex, 0, movedCard);

    setBoard({ ...board, cards: newCards });
  };

  const handleAddTask = (columnId: string, task: Omit<CardData, 'id' | 'status' | 'priority'> & { priority: 'low' | 'medium' | 'high' }) => {
    const newCard: CardData = {
      ...task,
      id: `task-${Date.now()}`,
      status: groupBy === 'status' ? columnId : 'todo',
      priority: groupBy === 'priority' ? columnId as 'low' | 'medium' | 'high' : task.priority,
    };
    setBoard({ ...board, cards: [...board.cards, newCard] });
    setIsDialogOpen(false);
    setEditingColumn(null);
  };

  const handleEditTask = (columnId: string, taskId: string, updatedTask: Partial<Omit<CardData, 'id'>>) => {
    const newCards = board.cards.map((card) =>
      card.id === taskId ? { ...card, ...updatedTask } : card
    );
    setBoard({ ...board, cards: newCards });
    setEditingCard(null);
    setEditingColumn(null);
    setIsDialogOpen(false);
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    const newCards = board.cards.filter((card) => card.id !== taskId);
    setBoard({ ...board, cards: newCards });
  };

  const toggleColumnVisibility = (columnId: string) => {
    setHiddenColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  return (
    <div>
      <div className="p-4 flex space-x-4 items-center">
        <div>
          <Label>Group by</Label>
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Card size</Label>
          <Select value={cardSize} onValueChange={setCardSize}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Card size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="show-content" checked={showContent} onCheckedChange={setShowContent} />
          <Label htmlFor="show-content">Show content</Label>
        </div>
        <div>
          <Button onClick={() => setHiddenColumns([])}>Show all columns</Button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex space-x-4 p-4"
            >
              {columns.map((column, index) => (
                !hiddenColumns.includes(column.id) && (
                  <Draggable key={column.id} draggableId={column.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Droppable key={column.id} droppableId={column.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="w-80"
                            >
                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                  <div className="flex items-center">
                                    <CardTitle>{column.title}</CardTitle>
                                    <Badge className="ml-2">{column.cards.length}</Badge>
                                  </div>
                                  <div className="flex items-center">
                                    <Button variant="ghost" size="sm" onClick={() => toggleColumnVisibility(column.id)}>Hide</Button>
                                    <Dialog
                                      open={isDialogOpen && editingColumn === column.id && !editingCard}
                                      onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            setEditingColumn(null);
                          }
                          setIsDialogOpen(isOpen);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditingColumn(column.id);
                              setIsDialogOpen(true);
                            }}
                                    >
                                      +
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Add Task</DialogTitle>
                                    </DialogHeader>
                                    <TaskForm
                                      onSubmit={(task) => handleAddTask(column.id, task)}
                                    />
                                  </DialogContent>
                                </Dialog>
                               </div>
                              </CardHeader>
                              <CardContent>
                                {column.cards.map((card, index) => (
                                  <Draggable
                                    key={card.id}
                                    draggableId={card.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-4"
                                      >
                                        <Card>
                                          <CardContent className={`p-4 ${cardSize === 'small' ? 'text-sm' : ''} ${cardSize === 'large' ? 'text-lg' : ''}`}>
                                            <div className="flex justify-between items-start">
                                              <div className="flex flex-col">
                                                <span>{card.title}</span>
                                                {showContent && <p className="text-sm text-gray-500">{card.content}</p>}
                                              </div>
                                              <div className="flex space-x-2">
                                                <Dialog
                                                  open={
                                                    isDialogOpen &&
                                                    editingCard?.id === card.id &&
                                                    editingColumn === column.id
                                                  }
                                                  onOpenChange={(isOpen) => {
                                                    if (!isOpen) {
                                                      setEditingCard(null);
                                                      setEditingColumn(null);
                                                    }
                                                    setIsDialogOpen(isOpen);
                                                  }}
                                                >
                                                  <DialogTrigger asChild>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() => {
                                                        setEditingCard(card);
                                                        setEditingColumn(column.id);
                                                        setIsDialogOpen(true);
                                                      }}
                                                    >
                                                      Edit
                                                    </Button>
                                                  </DialogTrigger>
                                                  <DialogContent>
                                                    <DialogHeader>
                                                      <DialogTitle>Edit Task</DialogTitle>
                                                    </DialogHeader>
                                                    <TaskForm
                                                      task={card}
                                                      onSubmit={(updatedTask) =>
                                                        handleEditTask(
                                                          column.id,
                                                          card.id,
                                                          updatedTask
                                                        )
                                                      }
                                                    />
                                                  </DialogContent>
                                                </Dialog>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() =>
                                                    handleDeleteTask(column.id, card.id)
                                                  }
                                                >
                                                  Delete
                                                </Button>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Droppable>
                      </div>
                    )}
                  </Draggable>
                )
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

interface TaskFormProps {
  onSubmit: (task: Omit<CardData, 'id' | 'status'>) => void;
  task?: CardData;
}

function TaskForm({ onSubmit, task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [content, setContent] = useState(task?.content || "");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority || 'low');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
      />
      <Select value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}>
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Save</Button>
    </form>
  );
}
