import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #0082f5;
  border-radius: 8px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  > form > h3 {
    margin-bottom: 12px;
    margin-top: 32px;
  }

  /* Tablets (≤1024px) */
  @media (max-width: 1024px) {
    padding: 24px;
    max-width: 90%;
  }

  /* Mobile (≤768px) */
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px;
    border: none;
    border-radius: 0;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const ItemsList = styled.div`
  display: grid;
  flex-direction: column;
  width: 100%;

  > div {
    padding-bottom: 16px;
  }

  /* Tablets (≤1024px) */
  @media (max-width: 1024px) {
    gap: 12px;
  }

  /* Mobile (≤768px) */
  @media (max-width: 768px) {
    gap: 8px;
  }

  /* Telas muito pequenas (≤480px) */
  @media (max-width: 480px) {
    gap: 6px;
  }
`;
