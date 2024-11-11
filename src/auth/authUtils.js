'use strict'
const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken -- privateKey
        const accessToken = await JWT.sign(payload, publicKey, {
            algorithm: 'RS256',
            expiresIn: '1d'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })

        // 
        JWT.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                console.error(`error verify access token::`, err)
            }else {
                console.log('decoded verify::', decoded)
            }
        });

        return { accessToken, refreshToken }  
    } catch (error) {   

    }
}

module.exports = { createTokenPair }