import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    const location = useLocation()
    const isBasket =  location.pathname === BASKET_ROUTE

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        localStorage.removeItem('token')
        history(SHOP_ROUTE)
        console.log(user)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavbarBrand style={{cursor:'pointer'}}
                             onClick={() => history(SHOP_ROUTE)}
                >KraskaShop</NavbarBrand>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        {user.isAdmin ?
                            <>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history(ADMIN_ROUTE)}
                                    className="m-lg-1"
                                >
                                    Admin
                                </Button>
                                {!isBasket ? <Button
                                    variant={"outline-light"}
                                    onClick={() => history(BASKET_ROUTE)}
                                    className="m-lg-1"
                                >
                                    Корзина
                                </Button> : null}
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="m-lg-1"
                                >
                                    Выйти
                                </Button>


                            </>
                            :
                            <>
                            {!isBasket ? <Button
                                    variant={"outline-light"}
                                    onClick={() => history(BASKET_ROUTE)}
                                    className="m-lg-1"
                                >
                                    Корзина
                                </Button> : null}
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="m-lg-1"
                                >
                                    Выйти
                                </Button>
                            </>

                        }
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} className="m-lg-1" onClick={() => history(LOGIN_ROUTE)}>Войти</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;