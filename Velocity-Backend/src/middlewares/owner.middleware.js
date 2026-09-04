const userModel = require("../models/user.model");

const ownerMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(401).json({
                msg: "User not found!"
            });
        }

        if (user.role !== "owner") {
            return res.status(403).json({
                msg: "Only owners can perform this action!"
            });
        }

        next();

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            msg: "Server error"
        });
    }
};

module.exports = ownerMiddleware;