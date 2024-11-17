"use client"
import styled from "@emotion/styled"

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
box-sizing: border-box;
`
export const PackageCard = styled.div`
background: #fff;
border: 1px solid #eaeff2;
border-radius: 8px;
border-top: 8px solid ${(props) => props?.packageId == "free" && "var(--primary-color)"
        || props?.packageId == "basic" && "var(--primary-color-basic)"
        || props?.packageId == "pro" && "var(--primary-color-pro)"
        || props?.packageId == "growth" && "var(--primary-color-growth)"
    };
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
color: ${(props) => props?.packageId == 'free' && "var(--primary-color)"
        || props?.packageId == 'basic' && "var(--primary-color-basic)"
        || props?.packageId == "pro" && "var(--primary-color-pro)"
        || props?.packageId == "growth" && "var(--primary-color-growth)"
    };
font-size: 32px;
font-weight: 600;
margin: 12px 0px;
position: relative;

}
`
export const Prefix = styled.span`
color: #83a1b7;
font-size: 14px;
font-weight: 400;
margin-left: 5px;
`
export const SupPrice = styled.span`
color: #ff424d;
font-size: 12px;
font-weight: 400;
margin-left: 5px;
position: relative;
bottom: 17px;
left: -50px;
text-decoration: line-through;
line-height: 1;
`
export const Title = styled.button`
background: ${(props) => props?.packageId == 'free' && "var(--secondary-color)"
        || props?.packageId == 'basic' && "var(--secondary-color-basic)"
        || props?.packageId == "pro" && "var(--secondary-color-pro)"
        || props?.packageId == "growth" && "var(--secondary-color-growth)"
    };
border-radius: 32px;
color: ${(props) => props?.packageId == 'free' && "var(--primary-color)"
        || props?.packageId == 'basic' && "var(--primary-color-basic)"
        || props?.packageId == "pro" && "var(--primary-color-pro)"
        || props?.packageId == "growth" && "var(--primary-color-growth)"
    };
font-size: 12.5px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap:7px ;
padding:9px 18px;
border: none;
`
