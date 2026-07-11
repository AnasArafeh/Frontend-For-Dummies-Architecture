// Area: Search bar with category selector. Contains search business logic.

import { useState, type FormEvent } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseButton } from '@/theme/components/base-button/base-button';
import './search.area.scss';

interface SearchAreaProps {
  onSearch?: (query: string) => void;
}

export function SearchArea({ onSearch }: SearchAreaProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <BaseBox
      component="form"
      onSubmit={handleSubmit}
      className="search"
    >
      <BaseBox
        component="select"
        className="search-category-select"
      >
        <option>All</option>
        <option>Electronics</option>
        <option>Computers</option>
      </BaseBox>
      <BaseBox
        component="input"
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search Amazon.ae"
        className="search-input"
      />
      <BaseButton
        type="submit"
        className="search-submit"
      >
        🔍
      </BaseButton>
    </BaseBox>
  );
}
