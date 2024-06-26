import React from 'react';
import {Theme} from "@radix-ui/themes";

const MainTheme = ({children, zIndex}) => {
    return (
        <Theme appearance={'dark'} style={{zIndex, width: '100%', display: 'flex', alignItems: 'center'}}>
            {children}
        </Theme>
    );
};

export default MainTheme;