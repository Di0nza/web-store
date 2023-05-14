import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token') !== null) {
            check().then(data => {
                user.setUser(data.id)
                user.setIsAuth(true)
                console.log(data.role)
                if (data.role === 'ADMIN') {
                    user.setIsAdmin(true)
                } else {
                    user.setIsAdmin(false)
                }
                console.log('check', user)
            }).finally(() => setLoading(false))
        }//todo выход с рабочим админом
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
