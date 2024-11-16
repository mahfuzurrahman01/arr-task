"use client"
import { ArrowIcon, CustomIcon, DropDown, DropDownContainer, DropdownList, FeaturesTitle, List, ListContainer, ListItem, Marker, MarkerForList, PackageCard, PackageName, PriceText, SubmitButton, Title, TitleContent, ToolTipIcon, TooltipText, TooltipTextList, TooltipWrapper } from '@/Styles/style-component';
import { fetchData, fetchPlansFeature } from '@/utils/GetDataFunc';
import React, { useEffect, useRef, useState } from 'react';

const BasicPlan = () => {
    // ========================== store where we are storing our all data from json file =====================
    const [allBasicPlan, setAllBasicPlan] = useState([]);
    const [basicPlan, setBasicPlan] = useState({});

    const [features, setFeatures] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered list item index
    const [loader, setLoader] = useState(true);
    const [dropdownState, setDropdownState] = useState(false);

    const getData = async () => {
        const result = await fetchData("Basic");
        console.log("growth filter result", result[0]);
        const initialPlan = result[0];
        setAllBasicPlan(result);
        setBasicPlan(initialPlan);
        getFeature();
    }

    const getFeature = async () => {
        const result = await fetchPlansFeature("1");
        // console.log(result)
        setFeatures(result);
    }

    // ============= with the help of this use effect we will fetch the data for the first render ============

    useEffect(() => {
        getData();
    }, []);

    //  ============ as we have to add first feature dynamically so we will trigger this useEffect ===========

    useEffect(() => {
        if (basicPlan?.title && features?.length > 0) {
            const basicPlanTitle = basicPlan?.title;
            const basicPlanText = basicPlan?.text;
            const refinedTitle = basicPlanTitle.replace(/<\/?strong>/g, '');
            // ========== new body for the feature =========
            const newBody = {
                is_pro: '1',
                feature_title: refinedTitle,
                feature_desc: basicPlanText,
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
        setBasicPlan(item);
    }


    return (
        <div>
            {
                basicPlan?.title && !loader && <PackageCard packageId="basic">
                    <PackageName>{basicPlan?.name}</PackageName>
                    <PriceText packageId="basic">{basicPlan?.price}</PriceText>
                    {
                        allBasicPlan?.length == 1 ? <Title packageId="basic">
                            <TitleContent
                                dangerouslySetInnerHTML={{
                                    __html: basicPlan?.title,
                                }}
                            />
                            <ToolTipIcon onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}> <CustomIcon packageId="basic">i</CustomIcon>
                                <TooltipText active={isHovered}>{basicPlan.text}
                                    <Marker />
                                </TooltipText>
                            </ToolTipIcon>
                        </Title> : <DropDownContainer ref={dropdownContainerRef} packageId="basic">
                            <DropDown packageId="basic" onClick={() => setDropdownState(!dropdownState)}>
                                {basicPlan?.title.replace(/<\/?strong>/g, '').split('/')[0]}...
                                <ArrowIcon active={dropdownState}></ArrowIcon>
                            </DropDown>
                            <CustomIcon packageId="basic">i</CustomIcon>

                        </DropDownContainer>
                    }
                    {
                        <DropdownList ref={dropdownListRef} active={dropdownState}>
                            {
                                allBasicPlan?.map((item) => <ListItem onClick={() => addNewPlan(item)} active={basicPlan?.price == item?.price} packageId="basic" key={item?.title}>{item?.title.replace(/<\/?strong>/g, '')}</ListItem>)
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
                    <SubmitButton packageId="basic">Select Plan</SubmitButton>

                </PackageCard>
            }
        </div>
    );
};

export default BasicPlan;
