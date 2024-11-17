"use client"
import { ArrowIcon, CustomIcon, DropDown, DropDownContainer, DropdownList, FeaturesTitle, List, ListContainer, ListItem, Marker, MarkerForList, PackageCard, PackageName, Prefix, PriceText, SubmitButton, SupPrice, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';

import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllProPlan,  addProFeatures } from '../../Redux/actions/planAction';
import { getRefinedFeatureList } from '@/utils/component-utils/reusedFunc';

const ProPlan = () => {
    // ========================== store where we are storing our all data from json file =====================
    const [proPlan, setProPlan] = useState({})
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.plan);
    const allProPlan = store?.proPlan;
    const features = store?.proFeatures;
    const planCycle = store?.value;
    const getDataForProPlan = async () => {
        const result = await fetchData("Pro");
        // =============adding to store ============
        dispatch(addAllProPlan(result));
        const initialPlan = result[0];
        setProPlan(initialPlan);
    }

    const getFeature = async () => {
        const featureArr = await fetchPlansFeature("1");
        const newArr = getRefinedFeatureList(proPlan, featureArr);
        dispatch(addProFeatures(newArr));
        setLoader(false);
    }

   
    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getDataForProPlan();
    }, []);

    useEffect(() => {
        if (proPlan?.title) {
            getFeature();
        }
        if (allProPlan > 0 && proPlan?.title) {
            setLoader(false);
        }
    }, [proPlan])


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
        setProPlan(item)
        setDropdownState(false)
    }


    return (
        <div>
            {
                proPlan?.title && !loader && <PackageCard packageId="pro">
                    <PackageName>{proPlan?.name}</PackageName>
                    <PriceText packageId="pro">{planCycle == 'monthly' ? proPlan?.details["1_year"].price : proPlan?.details["2_year"].price}
                        <Prefix>{planCycle == 'monthly' ? proPlan?.details["1_year"].price_postfix : proPlan?.details["2_year"].price_postfix}</Prefix>
                        {
                            planCycle == 'yearly' && <SupPrice>{proPlan?.details["1_year"].price}{proPlan?.details["1_year"].price_postfix}</SupPrice>
                        }
                    </PriceText>
                    {
                        allProPlan?.length == 1 ? <Title packageId="pro">
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
                        </Title> : <DropDownContainer ref={dropdownContainerRef} packageId="pro">
                            <DropDown packageId="pro" onClick={() => setDropdownState(!dropdownState)}>
                                {proPlan?.title.replace(/<\/?strong>/g, '').split('/')[0]}...
                                <ArrowIcon active={dropdownState}></ArrowIcon>
                            </DropDown>
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="pro">i</CustomIcon>
                                <TooltipText active={isHovered}>{proPlan?.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>

                        </DropDownContainer>
                    }
                    {
                        <DropdownList ref={dropdownListRef} active={dropdownState}>
                            {
                                allProPlan?.map((item) => <ListItem onClick={() => addNewPlan(item)} active={proPlan?.price == item?.price} packageId="pro" key={item?.title}>{item?.title.replace(/<\/?strong>/g, '')}</ListItem>)
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
                    <SubmitButton packageId="pro">Select Plan</SubmitButton>

                </PackageCard>
            }
        </div>
    );
};

export default ProPlan;
