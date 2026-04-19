'use client';

import { useAtom } from 'jotai';

import { selectedCategoryAtom, showEssentialOnlyAtom } from '@/entities/word/model';
import { CATEGORIES } from '@/shared/config/seed-data/words';

import { Chip, EssentialToggle, Scroll, Wrap } from './CategoryFilter.style';

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
