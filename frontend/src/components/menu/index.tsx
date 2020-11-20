import React, {useState} from 'react';

import { Hidden, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from './SideBar';

export interface MenuProps {
    
}
 
const Menu: React.FC<MenuProps> = () => {

    const [open, setOpen] = useState<boolean>(false);
    const toggleSideBar = () => {
        setOpen(!open);
    }

    const closeSideBar = () => {
        setOpen(false);
    }

    return (
        <>
            <Hidden smUp >
                <IconButton color="primary" onClick={toggleSideBar}>
                    <MenuIcon color="primary" />
                </IconButton>
            </Hidden>
            <SideBar />
        </>
    );
}
 
export default Menu;