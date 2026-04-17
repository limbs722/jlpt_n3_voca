import { atom } from 'jotai';

export const selectedCategoryAtom = atom<string | '전체'>('전체');
export const searchQueryAtom = atom<string>('');
export const showEssentialOnlyAtom = atom<boolean>(false);
