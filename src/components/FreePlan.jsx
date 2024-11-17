"use client"
import { ArrowIcon, CustomIcon, DropDown, DropDownContainer, DropdownList, FeaturesTitle, List, ListContainer, ListItem, Marker, MarkerForList, PackageCard, PackageName, Prefix, PriceText, SubmitButton, SupPrice, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';

import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllFreePlan, addFreeFeatures } from '../../Redux/actions/planAction';
import { getRefinedFeatureList } from '@/utils/component-utils/reusedFunc';

const FreePlan = () => {
    //  
    const [freePlan, setFreePlan] = useState({})
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.plan);
    const AllFreePlan = store?.freePlan;
    const features = store?.freeFeatures;
    const planCycle = store?.value;
    const getDataForFreePlan = async () => {
        const result = await fetchData("Free");
        // =============adding to store ============
        dispatch(addAllFreePlan(result));
        const initialPlan = result[0];
        setFreePlan(initialPlan);
    }

    const getFeature = async () => {
        const featureArr = await fetchPlansFeature("0");
        const newArr = getRefinedFeatureList(freePlan, featureArr);
        dispatch(addFreeFeatures(newArr));
        setLoader(false);
    }


    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getDataForFreePlan();
    }, []);

    useEffect(() => {
        if (freePlan?.title) {
            getFeature();
        }
        if (AllFreePlan > 0 && freePlan?.title) {
            setLoader(false);
        }
    }, [freePlan])


    // ==================== mouse hover pointer for tooltip ==============

    const [isHovered, setIsHovered] = useState(false);
    const [tempHover, setTempHover] = useState(false);

    // =================== mouse hover on feature =====================
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    }


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
        setFreePlan(item)
        setDropdownState(false)
    }


    return (
        <div>
            {
                freePlan?.title && !loader && <PackageCard packageId="free">
                    <PackageName>{freePlan?.name}</PackageName>
                    <PriceText packageId="free">{planCycle == 'monthly' ? freePlan?.details["1_year"].price : freePlan?.details["2_year"].price}
                        <Prefix>{planCycle == 'monthly' ? freePlan?.details["1_year"].price_postfix : freePlan?.details["2_year"].price_postfix}</Prefix>
                        {
                            planCycle == 'yearly' && freePlan?.details["2_year"].price !== 'Free' && <SupPrice>{freePlan?.details["1_year"].price}{freePlan?.details["1_year"].price_postfix}</SupPrice>
                        }
                    </PriceText>
                    {
                        AllFreePlan?.length == 1 ? <Title packageId="free">
                            <TitleContent
                                dangerouslySetInnerHTML={{
                                    __html: freePlan?.title,
                                }}
                            />
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="free">i</CustomIcon>
                                <TooltipText active={isHovered}>{freePlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>
                        </Title> : <DropDownContainer ref={dropdownContainerRef} packageId="free">
                            <DropDown packageId="free" onClick={() => setDropdownState(!dropdownState)}>
                                {freePlan?.title.replace(/<\/?strong>/g, '').split('/')[0]}...
                                <ArrowIcon active={dropdownState}></ArrowIcon>
                            </DropDown>
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="free">i</CustomIcon>
                                <TooltipText active={isHovered}>{freePlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>

                        </DropDownContainer>
                    }
                    {
                        <DropdownList ref={dropdownListRef} active={dropdownState}>
                            {
                                AllFreePlan?.map((item, index) => <ListItem
                                    onClick={() => addNewPlan(item)}
                                    active={freePlan?.price == item?.price && !tempHover}
                                    packageId="free"
                                    key={index}
                                    onMouseEnter={() => handleMouseOnList(index, 'dropdown')}
                                    onMouseLeave={() => handleMouseOutList('dropdown')}
                                >{item?.title.replace(/<\/?strong>/g, '')}</ListItem>)
                            }
                        </DropdownList>
                    }
                    <FeaturesTitle>Free includes: </FeaturesTitle>
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
                    <SubmitButton packageId="free">Select Plan</SubmitButton>

                </PackageCard>
            }
        </div>
    );
};

export default FreePlan;
