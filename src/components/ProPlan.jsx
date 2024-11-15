"use client"
import { CustomIcon, FeaturesTitle, List, ListContainer, Marker, MarkerForList, MostPopularBUtton, PackageCard, PackageName, PriceText, SubmitButton, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';
import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useState } from 'react';

const ProPlan = () => {
    // ========================== store where we are storing our all data from json file =====================

    const [proPlan, setProPlan] = useState({});
    const [features, setFeatures] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);

    const getData = async () => {
        const result = await fetchData("Pro");
        setProPlan(result);
        getFeature();
    }

    const getFeature = async () => {
        const result = await fetchPlansFeature("1");
        console.log(result)
        setFeatures(result);
    }



    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getData();
    }, []);

    //  ============ as we have to add first feature dynamically so we will trigger this useEffect ===========

    useEffect(() => {
        if (proPlan?.title && features?.length > 0) {
            const proPlanTitle = proPlan?.title;
            const proPlanText = proPlan?.text;
            const refinedTitle = proPlanTitle.replace(/<\/?strong>/g, '');
            // ========== new body for the feature =========
            const newBody = {
                is_pro: '1',
                feature_title: refinedTitle,
                feature_desc: proPlanText,
            }
            features.unshift(newBody);
            setLoader(false);
        }
    }, [features])

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
            {
                proPlan?.title && !loader && <PackageCard packageId="pro">
                    <MostPopularBUtton>Most Popular</MostPopularBUtton>
                    <PackageName>{proPlan?.name}</PackageName>
                    <PriceText packageId="pro">{proPlan?.price}</PriceText>
                    <Title packageId="pro">
                        <TitleContent
                            dangerouslySetInnerHTML={{
                                __html: proPlan?.title,
                            }}
                        />
                        <ToolTipIcon onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}> <CustomIcon packageId="pro">i</CustomIcon>
                            <TooltipText active={isHovered}>{proPlan?.text}
                                <Marker />
                            </TooltipText>
                        </ToolTipIcon>
                    </Title>
                    <FeaturesTitle>Everything in free plus:</FeaturesTitle>
                    <ListContainer>
                        {
                            features?.map((item, index) => (
                                <List
                                    key={index}
                                    onMouseEnter={() => handleMouseOnList(index)} // Track the hovered index
                                    onMouseLeave={handleMouseOutList} // Reset on mouse leave
                                >
                                    {item?.feature_title}
                                    {/* Show tooltip only for the hovered item */}
                                    <TooltipTextList active={hoveredIndex === index}>
                                        <TitleContent
                                            dangerouslySetInnerHTML={{
                                                __html: item?.feature_desc,
                                            }}
                                        />
                                        <MarkerForList />
                                    </TooltipTextList>
                                </List>
                            ))
                        }
                    </ListContainer>
                    <SubmitButton packageId="pro">Select Plan</SubmitButton>
                </PackageCard>
            }
        </div>
    );
};

export default ProPlan;
