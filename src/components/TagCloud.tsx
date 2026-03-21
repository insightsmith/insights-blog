import React from 'react';

interface TagCloudProps {
  tagCounts: Record<string, number>;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({ tagCounts, selectedTag, onTagSelect }) => {
  const maxCount = Math.max(...Object.values(tagCounts));
  const minCount = Math.min(...Object.values(tagCounts));
  const fontSize = (count: number) => 12 + ((count - minCount) / (maxCount - minCount)) * 12;

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Filter by Tags</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect(null)}
          className={`px-3 py-1 rounded ${selectedTag === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        {Object.entries(tagCounts).map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1 rounded ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            style={{ fontSize: `${fontSize(count)}px` }}
          >
            {tag} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;