//require login middleware

export function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login?message= Please log in to continue");
    }
    next();
}