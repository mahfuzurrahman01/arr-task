"use client"
import { CustomIcon, FeaturesTitle, List, ListContainer, Marker, MarkerForList, PackageCard, PackageName, PriceText, SubmitButton, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Style/style-component';
import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useState } from 'react';

const FreePlan = () => {
    // ========================== store where we are storing our all data from json file =====================

    const [freePackage, setFreePackage] = useState({});
    const [features, setFeatures] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index

    const getData = async () => {
        const result = await fetchData("Free");
        setFreePackage(result);
    }

    const getFeature = async () => {
        const result = await fetchPlansFeature("0");
        console.log(result)
        setFeatures(result);
    }

    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getData();
        getFeature();
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

    // =================== mouse hover on feature =====================

    const handleMouseOnList = (index) => {
        setHoveredIndex(index); // Set the hovered item index
    };

    const handleMouseOutList = () => {
        setHoveredIndex(null); // Reset the hovered item index
    }

    return (
        <div>
            {freePackage?.title && (
                <PackageCard packageId="free">
                    <PackageName>{freePackage?.name}</PackageName>
                    <PriceText packageId="free">{freePackage?.price}</PriceText>
                    <Title packageId="free">
                        <TitleContent
                            dangerouslySetInnerHTML={{
                                __html: freePackage?.title,
                            }}
                        />
                        <ToolTipIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <CustomIcon packageId="free">i</CustomIcon>
                            <TooltipText active={isHovered}>
                                {freePackage?.text}
                                <Marker />
                            </TooltipText>
                        </ToolTipIcon>
                    </Title>
                    <FeaturesTitle>Free includes:</FeaturesTitle>
                    <ListContainer>
                        {features?.map((item, index) => (
                            <List
                                key={index}
                                onMouseEnter={() => handleMouseOnList(index)} // Track the hovered index
                                onMouseLeave={handleMouseOutList} // Reset on mouse leave
                            >
                                {item?.feature_title}
                                {/* Show tooltip only for the hovered item */}
                                <TooltipTextList active={hoveredIndex === index}>
                                    {item?.feature_desc}
                                    <MarkerForList />
                                </TooltipTextList>
                            </List>
                        ))}
                    </ListContainer>
                    <SubmitButton packageId="free">Select Plan</SubmitButton>
                </PackageCard>
            )}
        </div>
    );
};

export default FreePlan;
