import styled from 'styled-components';

export const FornecedorItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 300;
  padding-bottom: 16px;
  padding-top: 16px;
  gap: 8px;
  color: #666666;

  &:hover {
    color: black;
    cursor: pointer;
    background-color: #f5f5f5; /* gray, almost white */
  }

  p {
    font-weight: 300;
  }

  &:last-child {
    border-bottom: none;
  }

  > div:last-child {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-self: center;

    a {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 0.5fr;
    font-size: 14px;

    width: 100%;

    > div {
      display: flex;
      align-items: center;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      align-self: center;
    }

    > div:nth-child(2) {
      display: none;
    }

    > div:nth-child(4) {
      display: flex;
      flex-direction: column;

      > div:first-child {
        display: none;
      }
    }
  }
`;

export const Phone = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  a {
    &:hover {
      color: green;
    }
  }
`;
