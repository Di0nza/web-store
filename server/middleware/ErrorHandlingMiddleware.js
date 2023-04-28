const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next){// принимает параметрами ошибку, запрос, ответ и функцию, которая будет вызвана следующей
    if(err instanceof ApiError){ // если классом ошибки является класс ApiError(наш кастомный класс), то
        return res.status(err.status).json({message: err.message}) // на клиент возрващаем ответ со статус кодом, который получаем из ошибки и сообщение, которое мы поместили в ошибку
    }
    return res.status(500).json({message: "unexpected error"}) //если ошибка не принадлежит ApiError, возвращаем ответ с сообщением о непредвиденной ошибке
}