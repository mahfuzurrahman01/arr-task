"use client"
import { ArrowIcon, CustomIcon, DropDown, DropDownContainer, DropdownList, FeaturesTitle, List, ListContainer, ListItem, Marker, MarkerForList, PackageCard, PackageName, PriceText, SubmitButton, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';
import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';

const FreePlan = () => {
    // ========================== store where we are storing our all data from json file =====================
    const [allFreePlan, setAllFreePlan] = useState([]);
    const [freePlan, setFreePlan] = useState({});

    const [features, setFeatures] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);

    const getData = async () => {
        const result = await fetchData("Free");
        console.log("growth filter result", result[0]);
        const initialPlan = result[0];
        setAllFreePlan(result);
        setFreePlan(initialPlan);
        getFeature();
    }

    const getFeature = async () => {
        const result = await fetchPlansFeature("0");
        // console.log(result)
        setFeatures(result);
    }

    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getData();
    }, []);

    //  ============ as we have to add first feature dynamically so we will trigger this useEffect ===========

    useEffect(() => {
        if (freePlan?.title && features?.length > 0) {
            const freePlanTitle = freePlan?.title;
            const freePlanText = freePlan?.text;
            const refinedTitle = freePlanTitle.replace(/<\/?strong>/g, '');
            // ========== new body for the feature =========
            const newBody = {
                is_pro: '1',
                feature_title: refinedTitle,
                feature_desc: freePlanText,
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
        console.log(item)
        setFreePlan(item);
    }


    return (
        <div>
            {
                freePlan?.title && !loader && <PackageCard packageId="free">
                    <PackageName>{freePlan?.name}</PackageName>
                    <PriceText packageId="free">{freePlan?.price}</PriceText>
                    {
                        allFreePlan?.length == 1 ? <Title packageId="free">
                            <TitleContent
                                dangerouslySetInnerHTML={{
                                    __html: freePlan?.title,
                                }}
                            />
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="free">i</CustomIcon>
                                <TooltipText active={isHovered}>{freePlan.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>
                        </Title> : <DropDownContainer ref={dropdownContainerRef} packageId="free">
                            <DropDown packageId="free" onClick={() => setDropdownState(!dropdownState)}>
                                {freePlan?.title.replace(/<\/?strong>/g, '').split('/')[0]}...
                                <ArrowIcon active={dropdownState}></ArrowIcon>
                            </DropDown>
                            <CustomIcon packageId="free">i</CustomIcon>

                        </DropDownContainer>
                    }
                    {
                        <DropdownList ref={dropdownListRef} active={dropdownState}>
                            {
                                allFreePlan?.map((item) => <ListItem onClick={() => addNewPlan(item)} active={freePlan?.price == item?.price} packageId="free" key={item?.title}>{item?.title.replace(/<\/?strong>/g, '')}</ListItem>)
                            }
                        </DropdownList>
                    }
                    <FeaturesTitle>Free includes: </FeaturesTitle>
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
                    <SubmitButton packageId="free">Select Plan</SubmitButton>

                </PackageCard>
            }
        </div>
    );
};

export default FreePlan;
