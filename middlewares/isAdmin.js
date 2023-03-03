const isAdmin = (req, res, next) => {
    if(req.user.email !== 'admin@admin.com.br') {
        return res.status(401).json({message: 'Unauthorized'})
    }

    next()
}

export default isAdmin