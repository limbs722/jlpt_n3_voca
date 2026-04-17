'use client';

import styled from '@emotion/styled';
import { useAtom } from 'jotai';

import { selectedCategoryAtom, showEssentialOnlyAtom } from '@/entities/word';
import { CATEGORIES } from '@/shared/config/seed-data/words';
import { AppTheme } from '@/shared/ui/theme';

export const CategoryFilter = () => {
  const [selected, setSelected] = useAtom(selectedCategoryAtom);
  const [essentialOnly, setEssentialOnly] = useAtom(showEssentialOnlyAtom);

  return (
    <Wrap>
      <Scroll>
        <Chip $active={selected === '전체'} onClick={() => setSelected('전체')}>
          전체
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} $active={selected === c} onClick={() => setSelected(c)}>
            {c}
          </Chip>
        ))}
      </Scroll>
      <EssentialToggle $active={essentialOnly} onClick={() => setEssentialOnly((v) => !v)} type="button">
        필수만
      </EssentialToggle>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Scroll = styled.div`
  flex: 1;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.pill};
  border: 1px solid
    ${({ theme, $active }: { theme: AppTheme; $active: boolean }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }: { theme: AppTheme; $active: boolean }) =>
    $active ? theme.colors.primary : theme.colors.bgElevated};
  color: ${({ theme, $active }: { theme: AppTheme; $active: boolean }) => ($active ? '#fff' : theme.colors.textMuted)};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

const EssentialToggle = styled(Chip)``;
