import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { TYPES, DEFAULT_TYPE } from '../config';

import './Navbar.css';

// title of gooloo dropdowns showing what is selected
const navTitle = (d, selected) => {
    return <div>
        <img className="dropdown-img img-thumbnail" src={selected[d.name]} alt={d.name} />
        <span>{`${d.title}`}</span>
    </div>;
};

// create the gooloo body parts dropdowns
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
        // const types = d.name.indexOf('hat') !== -1 ? HAT_TYPES : TYPES;
        return <NavDropdown title={navTitle(d, selected)} key={di}>
            {d.assets.map((k, ki) => {
                const url = `/assets/${k}`;
                return <NavDropdown.Item key={ki} onClick={() => onClick(d, url)} active={selected[d.name] === url}>
                    <img className="dropdown-img img-thumbnail" src={url} alt={d.name} />
                    <span>{`${d.title} ${k}`}</span>
                </NavDropdown.Item>
            })}
        </NavDropdown>
    });
};

// MAIN NAVBAR COMPONENT
const NavbarComponent = (props) => {
    const [selectedMale, setSelectedMale] = useState(DEFAULT_TYPE.defaultMale);
    const [selectedFemale, setSelectedFemale] = useState(DEFAULT_TYPE.defaultFemale);
    const [type, setType] = useState(DEFAULT_TYPE.value);

    useEffect(() => {
        props.getGooloo(selectedMale, selectedFemale);
    }, [props, selectedMale, selectedFemale]);

    // gooloo body parts dropdowns
    const goolooNavs = () => {
        const goolooType = TYPES.find(k => k.value === type);
        const obj = [
            { parts: goolooType.bodyPartMale, state: selectedMale, setState: setSelectedMale },
            { parts: goolooType.bodyPartFemale, state: selectedFemale, setState: setSelectedFemale },
        ];

        return obj.map((k, i) => {
            return <Nav className="mr-auto nav-left" key={i}>
                {createDropdowns(k.state, k.setState, k.parts)}
            </Nav>
        });
    };

    // **** Type Dropdown ****

    // dropdown title of type selected 
    const typeTitle = () => {
        return TYPES.find(k => k.value === type).title;
    };

    // on click to change type
    const onClickType = (value) => {
        const goolooType = TYPES.find(k => k.value === value);
        setType(value);
        setSelectedMale(goolooType.defaultMale);
        setSelectedFemale(goolooType.defaultFemale);
    };

    // type dropdowns of gooloo types
    const typeDropdown = () => {
        const types = TYPES.map((k, i) => {
            return <NavDropdown.Item key={i} onClick={() => onClickType(k.value)} active={type === k.value}>
                <span>{k.title}</span>
            </NavDropdown.Item>;
        });
        return <Nav className="mr-auto nav-left">
            <NavDropdown title={typeTitle()}>
                {types}
            </NavDropdown>
        </Nav>;
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Gooloos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

               {typeDropdown()} 

               {goolooNavs()}
            </Navbar.Collapse>
        </Navbar>
    )
}; 

export default NavbarComponent;