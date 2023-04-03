import clientsRepository from "../repositories/clientsRepository.js";
import userRepository from "../repositories/userRepository.js";
import errors from "../errors/index.js"
import bcrypt from "bcrypt";

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

export default {
    create
}