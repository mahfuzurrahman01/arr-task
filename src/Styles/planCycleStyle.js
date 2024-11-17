'use client'
import styled from "@emotion/styled";

export const ToggleContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin: auto;
  cursor: pointer;
`
export const Divider = styled.div`
  height: 35px;
  width: 1px;
  background: #ccc;
`;
export const ToggleButton = styled.p`
  color: ${props => props?.active ? "#b78deb" : "#49687e"};
  font-size: 16px;
  font-family: Rubik, sans-serif;
  font-weight: ${props => props?.active ? "bold" : "normal"};
  border-bottom: ${props => props?.active ? "2px solid #b78deb" : "2px solid transparent"};
  padding: 10px 0px;
`;

export const OfferButton = styled.span`
background: #F1EAFB;
padding: 5px 12px;
border: none;
border-radius: 40px;
font-size: 16px;
font-family: Rubik, sans-serif;
font-weight: 400;
line-height: 24px;
color: #49687e;
cursor: pointer;
`