const User = require("../../models/v1/User");

function byRole(role) {
    return async (req, res, next) => {
        if((await User.findById(req.user._id)).role !== role) {
            res.status(403).send("Forbidden.")
        }
        else {
            next();
        }
    }
}

module.exports = byRole;