'use client';
import React, { useState } from 'react';
import { ToggleButton, ToggleContainer, Divider, OfferButton } from "@/Style/style-component";
const BillToggle = () => {
    const [toggleState, setToggleState] = useState(0);
    return (
        <ToggleContainer>
            <ToggleButton active={toggleState == 0} onClick={() => setToggleState(0)}>Billed monthly</ToggleButton>
            <Divider></Divider>
            <ToggleButton active={toggleState == 1} onClick={() => setToggleState(1)}>Billed yearly</ToggleButton>
            <OfferButton>Save 20% 😍</OfferButton>
        </ToggleContainer>
    );
};

export default BillToggle;