'use client';

import { useAtom } from 'jotai';

import { searchQueryAtom } from '@/entities/word/model';

import { Clear, Icon, Input, Wrap } from './SearchBar.style';

export const SearchBar = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  return (
    <Wrap>
      <Icon aria-hidden>🔍</Icon>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="단어, 한자, 뜻으로 검색..." />
      {query && (
        <Clear onClick={() => setQuery('')} aria-label="지우기">
          ×
        </Clear>
      )}
    </Wrap>
  );
};
