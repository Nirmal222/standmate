"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TiptapEditor } from "@/components/editor/tiptap-editor"
import { DateSelector } from "@/components/properties/factory"
import { useCreateMilestoneMutation } from "@/services/milestonesApi"
import { Plus } from "lucide-react"

interface CreateMilestoneModalProps {
    projectId: number;
}

export function CreateMilestoneModal({ projectId }: CreateMilestoneModalProps) {
    const [open, setOpen] = useState(false)
    const [createMilestone, { isLoading }] = useCreateMilestoneMutation()
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        try {
            await createMilestone({
                projectId,
                milestone: {
                    project_id: projectId,
                    title: title.trim(),
                    description: description.trim() || undefined,
                    estimated_start_date: startDate || undefined,
                    estimated_end_date: endDate || undefined,
                }
            }).unwrap()
            
            setOpen(false)
            resetForm()
        } catch (error) {
            console.error("Failed to create milestone:", error)
        }
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setStartDate("")
        setEndDate("")
    }

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            setOpen(newOpen)
            if (!newOpen) resetForm()
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
                    <Plus className="w-3 h-3 mr-1" />
                    Create Milestone
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Milestone</DialogTitle>
                        <DialogDescription>
                            Add a new milestone to track major project phases.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-medium text-muted-foreground">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-8 shadow-none focus-visible:ring-1"
                                placeholder="e.g. Beta Launch"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-medium text-muted-foreground">
                                Description
                            </Label>
                            <div className="border rounded-md px-3 py-2 min-h-[120px] max-h-[300px] overflow-y-auto bg-background focus-within:ring-1 focus-within:ring-ring shadow-none">
                                <TiptapEditor
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    placeholder="Add more details..."
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 flex flex-col">
                                <Label className="text-xs font-medium text-muted-foreground">
                                    Start Date
                                </Label>
                                <DateSelector
                                    value={startDate || undefined}
                                    onChange={(v) => setStartDate(v || "")}
                                    className="w-full justify-start h-8 px-2 bg-background shadow-none focus-visible:ring-1 border border-input"
                                />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <Label className="text-xs font-medium text-muted-foreground">
                                    End Date
                                </Label>
                                <DateSelector
                                    value={endDate || undefined}
                                    onChange={(v) => setEndDate(v || "")}
                                    className="w-full justify-start h-8 px-2 bg-background shadow-none focus-visible:ring-1 border border-input"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading || !title.trim()}>
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
