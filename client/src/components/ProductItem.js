import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";
const ProductItem = ({product}) => {
    const history = useNavigate()
    return (
       <Col md ={3} className={'mt-3'} onClick={()=> history(PRODUCT_ROUTE + '/' + product.id)}>
           <Card style={{width:150, cursor: 'pointer'}} border={'light'}>
               <Image width={150} height={150} src={'http://localhost:5000/' + product.img}/>
               <div className="mt-2">{product.name}</div>
           </Card>
       </Col>
    );
};

export default ProductItem;