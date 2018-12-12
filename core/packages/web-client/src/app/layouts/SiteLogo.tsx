import styled from "styled-components";
import * as React from "react";
const logo = require("./logo.svg") as string;


const SiteLogoWrapper = styled.div`
height: 96px;
display: flex;
align-items: center;
justify-content: center; 
`;
const LogoImg = styled.img`
width: 50px;
margin-right: 13px;
`;
const LogoText = styled.span`
vertical-align: text-bottom;
font-size: 20px;
color: #1890ff;
text-transform: uppercase;
display: inline-block;
font-weight: 700;
white-space: nowrap;  
` ;

const SiteLogo = () => {
    return (
        <SiteLogoWrapper>
            <LogoImg src={logo} />
            <LogoText>Ditto</LogoText>
        </SiteLogoWrapper>
    )
}

export default SiteLogo;
