
import * as React from "react"
import { Button } from "@/components/ui/button"

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map(tag => (
        <Button
          key={tag}
          variant={selectedTag === tag ? "default" : "outline"}
          size="sm"
          onClick={() => onTagSelect(tag)}
          className="rounded-full transition-all duration-300"
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}
