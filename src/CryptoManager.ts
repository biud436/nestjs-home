import aes from "./AesUtils";
import * as path from "path";
import * as fs from "fs";
import key from "./key";

export class CryptoManager {
    static encrypt(text: string) : string {
        const encryptString = aes.encrypt(text, key);
        return encryptString;
    }

    static decrypt(encryptedText: string, key: string) : string {
        return aes.decrypt(encryptedText, key);
    }

}