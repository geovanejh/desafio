import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: #f1f1f1;
  }
`;
