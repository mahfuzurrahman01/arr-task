"use client"
import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllGrowthPlan, addGrowthFeatures } from '../../Redux/actions/planAction';
import { getRefinedFeatureList } from '@/utils/component-utils/reusedFunc';
import { PackageCard, PackageName, Prefix, PriceText, SupPrice, Title } from '@/Styles/packageStyle';
import { CustomIcon, Marker, MarkerForList, TitleContent, ToolTipIcon, TooltipText, TooltipTextList } from '@/Styles/tooltipStyle';
import { ArrowIcon, DropDown, DropDownContainer, DropdownList, ListContainer, ListItem } from '@/Styles/dropdownstyle';
import { FeaturesTitle, List } from '@/Styles/style-component';
import { SubmitButton } from '@/Styles/ButtonStyle';

const GrowthPlan = () => {
    //  
    const [growthPlan, setGrowthPlan] = useState({})
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.plan);
    const allGrowthPlan = store?.growthPlan;
    const features = store?.growthFeatures;
    const planCycle = store?.value;
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
    const [tempHover, setTempHover] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    // =================== mouse hover on feature =====================

    const handleMouseOnList = (index, purpose) => {
        if (purpose == 'feature') {
            setHoveredIndex(index);

        } else if (purpose == 'dropdown') {
            setTempHover(true)
        }
    };

    const handleMouseOutList = (purpose) => {
        if (purpose == 'feature') {
            setHoveredIndex(null);
        } else if (purpose == 'dropdown') {
            setTempHover(false)
        }
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
                    <PriceText packageId="growth">{planCycle == 'monthly' ? growthPlan?.details["1_year"].price : growthPlan?.details["2_year"].price}
                        <Prefix>{planCycle == 'monthly' ? growthPlan?.details["1_year"].price_postfix : growthPlan?.details["2_year"].price_postfix}</Prefix>
                        {
                            planCycle == 'yearly' && <SupPrice>{growthPlan?.details["1_year"].price}{growthPlan?.details["1_year"].price_postfix}</SupPrice>
                        }
                    </PriceText>
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
                                allGrowthPlan?.map((item, index) => <ListItem
                                    onClick={() => addNewPlan(item)}
                                    active={growthPlan?.price == item?.price && !tempHover}
                                    packageId="growth"
                                    key={index}
                                    onMouseEnter={() => handleMouseOnList(index, 'dropdown')}
                                    onMouseLeave={() => handleMouseOutList('dropdown')}
                                >{item?.title.replace(/<\/?strong>/g, '')}</ListItem>)
                            }
                        </DropdownList>
                    }
                    <FeaturesTitle>Everything in free plus:</FeaturesTitle>
                    <ListContainer>
                        {
                            features?.map((item, index) => (
                                <List
                                    key={index}
                                    onMouseEnter={() => handleMouseOnList(index, 'feature')}
                                    onMouseLeave={() => handleMouseOutList('feature')}
                                >
                                    {item?.feature_title}
                                    {/*  ======= Show tooltip only for the hovered item =========== */}
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
