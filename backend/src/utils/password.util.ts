import {randomBytes, scrypt} from "crypto";
import {promisify} from "util";

const scryptAsync = promisify(scrypt);
class PasswordUtil {
    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex');
        const buffer = await scryptAsync(password, salt, 64) as Buffer;
        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedpassword: string, suppliedpassword: string){
        const [hashedpassword, salt] = storedpassword.split('.');
        const buffer = await scryptAsync(suppliedpassword, salt, 64) as Buffer;
        return hashedpassword == buffer.toString('hex');
    }
}

export default PasswordUtil;