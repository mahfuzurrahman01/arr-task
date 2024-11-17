"use client"

import styled from "@emotion/styled";

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
border: 1px solid ${(props) => props?.packageId == 'free' && "var(--primary-color)"
    || props?.packageId == 'basic' && "var(--primary-color-basic)"
    || props?.packageId == "pro" && "var(--primary-color-pro)"
    || props?.packageId == "growth" && "var(--primary-color-growth)"
  };
color: ${(props) => props?.packageId == 'free' && "var(--primary-color)"
    || props?.packageId == 'basic' && "var(--primary-color-basic)"
    || props?.packageId == "pro" && "var(--primary-color-pro)"
    || props?.packageId == "growth" && "var(--primary-color-growth)"
  };
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