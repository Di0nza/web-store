import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {addToBasket, fetchOneProduct} from "../http/productApi";


const ProductPage = () => {
    const [product, setProduct] = useState({info: {}.toString()})
    const {id} = useParams()
    const parseInfo = (info) => {
        if (info === '{NULL}') {
            return []
        }
        info = info.replaceAll(/\\"/g, '')
        console.log(info)
        return info.substring(2, info.length - 2).split('","').map(item => {
            const array = item.substring(1, item.length - 1).split(',');
            return {id: array[0], product_id: array[1], title: array[2], description: array[3]};
        });
    }

    const addProdToBasket = async () => {
        try {
            await addToBasket({product_id: id}).then(response => alert(`Товар ` + product.name + ` был добавлен в вашу корзину!`))
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])
    return (
        <Container className="mt-3">
            <Row>
                <Col md={2}>
                    <Image height={250} width={200} src={'http://localhost:5000/' + product.img}/>
                </Col>
                <Col md={9} className="justify-content-around">
                    <Card
                        className="d-flex flex-column p-2"
                        style={{height: 250, border: '5px solid lightgray'}}>
                        <Row>
                            <h2> Описание</h2>
                            <h6 style={{color: "black"}}>{product.description}</h6>
                        </Row>
                        <h3 className="mt-auto"> Цена: {product.price} руб</h3>
                        <Button className="mt-auto " variant={"outline-dark"} onClick={() => addProdToBasket()}>Добавить
                            в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {parseInfo(product.info).map((item, index) =>
                    <Row key={item.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
                        {item.title} : {item.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default ProductPage;