import styled from '@emotion/styled';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Info = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(10)} 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;
