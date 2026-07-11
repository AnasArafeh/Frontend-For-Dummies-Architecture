'use client';

import { useState, type FormEvent } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseButton } from '@/theme/components/base-button/base-button';
import styles from './search.area.module.scss';

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

  return (
    <BaseBox component="form" onSubmit={handleSubmit} className={styles.search}>
      <BaseBox component="select" className={styles['search-category-select']}>
        <option>All</option>
        <option>Electronics</option>
        <option>Computers</option>
      </BaseBox>
      <BaseBox
        component="input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Amazon.ae"
        className={styles['search-input']}
      />
      <BaseButton type="submit" className={styles['search-submit']}>
        {'🔍'}
      </BaseButton>
    </BaseBox>
  );
}
