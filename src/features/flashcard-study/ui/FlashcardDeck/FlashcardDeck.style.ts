import styled from '@emotion/styled';

export const Info = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing(8)} 0;
`;

export const Progress = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const DoneWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

export const DoneTitle = styled.h2`
  font-size: 20px;
  margin: 0;
`;

export const DoneDesc = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  max-width: 320px;
`;
