export const roleValidator = (req,res,next) => {
    if (!req.userRole) return res.status(403).send('Access denied');
    next();
}