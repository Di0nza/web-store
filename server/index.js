require('dotenv').config() //подключение файла .env, оттуда дергаем нашу среду, т.е. константы описывающие порты, имена бд и тд.
const express = require('express') // подключение express, про него https://expressjs.com/ru/
//const sequelize = require('./database') // подключение файла с инициализацией бд
const cors = require('cors') // про cors https://habr.com/ru/companies/macloud/articles/553826/
const router = require('./routes/index') // импорт роутеров, т.е. те штуки, которые описывают адреса, на которые приходят запросы
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || "5000" // переменная порта для сервера(указана в .env файле)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)// обработка ошибок. Должна идти в самом конце, т.к. это заключающий middleware, на нем прекращается работа и мы отправляем пользоввателю ответ
const start = async ()=>{ //функция для старта сервака, вызов асинхронной функции для подключение к БД
    try{
        app.listen(PORT, ()=>console.log(`Server successfully started on port ${PORT}`)) // добавление слушателя для отклика на запуск сервера
    }catch (e) {
        console.log(e)
    }
}

start() // вызов функции старта сервака
