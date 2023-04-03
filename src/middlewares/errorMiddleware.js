import httpStatus from "http-status";

export default function handleApplicationErrors(err, req, res, next) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
        return res
            .status(httpStatus.CONFLICT)
            .send({ message: err.message, email: err.email });
    }

    if (err.name === "DuplicateSpecialtiesError") {
        return res
            .status(httpStatus.CONFLICT)
            .send({ message: err.message, specialty: err.specialty });
    }
}