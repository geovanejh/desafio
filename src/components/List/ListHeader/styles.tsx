import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    align-items: center;

    > h3 {
      color: #3fa1ff;
      font-size: 24px;
      margin: 0;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 24px;
    }
  }

  > div:last-child {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
    color: #666666;
    font-weight: 600;
    margin-bottom: 12px;
  }

  /* Tablets (≤1024px) */
  @media (max-width: 1024px) {
    > div:first-child {
      margin-bottom: 16px;
      > h3 {
        font-size: 20px;
      }
      > div {
        gap: 16px;
      }
    }
  }

  /* Mobile (≤768px) */
  @media (max-width: 768px) {
    > div:first-child {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;

      > h3 {
        font-size: 18px;
      }

      > div {
        width: 100%;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: flex-start;
      }
    }

    > div:last-child {
      margin-top: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 0.5fr;

      > div:nth-child(2) {
        display: none;
      }
    }
  }

  /* Telas muito pequenas (≤480px) */
  @media (max-width: 480px) {
    > div:first-child {
      gap: 8px;
      margin-bottom: 8px;

      > h3 {
        font-size: 24px;
      }

      > div {
        gap: 8px;
      }
    }
  }
`;
