"use client"
import { Marker, PackageCard, PackageName, PriceText, Title, ToolTipIcon, TooltipText, TooltipWrapper } from '@/Style/style-component';
import { fetchData } from '@/utils/GetDataFunc';
import React, { useEffect, useState } from 'react';
const FreePlan = () => {
    // ========================== store where we are storing our all data from json file =====================

    const [freePackage, setFreePackage] = useState({});

    const getData = async () => {
        const result = await fetchData("Free");
        console.log(result)
        setFreePackage(result);
    }
    // ============= with the help of this use effect we will fetch the data for the first render ============
    useEffect(() => {
        getData()
    }, []);

    // ============ rendering the title as we are getting <strong> html tag from our api response ==============
    const renderTitle = (title) => {
        const parts = title?.split(/(<strong>.*?<\/strong>)/g) || [];
        return parts.map((part, index) =>
            part.startsWith("<strong>") ? (
                <strong key={index}>{part.replace(/<\/?strong>/g, "")}</strong>
            ) : (
                part
            )
        );
    };

    // ==================== mouse hover pointer for tooltip ==============

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div>
            {
                freePackage?.title && <PackageCard>
                    <PackageName>{freePackage?.name}</PackageName>
                    <PriceText>{freePackage?.price}</PriceText>
                    <Title>{renderTitle(freePackage?.title)}
                        <ToolTipIcon onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_615_3319)"><path d="M8.00016 14.6668C11.6821 14.6668 14.6668 11.6821 14.6668 8.00016C14.6668 4.31826 11.6821 1.3335 8.00016 1.3335C4.31826 1.3335 1.3335 4.31826 1.3335 8.00016C1.3335 11.6821 4.31826 14.6668 8.00016 14.6668Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 10.6667V8" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 5.3335H8.00667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_615_3319"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
                            <TooltipText active={isHovered}>{freePackage?.text}
                                <Marker />
                            </TooltipText>
                        </ToolTipIcon>


                    </Title>

                </PackageCard>
            }
        </div>
    );
};

export default FreePlan;