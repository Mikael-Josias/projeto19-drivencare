import specialtiesRepository from "../repositories/specialtiesRepository.js";
import sessionsRepository from "../repositories/sessionsRepository.js";
import doctorsRepository from "../repositories/doctorsRepository.js";
import addressRepository from "../repositories/addressRepository.js";
import userRepository from "../repositories/userRepository.js";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function create (doctorData) {
    const { address, ...data } = doctorData;
    
    const {rowCount: emailExists} = await doctorsRepository.getByEmail(data.email);
    if (emailExists !== 0) throw errors.duplicateEmailError(data.email);
    
    const { rowCount: specialtyExists } = await specialtiesRepository.getById(data.specialty_id);
    if (specialtyExists === 0) throw errors.conflictError("Specialty does not exists");
    
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const {rows: [userId]} = await userRepository.create(data.email, hashedPassword);
    const {rows: [addressId]} = await addressRepository.create(address);
    
    const {rows: [doctor]} = await doctorsRepository.create(data.name, userId.id, addressId.id, data.specialty_id);
    
    return doctor;
}

async function signIn (userData) {
    const { rows: [user], rowCount: emailExists } = await userRepository.login(userData.email);
    if (emailExists !== 1) throw errors.conflictError("Email does not exist");

    const {rows: [doctor]} = await doctorsRepository.getByUserId(user.id);
    if (!doctor) throw errors.conflictError("User has no permission");

    if (!bcrypt.compareSync(userData.password, user.password)) throw errors.conflictError("Password is not correct");

    const {rows: [session]} = await sessionsRepository.create(user.id);

    const token = jwt.sign(session.id, process.env.PRIVATE_KEY);
    return {token, doctor};
}

async function searchDoctors(name, specialtyId, city) {
    let {rows: doctors} = await doctorsRepository.listByName(name, city);

    if(!isNaN(specialtyId) && Number(specialtyId) !== 0) {
        doctors = doctors.filter((doc) => {
            if (doc.specialty_id === Number(specialtyId)) {
                return doc;
            }
        });
    }

    return doctors;
}

export default {
    create,
    signIn,
    searchDoctors
}