
import { MdPlace } from 'react-icons/md';
import styled from 'styled-components';
import PText from './PText'; // Ensure this path is correct

const ItemStyles = styled.div`
  padding: 1rem;
  background-color: #A6B1E1;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 15px;
  margin-bottom: 4rem;
  margin-left: 0 rem;
  font-family: "Poppins", serif;
  font-weight: 100;
  
  .icon {
    color: ##F5EFFF ;
    background-color: #DCD6F7;
    padding: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  svg {
    width: 3.5rem;
  }
`;

export default function ContactInfo({
  icon = <MdPlace />,
  text = 'this is an info',
}) {
  return (
    <ItemStyles>
      <div className="icon">{icon}</div>
      <div className="info">
        <PText>{text}</PText>
      </div>
    </ItemStyles>
  );
}
