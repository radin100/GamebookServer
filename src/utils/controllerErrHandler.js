module.exports = (res, err) => {
    return res.status(300).json({
        message: err.message,
        dublicate: err.keyValue ? Object.keys(err.keyValue)[0] : false
    });
}

