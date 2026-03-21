import React, { useState, useEffect } from 'react';
import TagCloud from './TagCloud';
import PostCard from './PostCard';

interface PostsSectionProps {
  posts: any[];
  tagCounts: Record<string, number>;
}

const PostsSection: React.FC<PostsSectionProps> = ({ posts, tagCounts }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    setSelectedTag(tag && tag !== '' ? tag : null);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedTag) {
      url.searchParams.set('tag', selectedTag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedTag]);

  const filteredPosts = selectedTag ? posts.filter(post => post.data.tags.includes(selectedTag)) : posts;

  return (
    <>
      <TagCloud tagCounts={tagCounts} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
        {selectedTag ? `Posts tagged with "${selectedTag}"` : 'Latest Posts'}
      </h2>
      <div className="grid gap-6">
        {filteredPosts.map(post => (
          <PostCard
            key={post.slug}
            title={post.data.title}
            description={post.data.description}
            pubDate={post.data.pubDate}
            tags={post.data.tags}
            slug={post.slug}
          />
        ))}
      </div>
    </>
  );
};

export default PostsSection;