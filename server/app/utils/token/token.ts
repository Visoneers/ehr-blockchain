import { sign, SignOptions, verify } from "jsonwebtoken";
import { getPrivateKey, getPublicKey } from "./key";
const tokenConfig: SignOptions = {
    algorithm: "RS256"
}
export const generateToken = (payload: any) => {
    const privatekey = getPrivateKey();

    const token = sign(payload, privatekey, tokenConfig);
    return token;
}

export const verifyToken = (payload: any) => {
    const publicKey = getPublicKey();

    return verify(payload, publicKey);
}