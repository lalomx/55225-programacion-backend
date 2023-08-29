const { Router } = require('express')
const { authToken } = require('../../utils/jwt.utils')

class CustomRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {
        // 
    }

    getRouter() { return this.router }
    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
        // policies
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map((cb) => async (...params) => {
            try {
                await cb.apply(this, params)
            } catch (e) {
                console.log(e)
                params[1].sendError(e)
            }
        })
    }

    generateCustomResponses(req, res, next) {
        res.sendError = ({ stack }) => res.status(500).send({
            success: false,
            error: stack
        })

        next()
    }

    handlePolicies(policies) {
        return (req, res, next) => {
            if (policies[0] == "PUBLIC") {
                return next()
            }
            
            const authHeaders = req.headers.authorization

            if (!authHeaders) {
                return res.status(401).send({
                    error: "Not a valid user"
                })
            }

            const token = authHeaders.split(' ')[1]

            const user = req.user

            console.log(user)

            if (!policies.includes(user.role.toUpperCase())) {
                return res.status(403).send({
                    success: false,
                    error: "Forbbiden"
                })
            }
            next()
        }
    }
}

module.exports = CustomRouter