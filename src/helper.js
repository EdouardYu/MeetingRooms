exports.success = (message, data) => {
    return { message, data }
}

exports.pluralize = (count, singular, plural) => {
    const correctStringVersion = count == 1 ? singular : plural;
    const correctString = count + ' ' + correctStringVersion
    return correctString;
}