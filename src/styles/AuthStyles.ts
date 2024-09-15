import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
