import { render } from "ink";
import { ReactNode } from "react";
import React from 'react';

export const baseRender = (commandComponent: ReactNode) => {
    render(
        <>
            {/* <Gradient name="rainbow"> 
                <BigText text="Thin Air"/> 
            </Gradient> */}
            {commandComponent}
        </>
    );
}