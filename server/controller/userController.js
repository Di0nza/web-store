const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')// для хеширования пароля
const jwt = require('jsonwebtoken')
const db = require('../db')
const {json} = require("express");
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY || 'kjhsoihgfuibiu',
        {expiresIn: '5h'}
    )
}

class UserController {
    async registration(req, res, next) {
        let {email, password, role} = req.body
        if (!email || !password) { //TODO посмотреть нормальную валидацию
            return next(ApiError.badRequest('Некорректный email или пароль!'))
        }
        const candidate = await db.query(`SELECT email FROM users WHERE email = $1 LIMIT 1`, [email])
        console.log(candidate.rows.length)
        if (candidate.rows.length !== 0) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        if (typeof role === "undefined"){
            role = 'USER'
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const newUser = await db.query('INSERT INTO users (email, password, role) values ($1,$2,$3) returning *', [email, hashPassword, role])
        console.log(newUser.rows[0].id, newUser.rows[0].email, newUser.rows[0].role)
        const basket = await db.query('INSERT INTO basket (user_id) values ($1) returning id', [newUser.rows[0].id])
        const token = generateJwt(newUser.rows[0].id, email, role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await db.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email])
        console.log(user.rows.length)
        if (user.rows.length === 0) {
            return next(ApiError.badRequest('Пользователь с таким email не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
        if(!comparePassword){
            return next(ApiError.badRequest('Неверный пароль!'))
        }
        const token = generateJwt(user.rows[0].id, email, user.rows[0].role)
        return res.json({token})
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        console.log(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()