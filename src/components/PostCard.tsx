import React from 'react';

interface PostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
  slug: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, description, pubDate, tags, slug }) => {
  const formattedDate = new Date(pubDate).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map(tag => (
          <span key={tag} className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">{tag}</span>
        ))}
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        <a href={`/blog/${slug}`} className="hover:text-blue-600 transition-colors">{title}</a>
      </h2>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
      <time className="text-xs text-gray-400">{formattedDate}</time>
    </article>
  );
};

export default PostCard;