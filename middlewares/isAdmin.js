import 'dotenv/config'

const admin = process.env.ADMIN_VALIDATION;

const isAdmin = (req, res, next) => {
    if(req.user.email !== admin) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    next()
}

export default isAdmin