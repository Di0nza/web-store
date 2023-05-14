import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            console.log(data)
            if (data.role === 'ADMIN') {
                user.setIsAdmin(true)
            } else {
                user.setIsAdmin(false)
            }
            user.setUser(data.id)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
            console.log(user)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 50}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-center mt-3">
                        {isLogin ?
                            <div>
                                <NavLink to={REGISTRATION_ROUTE} style={{color: 'black'}}> Регистрация </NavLink>
                            </div>
                            :
                            <div>
                                <NavLink to={LOGIN_ROUTE} style={{color: 'black'}}> Войти </NavLink>
                            </div>
                        }
                        <Button className="mt-3" style={{width: 300}}
                                variant={"outline-dark"}
                                onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>

                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;