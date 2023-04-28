class ApiError extends Error{ // класс наследуется от родительского класса Error
    constructor(status, message) {
        super(); //вызов родительского конструктора Error
        this.status = status //присваивание того, что получили параметрами
        this.message = message
    }

    static badRequest(message){
        return new ApiError(404, message)
    }

    static internal(message){
        return new ApiError(500, message)
    }

    static forbidden(message){
        return new ApiError(403, message)
    }
}

module.exports = ApiError