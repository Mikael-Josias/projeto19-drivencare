
function conflictError(message) {
    return {
        name: "ConflictError",
        message
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
    duplicateSpecialtiesError
}