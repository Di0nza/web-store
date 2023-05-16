import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._productsInBasket = []
        this._orders = []
        //this._productsInOrder = []
        this._user = {}
        this._phone = {}
        makeAutoObservable(this)
    }


    setIsAuth(bool) {
        this._isAuth = bool
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setUser(user) {
        this._user = user
    }
    setProductsInBasket(productsInBasket){
        this._productsInBasket = productsInBasket
    }

    // setProductsInOrder(productsInOrder){
    //     this._productsInOrder = productsInOrder
    // }
    setOrders(orders){
        this._orders = orders
    }
    setPhone(phone){
        this._phone = phone
    }
    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }

    get productsInBasket(){
        return this._productsInBasket
    }

    get phone(){
        return this._phone
    }

    get orders(){
        return this._orders
    }
    // get productsInOrder(){
    //     return this._productsInOrder
    // }
}