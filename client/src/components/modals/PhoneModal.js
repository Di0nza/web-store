import React, {useContext, useState} from 'react';
import {createBrand} from "../../http/productApi";
import {Context} from "../../index";
import {Button, Form, Modal} from "react-bootstrap";
import {createOrder} from "../../http/orderApi";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

const PhoneModal = ({show, onHide}) => {
    const {user} = useContext(Context)
    const [value, setValue] = useState('')

    const refreshPage = ()=>{
        window.location.reload();
    }
    const addOrder = async () => {
        user.setPhone(value)
        const formData = new FormData()
        formData.append('productsInOrder', JSON.stringify(user.productsInBasket))
        formData.append('phone_number', user.phone)

        await createOrder(formData).then(response => alert('Заказ успешно создан')).then(response => refreshPage())
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        ><Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Номер телефона для подтверждения заказа
            </Modal.Title>
        </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
                <Form >
                    <PhoneInput

                        country={'by'}
                        value={value}
                        onChange={setValue}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Отмена</Button>
                <Button variant={"outline-success"} onClick={addOrder}>Подтвердить заказ</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default PhoneModal;