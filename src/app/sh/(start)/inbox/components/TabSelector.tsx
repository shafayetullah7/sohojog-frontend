import { Users, Folder } from 'lucide-react'
import { cn } from '@/_lib/utils'

type TabSelectorProps = {
    activeTab: 'personal' | 'projects'
    setActiveTab: (tab: 'personal' | 'projects') => void
}

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
    return (
        <div className="p-4 border-b border-gray-200">
            <div className="flex rounded-full bg-gray-100 p-1">
                <button
                    className={cn(
                        "flex-1 rounded-full py-2 px-4 text-sm font-medium transition-colors",
                        activeTab === 'personal'
                            ? "bg-iceMint-500 text-primary-foreground text-white"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setActiveTab('personal')}
                >
                    <Users className="w-4 h-4 inline-block mr-2" />
                    Personal
                </button>
                <button
                    className={cn(
                        "flex-1 rounded-full py-2 px-4 text-sm font-medium transition-colors",
                        activeTab === 'projects'
                            ? "bg-iceMint-500 text-primary-foreground text-white"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setActiveTab('projects')}
                >
                    <Folder className="w-4 h-4 inline-block mr-2" />
                    Projects
                </button>
            </div>
        </div>
    )
}

