'use client'
import styled from '@emotion/styled'
export const Container = styled.div`
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
width: 65%;
column-gap: 16px;
display: grid;
grid-template-columns: repeat(4, 1fr);
padding: 30px 0;
row-gap: 16px;
box-sizing: border-box;
font-family: Rubik, sans-serif;
padding: 0;
margin-top: 16px;
margin-left: auto;
margin-right: auto;
`
export const PackageCard = styled.div`
background: #fff;
border: 1px solid #eaeff2;
border-radius: 8px;
border-top: 8px solid ${(props) => props?.packageId == "free" && "var(--primary-color)" || props?.packageId == "basic" && "var(--primary-color-basic)" || props?.packageId == "pro" && "var(--primary-color-pro)"};
position:relative;
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
color: ${(props) => props?.packageId == 'free' && "var(--primary-color)" || props?.packageId == 'basic' && "var(--primary-color-basic)" || props?.packageId == "pro" && "var(--primary-color-pro)"};
font-size: 32px;
font-weight: 600;
margin: 5px 0px 5px;
}
`
export const Title = styled.button`
background: ${(props) => props?.packageId == 'free' && "var(--secondary-color)" || props?.packageId == 'basic' && "var(--secondary-color-basic)" || props?.packageId == "pro" && "var(--secondary-color-pro)"};;
border-radius: 32px;
color: ${(props) => props?.packageId == 'free' && "var(--primary-color)" || props?.packageId == 'basic' && "var(--primary-color-basic)" || props?.packageId == "pro" && "var(--primary-color-pro)"};;
font-size: 12.5px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap:7px ;
padding:9px 18px;
border: none;
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
bottom: calc(100% + 6px);
box-shadow: 0 0 18px 0 rgba(73, 104, 126, .2);
color: #49687e;
font-size: 12.5px;
font-weight: 500;
left: auto;
right: -12px;
line-height: 1.5 !important;
min-width: 224px;
padding: 5px 10px;
position: absolute;
white-space: normal;
width: calc(100% + 20px);
word-break: break-word;
text-align: left;
z-index: 10;
}  
`;

export const TooltipTextList = styled.span`
visibility: ${(props) => props?.active ? "visible" : "hidden"};
opacity:  ${(props) => props?.active ? 1 : 0};
background: #fff;
border: 1px solid #fff;
border-radius: 5px;
bottom: calc(100% + 11px);
box-shadow: 0 0 18px 0 rgba(73, 104, 126, .2);
color: #49687e;
font-size: 12.5px;
font-weight: 500;
left: 0px;
right: auto;
line-height: 1.5 !important;
min-width: 100%;
padding: 5px 10px;
position: absolute;
white-space: normal;
width: 100%;
word-break: break-word;
z-index: 10;
}  
`;

export const TitleContent = styled.div`
 & > img {
    width: 100%;

    margin-top: 4px;
    border: none;
  }
`

export const CustomIcon = styled.span`
width: 14.5px;
height: 14.5px;
border-radius: 100px;
border: 1px solid ${(props) => props?.packageId == 'free' && "var(--primary-color)" || props?.packageId == 'basic' && "var(--primary-color-basic)" || props?.packageId == "pro" && "var(--primary-color-pro)"};
color: ${(props) => props?.packageId == 'free' && "var(--primary-color)" || props?.packageId == 'basic' && "var(--primary-color-basic)" || props?.packageId == "pro" && "var(--primary-color-pro)"};
font-size: 11px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
font-weight: 500;

`

export const Marker = styled.span`
width: 10px;
height: 10px;
background: white;
position: absolute;
bottom: -6px;
right: 14px;
z-index: 20;
rotate: 45deg;
`
export const MarkerForList = styled(Marker)`
width: 9px;
height: 9px;
bottom: -5px;
left: 14px;

`
export const FeaturesTitle = styled.div`
display: block;
color: #49687e;
margin-top: 18px;
font-size: 16px;
font-weight: 500;
margin-bottom: 0px;

`
export const List = styled.li`
list-style: none;
margin-top: 22px;
cursor: pointer;
font-size: 14px;
line-height: 1;
color: #49687e;
position: relative;
display: inline;
width: 100%;
`

export const ListContainer = styled.ul`
margin: 0px 0px 60px 0px;
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction: column;
`

export const SubmitButton = styled.button`
  background-color: ${(props) =>
    props?.packageId == 'free'
    && "var(--primary-color)" ||
    props?.packageId == 'basic'
    && "var(--primary-color-basic)"
    || props?.packageId == "pro" && "var(--primary-color-pro)"};
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  display: block;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
  border: none;
  font-size: 16px;
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    background-color: ${(props) =>
    props?.packageId == 'free'
    && "var(--primary-dark-color)" ||
    props?.packageId == 'basic'
    && "var(--primary-dark-color-basic)" ||
    props?.packageId == "pro" && "var(--primary-dark-color-pro)"};
  }
`

export const MostPopularBUtton = styled.button`
    background-color: var(--primary-color-pro);
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: 6.5px 8px;
    position: absolute;
    right: 6px;
    top: 6px;
    border: none;
`