const shopModel = require("../models/shop.model")
const { createTokenPair } = require('../auth/authUtils')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService { 
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email exists ???
            const holderShop = await shopModel.findOne({ email }).lean();

            console.log({ name, email, password })

            console.log({ holderShop })

            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                role: [RoleShop.SHOP]
            })

            if (newShop) {
                // created privateKey, publicKey
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                });

                console.log({ publicKey, privateKey })

                const publicKeyString = await KeyTokenService.createKeyToken({ 
                    userId: newShop._id, 
                    publicKey 
                });

                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'Public Key String error'
                    }
                }

                // created token pair
                const tokens = await createTokenPair({ 
                    userId: newShop._id, 
                    publicKey, 
                    privateKey 
                });
                console.log({ tokens })

                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;