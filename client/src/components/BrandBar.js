import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, ListGroup, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup>
            {product.brands.map(brand=>
            <ListGroup.Item
                style={{cursor:'pointer'}}
                active={brand.id === product.selectedBrand.id}
                onClick={()=> product.setSelectBrand(brand)}
                key = {brand.id}
            >
                {brand.name}
            </ListGroup.Item>
            )}
            </ListGroup>
    );
});

export default BrandBar;