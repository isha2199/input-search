import React, { useState, useEffect, useRef } from 'react';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import data from './data.json';
import './App.css';
import { Item } from './item';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = data.filter((item: Item) => {
      const values = Object.values(item).join('').toLowerCase();
      return values.includes(searchQuery.toLowerCase());
    });
    setSearchResults(results);
    setHighlightedIndex(-1);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    }
  };

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  const handleMouseLeave = () => {
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    if (listRef.current && highlightedIndex !== -1) {
      const highlightedItem = listRef.current.childNodes[
        highlightedIndex
      ] as HTMLElement;
      highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className="App">
      <SearchInput
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchResults
        searchResults={searchResults}
        highlightedIndex={highlightedIndex}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
