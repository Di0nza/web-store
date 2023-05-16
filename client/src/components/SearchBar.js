import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";


const SearchBar = observer(() => {

    const {product} = useContext(Context)
    const [search, setSearch] = useState('')
    const history = useNavigate()
    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault()
            click()
        }
    }
    const click = async () =>{
        try{
            product.setSearchName(search)
            console.log(product.searchName)
            history("/")

        }catch (e){
            alert(e.response.data.message)
        }
    }
    return (
        <Form className="d-flex flex-column">
            <Form.Control
                className="mt-3"
                placeholder="Поиск по названию"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </Form>
    );
});

export default SearchBar;