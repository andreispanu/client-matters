import React from "react";
import { PageLayoutProps } from "./PageLayout.types";
import { StyledPageLayout } from "./PageLayout.styles";

export const PageLayout = ({ children }:PageLayoutProps) => {
    return (
        <StyledPageLayout>
        {children}
        </StyledPageLayout>
    );
}