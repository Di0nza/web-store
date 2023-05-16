import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { fetchBrands, fetchProducts, fetchTypes} from "../http/productApi";
import Pages from "../components/Pages";
import SearchBar from "../components/SearchBar";


const Shop = observer(() => {
    const {product} = useContext(Context)
    useEffect(()=>{
        product.setSearchName('')
        product.setSelectBrand({})
        product.setSelectType({})
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts(null,null,1,5, '').then(data => {
            product.setProducts(data[0])
            product.setTotalCount(data[1])
            console.log('totaCount:' + data[1])
        }
    )
    }, [])

    useEffect(()=>{
        fetchProducts(product.selectedType.id ,product.selectedBrand.id, product.page, 5, product.searchName).then(data => {
            product.setProducts(data[0])
            product.setTotalCount(data[1])
        })
        }, [product.page, product.selectedType ,product.selectedBrand, product.searchName]
    )

    return (
        <Container>
            <Row className="mt-3">
                <Col md = {3} >
                    <div className="m-lg-1" style={{fontSize:'20px', color:'#212529', fontFamily:'Ariel'}}>Типы товаров</div>
                    <TypeBar/>
                    <div className="m-lg-1" style={{fontSize:'20px', color:'#212529', fontFamily:'Ariel'}}>Бренды товаров</div>
                    <BrandBar/>


                </Col>
                <Col md = {9} >
                    <SearchBar/>
                    <ProductList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;