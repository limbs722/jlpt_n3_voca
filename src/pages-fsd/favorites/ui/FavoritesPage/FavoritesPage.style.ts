import styled from '@emotion/styled';

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;

export const Summary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing(2)} 0;
`;

export const Count = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CountLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
