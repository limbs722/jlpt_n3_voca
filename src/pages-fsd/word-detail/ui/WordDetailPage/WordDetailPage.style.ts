import styled from '@emotion/styled';

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;

export const Info = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing(10)} 0;
`;

export const Hero = styled.section`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(5)};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Kanji = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: clamp(44px, 11vw, 64px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Reading = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Meaning = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SubPos = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const Section = styled.section``;

export const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Example = styled.div`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const Jp = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Ko = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
