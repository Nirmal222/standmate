"use client"

import * as React from "react"
import { Check, ChevronsUpDown, LayoutGrid, Plus, FileSpreadsheet } from "lucide-react"
import { useAppSelector } from "@/lib/redux/hooks"

import { cn } from "@/lib/utils"
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

const JiraIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M11.53 16.221v5.029h-5.03V11.192l5.03 5.029zm0-10.057v5.028H6.495V6.164h5.035zM12.726 1.14v5.024h5.029L12.726 1.14zm0 9.276l5.029 5.03h-5.029V10.416zm5.833-2.678v5.03h5.028V7.738h-5.028z" />
    </svg>
)

const LinearIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 10.7061 19.1729 9.48915 18.5947 8.42398L20.2458 6.77286C21.6429 8.2435 22.5 10.2198 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C13.7802 1.5 15.7565 2.35711 17.2271 3.75424L15.576 5.40532C14.5108 4.82709 13.2939 4.5 12 4.5ZM16.0355 9.03553C16.634 9.63403 16.9645 10.4343 16.9645 11.2809C16.9645 11.2809 16.9645 11.2809 16.9645 11.2809V11.2809C16.9645 11.2809 16.9645 11.2809 16.9645 11.2809C16.9645 11.2809 16.9645 11.2809 16.9645 11.2809V11.2809L16.0355 9.03553Z" />
        <circle cx="15.8" cy="8.2" r="2" />
    </svg>
)

const AsanaIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.9 13.4c-1.3-.2-2.1.8-2.1.8l-4.1 7.1c-.8 1.4-2.5 1.9-4 1.1-1.4-.8-1.9-2.5-1.1-4l4.1-7.1s.7-1 2-1h.2c.4 0 .7.1 1.1.2 1.3.5 2 1.9 1.5 3.2-.3 1.1-1.3 1.9-2.4 1.9-.4 0-.8-.1-1.2-.2l-.6-.2 2.3-3.9s.4-.6 1.4-.6h.1c.3 0 .7.1 1 .2.6.2 1.1.7 1.3 1.3.2.6.2 1.2-.1 1.7-.1-.3-.2-.4-.4-.5zM17.1 8c-1.3-.5-2.6.2-2.6.2l-3.2 5.5c-.8 1.4-.3 3.2 1.1 4 1.4.8 3.2.3 4-1.1l3.2-5.5s.5-1.2-.2-2.3c-.5-.8-1.4-1.1-2.3-.8zM12.1 6.8c.8-1.4.3-3.2-1.1-4-1.4-.8-3.2-.3-4 1.1l3.2-5.5s.5-1.2-.2-2.3c-.5-.8-1.4-1.1-2.3-.8L7.6 5.5c-1.3-.5-2.6.2-2.6.2l-3.2 5.5c-.8 1.4-.3 3.2 1.1 4 1.4.8 3.2.3 4-1.1l3.2-5.5s.5-1.2-.2-2.3c-.5-.6-1.1-.9-1.8-.8z" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="19" cy="5" r="2.5" fillOpacity="0.8" />
        <circle cx="5" cy="5" r="2.5" fillOpacity="0.6" />
    </svg>
)

const integrations = [
    {
        value: "jira",
        label: "Jira",
        description: "Issues, epics, sprints",
        icon: JiraIcon,
        color: "text-blue-500",
    },
    {
        value: "linear",
        label: "Linear",
        description: "Issues, projects, cycles",
        icon: LinearIcon,
        color: "text-purple-500",
    },
    {
        value: "asana",
        label: "Asana",
        description: "Tasks, projects, portfolios",
        icon: AsanaIcon,
        color: "text-red-500",
    },
    {
        value: "csv",
        label: "CSV Import",
        description: "Upload spreadsheet",
        icon: FileSpreadsheet,
        color: "text-green-500",
    },
]

export function IntegrationSelector() {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string | null>(null)
    const user = useAppSelector((state) => state.auth.user)

    // Check which integrations are connected
    const isJiraConnected = user?.integrations?.jira?.connected || false

    const handleProceed = async () => {
        if (!selected) return

        if (selected === "jira") {
            try {
                // Call the backend to get the Jira authorization URL
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jira/authorize`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth setup
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error("Failed to get authorization URL")
                }

                const data = await response.json()

                // Redirect to Atlassian OAuth page
                if (data.authorization_url) {
                    window.location.href = data.authorization_url
                }
            } catch (error) {
                console.error("Error initiating Jira OAuth:", error)
                // You might want to show a toast notification here
            }
        } else {
            // Handle other integrations
            setOpen(false)
            console.log("Proceed with", selected)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="h-10 rounded-full border-dashed px-4"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Bring Existing Work
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] border shadow-2xl bg-dialogbg">
                <DialogHeader className="pb-6">
                    <DialogTitle className="text-xl font-medium tracking-tight">
                        Bring your existing work
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Connect your tools to help Huzlr plan, predict risks, and optimize delivery.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    {integrations.map((integration) => {
                        const isConnected = integration.value === "jira" && isJiraConnected
                        const isComingSoon = integration.value !== "jira"
                        const isDisabled = isConnected || isComingSoon

                        return (
                            <div
                                key={integration.value}
                                className={cn(
                                    "group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all duration-200",
                                    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
                                    isConnected
                                        ? "border-green-500/50 bg-green-500/5"
                                        : isComingSoon
                                            ? "border-muted/20 bg-muted/5 opacity-60"
                                            : "hover:border-primary/20 hover:bg-muted/30",
                                    selected === integration.value && !isDisabled
                                        ? "border-primary bg-primary/5 ring-0"
                                        : !isDisabled && "border-muted/40 bg-transparent"
                                )}
                                onClick={() => !isDisabled && setSelected(integration.value)}
                            >
                                {isConnected && (
                                    <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-green-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                        <Check className="h-3 w-3" />
                                        Connected
                                    </div>
                                )}
                                {isComingSoon && (
                                    <div className="absolute -top-2 -right-2 bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-full border">
                                        Coming Soon
                                    </div>
                                )}
                                <div className={cn(
                                    "rounded-lg p-2.5 transition-colors",
                                    isConnected
                                        ? "bg-green-500/10"
                                        : isComingSoon
                                            ? "bg-muted/30"
                                            : selected === integration.value
                                                ? "bg-background shadow-sm"
                                                : "bg-muted/50 group-hover:bg-background"
                                )}>
                                    <integration.icon className={cn(
                                        "h-6 w-6",
                                        isConnected ? "text-green-500" : integration.color
                                    )} />
                                </div>
                                <div className="space-y-0.5 text-center">
                                    <h3 className="text-sm font-medium leading-none">
                                        {integration.label}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground">
                                        {integration.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex items-center justify-between">
                    <Button variant="link" className="text-muted-foreground h-auto p-0 cursor-pointer" onClick={() => console.log("View all integrations")}>
                        View all integrations
                    </Button>
                    <Button
                        onClick={handleProceed}
                        disabled={!selected}
                        className="rounded-full px-6 cursor-pointer"
                    >
                        Proceed
                    </Button>
                </div>
                <DialogFooter className="border-t pt-6 sm:justify-center">
                    <p className="text-xs text-muted-foreground text-left">
                        huzlr does not replace your tools. It analyzes your work to help you execute the plan better.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

