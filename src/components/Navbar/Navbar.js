import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';


export const NavBar = (props) => {

    //const [isOpen, changeIsOpen] = useState(false);

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>Cine Brrr</NavbarBrand>
        </Navbar>
    );
};