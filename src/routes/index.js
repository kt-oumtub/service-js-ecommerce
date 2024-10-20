const router = require('express').Router()

//* Authentication
router.use('/register', require('./register_route.js'))
router.use('/login', require('./login_route.js'))
router.use('/logout', require('./logout_route.js'))

//* Manage Product and Inventory
router.use('/product', require('./product_route.js'))
router.use('/inventory', require('./inventory_route.js'))
router.use('/product-inventory', require('./product_inventory_route.js'))

//* Manage Cart and User Order
router.use('/cart', require('./cart_route.js'))
router.use('/order', require('./order_route.js'))
router.use('/order-history', require('./order_history_route.js'))

module.exports = router
