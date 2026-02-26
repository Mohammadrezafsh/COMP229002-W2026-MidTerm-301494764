module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome to the Midterm Application"
    }

    res.json(messageObj);
}