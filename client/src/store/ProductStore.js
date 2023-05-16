import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._searchName = ''
        this._types = []
        this._brands = []
        this._products = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setBrands(brands){
        this._brands = brands
    }
    setTypes(types){
        this._types = types
    }

    setProducts(products){
        this._products = products
    }

    setSelectType(type){
        this.setPage(1)
        this._selectedType = type
    }

    setSelectBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount
    }

    setSearchName(searchName){
        this._searchName = searchName
    }

    get brands(){
        return this._brands
    }
    get types(){
        return this._types
    }

    get products(){
        return this._products
    }

    get selectedType(){
        return this._selectedType
    }

    get selectedBrand(){
        return this._selectedBrand
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }

    get searchName(){
        return this._searchName
    }


}