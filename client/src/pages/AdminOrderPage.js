import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchOrdersOnAdmin, fetchOrdersOnUser} from "../http/orderApi";
import {Card, Col, Container, Row} from "react-bootstrap";
import OrderModal from "../components/modals/OrderModal";
import {observer} from "mobx-react-lite";

const AdminOrderPage = observer(() => {

    const [orders, setOrders] = useState([])

    const [orderModelVisible, setOrderModelVisible] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState(0)

    useEffect(() => {
        fetchOrdersOnAdmin().then(data => setOrders(data))
    }, [])



    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Пользовательские заказы</h1>
            {orders.map(item =>
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
                                <h4 className="ms-2">Номер для связи:</h4>
                                <h4 className="ms-2 text-center">{'+' + item.phone_number}</h4>
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
                                <h4 className="font-weight-light">Дата оформления:</h4>
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

export default AdminOrderPage;