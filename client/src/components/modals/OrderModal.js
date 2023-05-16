import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, DropdownButton, Form, Image, Modal, Row} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import {Context} from "../../index";
import Dropdown from 'react-bootstrap/Dropdown';
import {useLocation} from "react-router-dom";
import {ORDER_ROUTE, PRODUCT_ROUTE} from "../../utils/consts";
import {fetchOneProduct} from "../../http/productApi";
import {fetchOneOrder, updateOrderStatusOnAdmin} from "../../http/orderApi";
import {observer} from "mobx-react-lite";

const OrderModal = observer(({show, onHide, orderId}) => {

    const [prodInOrder, setProdInOrder] = useState([])
    const {user} = useContext(Context)
    const location = useLocation()
    const isCommonOrderPage = location.pathname === ORDER_ROUTE
    const status = ['В обработке', 'Передан в доставку', 'Доставляется', 'Доставлен', 'Отказано', 'Закрыт']

    const refreshPage = ()=>{
        window.location.reload();
    }
    const setNewOrderStatus = async (id, newStatus) => {
        console.log('id i status ' + newStatus +' ' +id)
        const order = await updateOrderStatusOnAdmin({status: newStatus, id: id}).then(response => alert('Статус заказа обновлен')).then(response => refreshPage())
    }

    useEffect(() => {
        if (show) {
            fetchOneOrder({id: orderId}).then(data => setProdInOrder(data))
        }
    }, [orderId, show])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='xl'
            centered
        ><Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Заказ номер: {orderId}
            </Modal.Title>
        </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">

                <Card className="d-flex w-100 p-2 justify-content-center mb-2">
                    {prodInOrder.map(item =>
                        <Row key={item.id} className="m-2">
                            <Card md="2" className="d-inline-flex flex-row p-3">
                                <Col md="2" className="d-inline-flex flex-row">
                                    <div className="flex-row">
                                        <Image width={50} height={50} src={'http://localhost:5000/' + item.img}/>
                                    </div>
                                </Col>
                                <Col className="d-flex flex-row">
                                    <div className="flex-row">
                                        <h1 className="ms-2" style={{fontSize: "18px"}}>{item.name}</h1>
                                    </div>
                                </Col>
                                <Col className="d-flex flex-row justify-content-end align-items-center">
                                    <div className="flex-row">
                                        <h5 className="font-weight-light">{item.price} руб </h5>
                                    </div>
                                </Col>
                            </Card>
                        </Row>)}
                </Card>
            </Modal.Body>
            <Modal.Footer>
                {user.isAdmin && !isCommonOrderPage ?
                    <>
                        <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                        <DropdownButton title="Изменить статус заказа" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1"
                                           onClick={() => setNewOrderStatus(orderId, status[0])}
                            >
                                В обработке
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2"
                                           onClick={() => setNewOrderStatus(orderId, status[1])}
                            >
                                Передан в доставку
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3"
                                           onClick={() => setNewOrderStatus(orderId, status[2])}
                            >
                                Доставляется
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="4"
                                           onClick={() => setNewOrderStatus(orderId, status[3])}
                            >
                                Доставлен
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="5"
                                           onClick={() => setNewOrderStatus(orderId, status[4])}
                            >
                                Отказано
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="6"
                                           onClick={() => setNewOrderStatus(orderId, status[5])}
                            >
                                Закрыт
                            </Dropdown.Item>
                        </DropdownButton>

                    </>
                    :
                    <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                }
            </Modal.Footer>

        </Modal>
    );
});

export default OrderModal;