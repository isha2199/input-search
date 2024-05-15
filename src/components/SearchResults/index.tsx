import React from 'react';
import Card from '../Card';
import EmptyCard from '../EmptyCard';
import { Item } from '../../item';

interface SearchResultsProps {
  searchResults: Item[];
  highlightedIndex: number;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  highlightedIndex,
  handleMouseEnter,
  handleMouseLeave,
  searchQuery,
}) => {
  return (
    <div className="card-list">
      {searchResults.length > 0 ? (
        searchResults.map((item: Item, index: number) => (
          <Card
            key={item.id}
            item={item}
            isHighlighted={index === highlightedIndex}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            searchQuery={searchQuery}
          />
        ))
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default SearchResults;
