"use client";

import styled from "@emotion/styled";
import { useAtom } from "jotai";

import { searchQueryAtom } from "@/entities/word";

export const SearchBar = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  return (
    <Wrap>
      <Icon aria-hidden>🔍</Icon>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="단어, 한자, 뜻으로 검색..."
      />
      {query && (
        <Clear onClick={() => setQuery("")} aria-label="지우기">
          ×
        </Clear>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 12px;
  height: 42px;
`;

const Icon = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;

const Clear = styled.button`
  border: none;
  background: transparent;
  font-size: 22px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textSubtle};
  padding: 0 4px;
`;
