import React from 'react';
import { Item } from '../../item';
import './style.css';

interface CardProps {
  item: Item;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  searchQuery: string;
}

const Card: React.FC<CardProps> = ({
  item,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
  searchQuery,
}) => {
  const highlightKeyword = (text: string | string[]) => {
    if (!searchQuery || typeof text !== 'string') return text;

    if (Array.isArray(text)) {
      return text.map((item, index) => (
        <span
          key={index}
          dangerouslySetInnerHTML={{ __html: highlightKeyword(item) }}
        />
      ));
    }

    const regex = new RegExp(searchQuery, 'gi');
    return text.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  };

  return (
    <div
      className={`card ${isHighlighted ? 'highlighted' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {Object.keys(item).map((key: string, i: number) => (
        <div key={i}>
          {key !== 'pincode' && key !== 'items' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: `${highlightKeyword((item as any)[key])}`,
              }}
            />
          ) : key === 'items' &&
            searchQuery &&
            (item as any)[key].some((item: string) =>
              item.includes(searchQuery)
            ) ? (
            <span>
              <span className="highlight">{searchQuery}</span> found in items
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Card;
