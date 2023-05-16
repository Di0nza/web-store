import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {deleteFromBasket, getBasket} from "../http/productApi";
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../utils/consts";
import {createOrder} from "../http/orderApi";
import PhoneModal from "../components/modals/PhoneModal";
import CreateBrand from "../components/modals/CreateBrand";


const Basket = observer(() => {
    const {user, product} = useContext(Context)
    const history = useNavigate()
    const [phoneVisible, setPhoneVisible] = useState(false)
    let prices = 0;
    {
        user.productsInBasket.map(item =>
            prices += item.price
        )
    }

    useEffect(() => {
        getBasket().then(data => user.setProductsInBasket(data))
        console.log(user.productsInBasket)
    }, [])

    const refreshPage = () => {
        window.location.reload();
    }
    const deleteProdFromBasket = async (id) => {
        deleteFromBasket({id: id}).then(response => alert(`Товар успешно удален из корзины!`)).then(response => refreshPage())
    }


    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>

            {/* ------- Считаем общую сумму ------- */}

            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <Container className="align-items-center d-flex">
                    <h2 className="align-self-end">К оплате:</h2>
                    <h3 className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> руб </span>
                    </h3>
                </Container>
            </Card>
            {user.productsInBasket.map(item =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={item.id}>
                    <Row>
                        <Col md="2" className="d-inline-flex flex-row">
                            <div className="flex-row">
                                <Image width={100} height={100} src={'http://localhost:5000/' + item.img}
                                       onClick={() => history(PRODUCT_ROUTE + '/' + item.product_id)}
                                       style={{cursor: "pointer"}}/>
                            </div>
                        </Col>
                        <Col className="d-flex flex-row" onClick={() => history(PRODUCT_ROUTE + '/' + item.product_id)}
                             style={{cursor: "pointer"}}>
                            <div className="flex-row">
                                <h1 className="ms-2" style={{fontSize: "30px"}}>{item.name}</h1>
                            </div>
                        </Col>
                        <Col className="d-flex flex-row justify-content-end align-items-center"
                             onClick={() => history(PRODUCT_ROUTE + '/' + item.product_id)} style={{cursor: "pointer"}}>
                            <div className="flex-row">
                                <h2 className="font-weight-light">{item.price} руб </h2>
                            </div>
                        </Col>
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                            <div className="flex-row">
                                <Button variant={"danger"} onClick={() => deleteProdFromBasket(item.id)}
                                        size="lg"> X </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}
            {user.productsInBasket.length !== 0 ?
                <Button className="m-3" style={{width: 300}}
                        size="lg"
                        variant={"outline-dark"}
                        onClick={() => setPhoneVisible(true)}
                >
                    Оформить заказ
                </Button> : null}
            <PhoneModal show={phoneVisible} onHide={() => setPhoneVisible(false)}/>
        </Container>
    );
});

export default Basket;