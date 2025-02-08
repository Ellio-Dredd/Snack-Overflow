
import styled from 'styled-components';

const PTextStyles = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--white);
`;

export default function PText({ children }) {
  return <PTextStyles>{children}</PTextStyles>;
}