
function conflictError(message) {
    return {
        name: "ConflictError",
        message
    }
}

function duplicateEmailError(email) {
    return {
        name: "DuplicateEmailError",
        message: "There is already an user with given email",
        email
    }
}

function duplicateSpecialtiesError(specialty) {
    return {
        name: "DuplicateSpecialtiesError",
        message: "There is already an specialty with given name",
        specialty
    }
}

export default {
    conflictError,
    duplicateEmailError,
    duplicateSpecialtiesError
}