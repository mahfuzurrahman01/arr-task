"use client"

import styled from "@emotion/styled"

export const DropDownContainer = styled.div`
   background: white;
   width: 100%;
   display: flex;
   align-items: center;
   gap: 15px;
   position: relative;
}
`

export const DropDown = styled.div`
   background: white;
   border: 1px solid ${(props) =>
        props?.packageId == 'free'
        && "var(--primary-color)" ||
        props?.packageId == 'basic'
        && "var(--primary-color-basic)" ||
        props?.packageId == "pro" && "var(--primary-color-pro)" ||
        props?.packageId == "growth" && "var(--primary-color-growth)"};
   padding: 0px 15px;
   height: 32px;
   color: ${(props) =>
        props?.packageId == 'free'
        && "var(--primary-color)" ||
        props?.packageId == 'basic'
        && "var(--primary-color-basic)" ||
        props?.packageId == "pro" && "var(--primary-color-pro)" ||
        props?.packageId == "growth" && "var(--primary-color-growth)"};
    border-radius: 5px;
     display: flex;
   justify-content: center;
   align-items: center;
   gap: 15px;
   font-size: 12.5px;
   cursor: pointer;
   position: relative;
   width: 85%;
  
}
`
export const ArrowIcon = styled.span`
  font-size: 15px;
  color: ${(props) =>
        props?.packageId == 'free'
        && "var(--primary-color)" ||
        props?.packageId == 'basic'
        && "var(--primary-color-basic)" ||
        props?.packageId == "pro" && "var(--primary-color-pro)" ||
        props?.packageId == "growth" && "var(--primary-color-growth)"};
  rotate: ${(props => props?.active ? '-180deg' : '0deg')};
 border-bottom: 2px solid #999;
    border-right: 2px solid #999;
    content: "";
    display: block;
    height: 6px;
    margin-top: -4px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: rotate(45deg);
    transform-origin: 66% 66%;
    transition: all .15s ease-in-out;
    width: 6px;
  
`

export const DropdownList = styled.ul`
    width: 85%;
    position: absolute;
    top: 127px;
    background: white;
    border-radius: 10px;
    box-sizing: border-box;
    transform-origin: 50% 0;
    transition: all .2s cubic-bezier(.5,0,0,1.25), opacity .15s ease-out;
    z-index: ${(props) => props?.active ? 20 : -20};
    left: 17px;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, .08);
    opacity: ${(props) => props?.active ? 1 : 0};
    pointer-events: ${(props) => props?.active && "auto"};
    transform: ${(props) => props?.active ? "scale(1) translateY(0)" : "scale(.75) translateY(-21px)"};
`

export const ListContainer = styled.ul`
margin: 0px 0px 60px 0px;
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction: column;
`


export const ListItem = styled.li`
    font-size: 12px;
    font-weight: 400;
    padding: 15px 5px 15px 15px;
    cursor: pointer;
    list-style: none;
    outline: none;
    text-align: left;
    transition: all .2s;
    // ================ background ==============
    background: ${(props) =>
        props?.packageId == 'free' && props?.active &&
        "var(--secondary-color)" ||
        props?.packageId == 'basic'
        && props?.active && "var(--secondary-color-basic)" ||
        props?.packageId == "pro" && props?.active && "var(--secondary-color-pro)" ||
        props?.packageId == "growth" && props?.active && "var(--secondary-color-growth)"};
    // ================= color ==================
    color: ${(props) =>
        props?.packageId == 'free'
        && props?.active && "var(--primary-color)" ||
        props?.packageId == 'basic'
        && props?.active && "var(--primary-color-basic)" ||
        props?.packageId == "pro" && props?.active && "var(--primary-color-pro)" ||
        props?.packageId == "growth" && props?.active && "var(--primary-color-growth)"};
    // ==================== hover ==================
    &:hover {
    background: ${(props) =>
        props?.packageId == 'free'
        && "var(--secondary-color)" ||
        props?.packageId == 'basic'
        && "var(--secondary-color-basic)" ||
        props?.packageId == "pro" && "var(--secondary-color-pro)" ||
        props?.packageId == "growth" && "var(--secondary-color-growth)"};
    color: ${(props) =>
        props?.packageId == 'free'
        && "var(--primary-color)" ||
        props?.packageId == 'basic'
        && "var(--primary-color-basic)" ||
        props?.packageId == "pro" && "var(--primary-color-pro)" ||
        props?.packageId == "growth" && "var(--primary-color-growth)"};
  }
   @media (min-width: 1024px) { /* Larger screens than tablet: 2 cards */
    font-size: 12px;
  }

  @media (min-width: 1580px) { /* Extra large screens: 4 cards */
    font-size: 13px;
  }
`