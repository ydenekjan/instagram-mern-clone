import express from 'express';
import {User} from '../models/userModel.js';

const router = express.Router()

router.get('/', async (request, response) => {
    try {

        const users = await User.find({})

        return response.status(200).json({
            count: users.length,
            data: users
        })

    } catch (error) {
        console.log(error)
        return response.status(500).send({message: error.message})
    }
})

router.post('/', async (request, response) => {
    try {

        if (
            !request.body.username ||
            !request.body.firstName ||
            !request.body.lastName
        ) {
            return response.status(400).send({message: 'Send all required data'})
        }

        const newUser = {
            username: request.body.username,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
        }

        const user = await User.create(newUser)

        return response.status(201).send(user)
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params

        const user = await User.findById(id)

        return response.status(200).json(user)

    } catch (error) {
        console.log(error)
        return response.status(500).send({message: error.message})
    }
})

router.put('/:id', async (request, response) => {
    try {

        if (
            !request.body.username ||
            !request.body.firstName ||
            !request.body.lastName
        ) {
            return response.status(400).send({message: 'Send all required data'})
        }

        const { id } = request.params

        const result = await User.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status((404)).send({message: "User not found"})
        }

        return response.status(200).send({message: 'User edited successfully'})

    } catch (error) {
        console.log(error)
        return response.status(500).send({message: error.message})
    }
})

router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params

        const result = await User.findByIdAndDelete(id)

        if (!result) {
            return response.status((404)).send({message: "User not found"})
        }

        return response.status(200).send({message: 'User deleted successfully'})

    } catch (error) {
        console.log(error)
        return response.status(500).send({message: error.message})
    }
})

export default router