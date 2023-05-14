import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {createProduct, fetchBrands, fetchProducts, fetchTypes} from "../../http/productApi";
import {observer} from "mobx-react-lite";

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(()=>{
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
    }, [])


    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value}:i))
    }
    const selectFile = e =>{
        setFile(e.target.files[0])
    }

    const addProduct =() =>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('description', description)
        formData.append('brand_id', product.selectedBrand.id)
        formData.append('type_id', product.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип товара
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-3 mb-3">
                        <DropdownToggle>{product.selectedType.name || 'Выберите тип'}</DropdownToggle>
                        <DropdownMenu>
                            {product.types.map(type =>
                                <Dropdown.Item onClick={()=> product.setSelectType(type)} key={type.id}> {type.name} </Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className="mt-3 mb-3">
                        <DropdownToggle>{product.selectedBrand.name || 'Выберите тип'}</DropdownToggle>
                        <DropdownMenu>
                            {product.brands.map(brand =>
                                <Dropdown.Item onClick={()=> product.setSelectBrand(brand)} key={brand.id}> {brand.name} </Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control
                        value = {name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Control
                        value = {price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите цену товара"
                        type="number"
                    />
                    <Form.Control
                        value = {description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание товара"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo}>Добавить новое свойство</Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e)=> changeInfo('title', e.target.value, i.number)}
                                    placeholder="Характеристика"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e)=> changeInfo('description', e.target.value, i.number)}
                                    placeholder="Описание характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;