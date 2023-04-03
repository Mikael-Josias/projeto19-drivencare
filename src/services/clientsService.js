import sessionsRepository from "../repositories/sessionsRepository.js";
import clientsRepository from "../repositories/clientsRepository.js";
import userRepository from "../repositories/userRepository.js";
import errors from "../errors/index.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const SALT_ROUNDS = 10;

async function create (clientData) {

    const { rowCount: emailExists } = await userRepository.getByEmail(clientData.email);
    if (emailExists !== 0) throw errors.duplicateEmailError(clientData.email);

    const { rowCount: cpfExists } = await clientsRepository.getByCpf(clientData.cpf);
    if (cpfExists !== 0) throw errors.conflictError("There is already an user with given cpf");

    const hashedPassword = await bcrypt.hash(clientData.password, SALT_ROUNDS);
    const { rows: [user]} = await userRepository.create(clientData.email, hashedPassword);
    const { rows: [client]} = await clientsRepository.create(clientData.name, clientData.cpf, user.id);

    return client;
}

async function signIn (userData) {
    const { rows: [user], rowCount: emailExists } = await userRepository.login(userData.email);
    if (emailExists !== 1) throw errors.conflictError("Email does not exist");
    if (!bcrypt.compareSync(userData.password, user.password)) throw errors.conflictError("Password is not correct");

    const {rows: [client]} = await clientsRepository.getByUserId(user.id);
    if (!client) throw errors.conflictError("User has no permission");

    const {rows: [session]} = await sessionsRepository.create(user.id);

    const token = jwt.sign(session.id, process.env.PRIVATE_KEY);

    return {token, client};
}

export default {
    create,
    signIn
}