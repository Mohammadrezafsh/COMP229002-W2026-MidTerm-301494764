let UsersModel = require('../models/users');

module.exports.usersList = async function (req, res, next) {

    try {
        // Retrieves a list of users from the DB and waits for the result.
        // Add your code here to retrieve the list of users from the database using the UsersModel.        
        const users = await UsersModel.find();

        const data = users.map(u => ({
            firstname: u.firstname,
            lastname: u.lastname,
            email: u.email,
            created: u.created,
            updated: u.updated,
            id: u.id
        }));

        return res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data
        });

        // If the list is empty, throw an error. Otherwise, return the list as a JSON response.
    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.getByID = async function (req, res, next) {
    try {
        let user = await UsersModel.findOne({ _id: req.params.id });
        if (!user)
            throw new Error('User not found. Are you sure it exists?') 
        
        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
 
        // Builds a new user from the values of the body of the request.
        // Add your code here to create a new user object using the UsersModel and the data from req.body
        const now = new Date();

        const newUser = new UsersModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            // schema uses passowrd (typo issue), I did not want to touch it since I only change things that are needed to change based on assignment:)
            passowrd: req.body.password
        });

        const saved = await newUser.save();

        return res.json({
            success: true,
            message: "User added successfully.",
            data: {
                firstname: saved.firstname,
                lastname: saved.lastname,
                email: saved.email,
                created: saved.created,
                updated: saved.updated,
                id: saved.id
            }
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async (req, res, next) => {
    try {

        let id = req.params.id;

        // Builds updatedUser from the values of the body of the request.
        let updatedUser = UsersModel(req.body);
        updatedUser._id = id;

        // Submits updatedUser to the DB and waits for a result.
        let result = await UsersModel.updateOne({ _id: id }, updatedUser);
        console.log("====> Result: ", result);

        // If the user is updated redirects to the list
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "User updated successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not udated. Are you sure it exists?')
        }

    } catch (error) {
        next(error)
    }
}


module.exports.performDelete = async (req, res, next) => {

    try {

        let id = req.params.id;

        let result = await UsersModel.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the book list
            res.json(
                {
                    success: true,
                    message: "User deleted successfully."
                }
            )
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not deleted. Are you sure it exists?')
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}