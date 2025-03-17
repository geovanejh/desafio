import styled from 'styled-components';

interface FormRowProps {
  layout: string;
}

export const FormRow = styled.div<FormRowProps>`
  display: grid;
  width: 100%;
  gap: 24px;
  grid-template-columns: ${({ layout }) => layout};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  > div {
    width: 100%;
    align-self: center;
  }

  a {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  gap: 12px;
  color: #0082f5;

  a {
    align-self: center;
    cursor: pointer;
  }
`;
