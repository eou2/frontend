import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../images/EF_Logo.png";

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    background-color: #fff;
`;

const Logo = styled.img`
    height: 50px;
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.show ? "block" : "none")};
`;

const MenuItem = styled(Link)`
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <NavbarContainer>
            <Logo src={logo} alt="Logo" />
            <MenuButton onClick={toggleMenu}>☰</MenuButton>
            <DropdownMenu show={showMenu}>
                <MenuItem to="/settings">환경설정</MenuItem>
                <MenuItem to="/logout">로그아웃</MenuItem>
            </DropdownMenu>
        </NavbarContainer>
    );
};

export default Navbar;
