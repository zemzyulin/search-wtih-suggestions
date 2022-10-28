// capitilize string for DB search
const capitalizeString = str => {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// basic query validation
const validateQuery = (req, res, next) => {
    if (!req.query.search) {
        return res.status(200).send({});
    } else if (typeof req.query.search !== 'string') {
        return res.status(400).send('Invalid input');
    } else {
        return next();
    }
}

// concat arrays of objects, leave only unique
const concatUnique = (array1, array2) => {
    let filteredArray = array2.filter(i => {
        if (array1.every((j) => j.id !== i.id)) {
            return i;
        }
    })
    return array1.concat(filteredArray);
}

module.exports = { capitalizeString, validateQuery, concatUnique };