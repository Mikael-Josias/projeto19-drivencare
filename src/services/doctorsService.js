import specialtiesRepository from "../repositories/specialtiesRepository.js";
import doctorsRepository from "../repositories/doctorsRepository.js";
import addressRepository from "../repositories/addressRepository.js";
import userRepository from "../repositories/userRepository.js";
import errors from "../errors/index.js";
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

export default {
    create
}