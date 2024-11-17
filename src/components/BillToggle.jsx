'use client';
import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleContainer, Divider, OfferButton } from "@/Styles/style-component";
import { fetchPlansInfo } from '@/utils/GetDataFunc';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthlyPlan, setYearlyPlan } from '../../Redux/actions/planAction';
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

    const store = useSelector((state) => state?.plan);
    useEffect(() => {
        if (store?.value == 'monthly') {

            setToggleState(0);
        } else {

            setToggleState(1);
        }

    }, [store])
    // ========== toggle the billing method =======

    const toggleHandle = (index) => {
        if (index == 0) {
            dispatch(setMonthlyPlan());
        } else if (index == 1) {
            dispatch(setYearlyPlan());
        }
    }

    // ========== redux =================
    const dispatch = useDispatch();


    return (
        <ToggleContainer>
            {plansInfo.length > 0 && plansInfo.map((plan, index) => (
                <React.Fragment key={index}>
                    <ToggleButton
                        active={toggleState === index}
                        onClick={() => toggleHandle(index)}
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