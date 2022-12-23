exports.validateAdmin = (req, res, next) => {
    const userAdmin = req.userInfo.admin

    if (userAdmin) {
        next()
    } else {
        res.status(401).json({
            message: "You do not have authorization to perform this action."
        })
    }
}