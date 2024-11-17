"use client"
import { ArrowIcon, CustomIcon, DropDown, DropDownContainer, DropdownList, FeaturesTitle, List, ListContainer, ListItem, Marker, MarkerForList, PackageCard, PackageName, Prefix, PriceText, SubmitButton, SupPrice, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';

import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllBasicPlan, addBasicFeatures } from '../../Redux/actions/planAction';
import { getRefinedFeatureList } from '@/utils/component-utils/reusedFunc';

const BasicPlan = () => {
    //  
    const [basicPlan, setBasicPlan] = useState({})
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.plan);
    const allBasicPlan = store?.basicPlan;
    const features = store?.basicFeatures;
    const planCycle = store?.value;
    const getDataForBasicPlan = async () => {
        const result = await fetchData("Basic");
        // =============adding to store ============
        dispatch(addAllBasicPlan(result));
        const initialPlan = result[0];
        setBasicPlan(initialPlan);
    }

    const getFeature = async () => {
        const featureArr = await fetchPlansFeature("1");
        const newArr = getRefinedFeatureList(basicPlan, featureArr);
        dispatch(addBasicFeatures(newArr));
        setLoader(false);
    }


    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getDataForBasicPlan();
    }, []);

    useEffect(() => {
        if (basicPlan?.title) {
            getFeature();
        }
        if (allBasicPlan > 0 && basicPlan?.title) {
            setLoader(false);
        }
    }, [basicPlan])


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
        setBasicPlan(item)
        setDropdownState(false)
    }


    return (
        <div>
            {
                basicPlan?.title && !loader && <PackageCard packageId="basic">
                    <PackageName>{basicPlan?.name}</PackageName>
                    <PriceText packageId="basic">{planCycle == 'monthly' ? basicPlan?.details["1_year"].price : basicPlan?.details["2_year"].price}
                        <Prefix>{planCycle == 'monthly' ? basicPlan?.details["1_year"].price_postfix : basicPlan?.details["2_year"].price_postfix}</Prefix>
                        {
                            planCycle == 'yearly' && <SupPrice>{basicPlan?.details["1_year"].price}{basicPlan?.details["1_year"].price_postfix}</SupPrice>
                        }
                    </PriceText>
                    {
                        allBasicPlan?.length == 1 ? <Title packageId="basic">
                            <TitleContent
                                dangerouslySetInnerHTML={{
                                    __html: basicPlan?.title,
                                }}
                            />
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="basic">i</CustomIcon>
                                <TooltipText active={isHovered}>{basicPlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>
                        </Title> : <DropDownContainer ref={dropdownContainerRef} packageId="basic">
                            <DropDown packageId="basic" onClick={() => setDropdownState(!dropdownState)}>
                                {basicPlan?.title.replace(/<\/?strong>/g, '').split('/')[0]}...
                                <ArrowIcon active={dropdownState}></ArrowIcon>
                            </DropDown>
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="basic">i</CustomIcon>
                                <TooltipText active={isHovered}>{basicPlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>

                        </DropDownContainer>
                    }
                    {
                        <DropdownList ref={dropdownListRef} active={dropdownState}>
                            {
                                allBasicPlan?.map((item, index) => <ListItem
                                    onClick={() => addNewPlan(item)}
                                    active={basicPlan?.price == item?.price && !tempHover}
                                    packageId="basic"
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
                    <SubmitButton packageId="basic">Select Plan</SubmitButton>

                </PackageCard>
            }
        </div>
    );
};

export default BasicPlan;
