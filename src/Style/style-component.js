'use client'
import styled from '@emotion/styled'
export const Container = styled.div`
  width: 60vw;
  margin: 20px auto;
  padding: 2rem;
  min-height: 85vh;
`

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

export const PackageContainer = styled.section`
column-gap: 16px;
display: grid;
grid-template-columns: repeat(4, 1fr);
padding: 30px 0;
row-gap: 16px;
box-sizing: border-box;
font-family: Rubik, sans-serif;
padding: 0;
margin-top: 16px;
`
export const PackageCard = styled.div`
background: #fff;
border: 1px solid #eaeff2;
border-radius: 8px;
border-top: 8px solid var(--primary-color);
display: flex;
flex-direction: column;
height: 100%;
padding: 24px 20px;
position: relative;
transition: all .25s;
`

export const PackageName = styled.p`
font-size: 18px;
color: #49687e;
font-weight: 400;
margin: 0px;
`
export const PriceText = styled.p`
color: var(--primary-color);
font-size: 32px;
font-weight: 600;
margin: 5px 0px 5px;
}
`
export const Title = styled.div`
background: var(--secondary-color);
border-radius: 32px;
color: var(--primary-color);
font-size: 14px;
padding: 8px 15px;
box-sizing: border-box;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-start;
gap:7px ;
`

export const ToolTipIcon = styled.span`
  cursor: pointer;
  position:relative;
`


export const TooltipText = styled.span`
visibility: ${(props) => props?.active ? "visible" : "hidden"};
opacity:  ${(props) => props?.active ? 1 : 0};
background: #fff;
border: 1px solid #fff;
border-radius: 5px;
bottom: calc(100% + 11px);
box-shadow: 0 0 18px 0 rgba(73, 104, 126, .2);
color: #49687e;
font-size: 12.5px;
left: auto;
right: -12px;
line-height: 1.5 !important;
min-width: 224px;
padding: 5px 10px;
position: absolute;
white-space: normal;
width: calc(100% + 20px);
word-break: break-word;
z-index: 10;

}  
`;

export const Marker = styled.span`
width: 10px;
height: 10px;
background: white;
position: absolute;
bottom: -7px;
right: 14px;
z-index: 20;
rotate: 45deg;
`