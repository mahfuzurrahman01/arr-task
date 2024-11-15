'use client';
import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleContainer, Divider, OfferButton } from "@/Styles/style-component";
import { fetchPlansInfo } from '@/utils/GetDataFunc';
const BillToggle = () => {
    const [toggleState, setToggleState] = useState(0);
    const [plansInfo, setPlansInfo] = useState({});
    const getData = async () => {
        const result = await fetchPlansInfo();
        const plansArray = Object.values(result);
        setPlansInfo(plansArray);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <ToggleContainer>
            {plansInfo.length > 0 && plansInfo.map((plan, index) => (
                <React.Fragment key={index}>
                    <ToggleButton
                        active={toggleState === index}
                        onClick={() => setToggleState(index)}
                    >
                        {plan.title}
                    </ToggleButton>
                    {index < plansInfo.length - 1 && <Divider></Divider>}
                    {plan.discount && (
                        <OfferButton>{plan.discount}</OfferButton>
                    )}
                </React.Fragment>
            ))}
        </ToggleContainer>
    );
};

export default BillToggle;