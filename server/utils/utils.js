// capitilize string for DB search
export function capitalizeString(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// basic query validation
export function validateQuery(req, res, next) {
    if (!req.query.search) {
        return res.status(200).send({});
    } else if (typeof req.query.search !== 'string') {
        return res.status(400).send('Invalid input');
    } else {
        return next();
    }
}

// concat arrays of objects, leave only unique
export function concatUnique(array1, array2) {
    let filteredArray = array2.filter(i => {
        if (array1.every((j) => j.id !== i.id)) {
            return i;
        }
    });
    return array1.concat(filteredArray);
}

// validate for full-text search
export function fullTextValidation(input) {
    // exclude non-alphabetic and concat in one valid tsquery string
    return input.split(' ')
                .map(el => el.replace(/\W/g, ''))
                .filter(el => el !== '')
                .map(el => el + ':*')
                .join(' & ');
}