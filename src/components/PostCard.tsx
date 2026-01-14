
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PostData {
    title: string;
    date?: string;
    summary?: string;
    tags?: string[];
}

interface PostCardProps {
    id: string;
    data: PostData;
}

export function PostCard({ id, data }: PostCardProps) {
    return (
        <a 
            href={`/blog/${id}`} 
            className="block h-full no-underline"
        >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 group overflow-hidden flex flex-col">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            📄
                        </div>
                        <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            {new Date(data.date || '').toLocaleDateString('ja-JP')}
                        </span>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {data.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    {data.summary && (
                        <p className="text-slate-500 text-sm line-clamp-3">
                            {data.summary}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="pt-4 border-t border-slate-50 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {data.tags?.map(tag => (
                            <Badge key={tag} variant="secondary" className="font-normal text-xs text-slate-600 hover:text-slate-900">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </a>
    )
}
