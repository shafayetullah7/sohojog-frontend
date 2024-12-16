import { Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectFilter } from '../utils/conversationUtils'

type SearchAndFilterProps = {
    activeTab: 'personal' | 'projects'
    searchQuery: string
    setSearchQuery: (query: string) => void
    projectFilter: ProjectFilter
    setProjectFilter: (filter: ProjectFilter) => void
}

export function SearchAndFilter({ activeTab, searchQuery, setSearchQuery, projectFilter, setProjectFilter }: SearchAndFilterProps) {
    return (
        <div className="p-4 border-b border-gray-200">
            <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder={activeTab === 'personal' ? "Search conversations..." : "Search projects or groups..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>
            {activeTab === 'projects' && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                            <Filter className="mr-2 h-4 w-4" />
                            {projectFilter === 'all' ? 'All Projects' :
                                projectFilter === 'myProjects' ? 'My Projects' :
                                    'Participated Projects'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={projectFilter} onValueChange={(value) => setProjectFilter(value as ProjectFilter)}>
                            <DropdownMenuRadioItem value="all">All Projects</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="myProjects">My Projects</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="participatedProjects">Participated Projects</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

