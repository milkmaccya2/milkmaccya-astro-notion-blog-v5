
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TagFilter } from "@/components/TagFilter"
import { PostCard } from "@/components/PostCard"

interface Post {
    id: string;
    data: {
        title: string;
        date?: string;
        summary?: string;
        tags?: string[];
    };
}

interface BlogAppProps {
    posts: Post[];
}

export function BlogApp({ posts }: BlogAppProps) {
    const [selectedTag, setSelectedTag] = React.useState<string>("All");

    // 全タグを抽出してユニークなリストを作成
    const allTags = React.useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => post.data.tags?.forEach(tag => tags.add(tag)));
        return ["All", ...Array.from(tags).sort()];
    }, [posts]);

    // フィルタリングされた記事
    const filteredPosts = React.useMemo(() => {
        if (selectedTag === "All") return posts;
        return posts.filter(post => post.data.tags?.includes(selectedTag));
    }, [posts, selectedTag]);

    return (
        <div className="space-y-8">
            {/* Tags Filter */}
            <TagFilter 
                tags={allTags} 
                selectedTag={selectedTag} 
                onTagSelect={setSelectedTag} 
            />

            <Separator />

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} id={post.id} data={post.data} />
                ))}

                {filteredPosts.length === 0 && (
                    <div className="col-span-3 p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500">記事が見つかりませんでした。</p>
                        <Button variant="link" onClick={() => setSelectedTag("All")}>
                            全ての記事を表示
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
