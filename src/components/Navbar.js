import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import {
    TYPES,
    HAT_TYPES,
    DEFAULT_MALE,
    DEFAULT_FEMALE,
    BODY_PARTS_FEMALE,
    BODY_PARTS_MALE
} from '../config';

import './Navbar.css';

const navTitle = (d, selected) => {
    return <div>
        <img className="dropdown-img img-thumbnail" src={selected[d.name]} alt={d.name} />
        <span>{`${d.title}`}</span>
    </div>;
};

const createDropdowns = (selected, setSelected, bodyParts) => {
    const onClick = (d, url) => {
        const temp = {};
        temp[d.name] = url;
        const obj = {
            ...selected,
            ...temp
        };
        setSelected(obj);
    };

    return bodyParts.map((d, di) => {
        const types = d.name.indexOf('hat') !== -1 ? HAT_TYPES : TYPES;
        return <NavDropdown title={navTitle(d, selected)} key={di}>
            {types.map((k, ki) => {
                const url = `/assets/${d.name}-${k}.svg`;
                return <NavDropdown.Item key={ki} onClick={() => onClick(d, url)} active={selected[d.name] === url}>
                    <img className="dropdown-img img-thumbnail" src={url} alt={d.name} />
                    <span>{`${d.title} ${k}`}</span>
                </NavDropdown.Item>
            })}
        </NavDropdown>
    });
};

const NavbarComponent = (props) => {
    const [selectedMale, setSelectedMale] = useState(DEFAULT_MALE);
    const [selectedFemale, setSelectedFemale] = useState(DEFAULT_FEMALE);

    useEffect(() => {
        props.getGooloo(selectedMale, selectedFemale);
    }, [props, selectedMale, selectedFemale]);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Gooloos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto nav-left">
                {createDropdowns(selectedMale, setSelectedMale, BODY_PARTS_MALE)}
                </Nav>
                <Nav className="mr-auto nav-right">
                {createDropdowns(selectedFemale, setSelectedFemale, BODY_PARTS_FEMALE)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}; 

export default NavbarComponent;