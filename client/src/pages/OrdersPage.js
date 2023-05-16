import React, {useContext, useEffect, useState} from 'react';
import {getBasket} from "../http/productApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchOrdersOnUser} from "../http/orderApi";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/consts";
import PhoneModal from "../components/modals/PhoneModal";
import OrderModal from "../components/modals/OrderModal";

const OrdersPage = observer(() => {
    const {user} = useContext(Context)
    const [orderModelVisible, setOrderModelVisible] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState(0)

    useEffect(() => {
        fetchOrdersOnUser().then(data => user.setOrders(data))
    }, [])



    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Заказы</h1>
            {user.orders.map(item =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2 p-2"
                      style={{cursor:'pointer'}}
                      key={item.id}>
                    <Row onClick={() => {
                        setOrderModelVisible(true)
                        setCurrentOrderId(item.id)
                    }}>
                        <Col md="2" className="d-inline-flex flex-column">
                            <div className="flex-column">
                                <h4>Номер заказа:</h4>
                                <h4 className="text-center">{item.id}</h4>
                            </div>
                        </Col>
                        <Col className="d-flex flex-row">
                            <div className="flex-row">
                                <h4 className="ms-2">Сумма заказа:</h4>
                                <h4 className="ms-2 text-center">{item.price} руб</h4>
                            </div>
                        </Col>
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                            <div className="flex-row">
                                <h4 className="font-weight-light">Дата оформления заказа:</h4>
                                <h4 className="font-weight-light text-center">{item.created_at}</h4>
                            </div>
                        </Col>
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                            <div className="flex-row">
                                <h4 className="font-weight-light">Cтатус заказа:</h4>
                                <h4 className="align-items-center text-center">{item.status}</h4>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}
            <OrderModal show={orderModelVisible} onHide={() => setOrderModelVisible(false)} orderId={currentOrderId}/>
        </Container>
    );
});

export default OrdersPage;