"use client"
import { ArrowIcon, CustomIcon, DropDown, DropDownContainer, DropdownList, FeaturesTitle, List, ListContainer, ListItem, Marker, MarkerForList, PackageCard, PackageName, PriceText, SubmitButton, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';

import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllGrowthPlan, addGrowthFeatures } from '../../Redux/actions/planAction';
import { getRefinedFeatureList } from '@/utils/component-utils/reusedFunc';

const GrowthPlan = () => {
    // ========================== store where we are storing our all data from json file =====================
    const [growthPlan, setGrowthPlan] = useState({})
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.plan);
    const allGrowthPlan = store?.growthPlan;
    const features = store?.growthFeatures;

    const getDataForGrowthPlan = async () => {
        const result = await fetchData("Growth");
        // =============adding to store ============
        dispatch(addAllGrowthPlan(result));
        const initialPlan = result[0];
        setGrowthPlan(initialPlan);
    }

    const getFeature = async () => {
        const featureArr = await fetchPlansFeature("1");
        const newArr = getRefinedFeatureList(growthPlan, featureArr);
        dispatch(addGrowthFeatures(newArr));
        setLoader(false);
    }

   
    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getDataForGrowthPlan();
    }, []);

    useEffect(() => {
        if (growthPlan?.title) {
            getFeature();
        }
        if (allGrowthPlan > 0 && growthPlan?.title) {
            setLoader(false);
        }
    }, [growthPlan])


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

    //===============this ref and use effect will trigger for dropdown close ================

    const dropdownContainerRef = useRef(null);
    const dropdownListRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                dropdownContainerRef.current &&
                dropdownListRef.current &&
                !dropdownContainerRef.current.contains(event.target) &&
                !dropdownListRef.current.contains(event.target)
            ) {
                setDropdownState(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    const addNewPlan = (item) => {
        setGrowthPlan(item)
        setDropdownState(false)
    }


    return (
        <div>
            {
                growthPlan?.title && !loader && <PackageCard packageId="growth">
                    <PackageName>{growthPlan?.name}</PackageName>
                    <PriceText packageId="growth">{growthPlan?.price}</PriceText>
                    {
                        allGrowthPlan?.length == 1 ? <Title packageId="growth">
                            <TitleContent
                                dangerouslySetInnerHTML={{
                                    __html: growthPlan?.title,
                                }}
                            />
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="growth">i</CustomIcon>
                                <TooltipText active={isHovered}>{growthPlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>
                        </Title> : <DropDownContainer ref={dropdownContainerRef} packageId="growth">
                            <DropDown packageId="growth" onClick={() => setDropdownState(!dropdownState)}>
                                {growthPlan?.title.replace(/<\/?strong>/g, '').split('/')[0]}...
                                <ArrowIcon active={dropdownState}></ArrowIcon>
                            </DropDown>
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="growth">i</CustomIcon>
                                <TooltipText active={isHovered}>{growthPlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>

                        </DropDownContainer>
                    }
                    {
                        <DropdownList ref={dropdownListRef} active={dropdownState}>
                            {
                                allGrowthPlan?.map((item) => <ListItem onClick={() => addNewPlan(item)} active={growthPlan?.price == item?.price} packageId="growth" key={item?.title}>{item?.title.replace(/<\/?strong>/g, '')}</ListItem>)
                            }
                        </DropdownList>
                    }
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
                    <SubmitButton packageId="growth">Select Plan</SubmitButton>

                </PackageCard>
            }
        </div>
    );
};

export default GrowthPlan;
