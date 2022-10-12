import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% { opacity: 0; transform: translateY(-100px); }
  25% { opacity: 1; transform: translateY(0px); }
  75% { opacity: 1; transform: translateY(0px); }
  100% { opacity: 0; transform: translateY(-100px); }
`;

const Wrapper = styled.span`
  animation-name: ${animation};
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  font-size: 50px;
  font-weight: 600;
`;

const SuccessWrapper = styled.span`
  animation-name: ${animation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  font-size: 30px;
  font-weight: 600;
`;

export { animation, Wrapper, SuccessWrapper };