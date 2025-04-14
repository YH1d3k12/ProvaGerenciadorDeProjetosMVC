function checkEmptyParam(param) {
    if (param === undefined || param === null || param === '') {
        return true;
    };
};

module.exports = checkEmptyParam;