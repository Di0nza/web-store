import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import productPage from "../pages/ProductPage";
import {Context} from "../index";
import ProductItem from "./ProductItem";

const ProductList = observer (() => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex">
            {product.products.map(product =>
            <ProductItem key = {product.id} product = {product}/>
            )}

        </Row>
    );
});

export default ProductList;