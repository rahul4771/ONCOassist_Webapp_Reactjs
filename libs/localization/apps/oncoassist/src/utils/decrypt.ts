import CryptoJS from "crypto-js";
import { config } from "@oncoassist/shared/constants";

/**
 * Decrypts an encrypted user ID stored in localStorage.
 * @param encryptedData - The encrypted user ID from localStorage.
 * @returns {string | null} - The decrypted user ID or null if decryption fails.
 */
const encryptionKey = config.userIDEncKey; // Fetch key from constant

export const decryptUserID = (encryptedData: string | null): string | null => {
  if (!encryptedData) {
    console.error("Missing encrypted data!");
    return null;
  }

  if (!encryptionKey) {
    console.error("Encryption key is missing or incorrect length! AES-256 requires a 32-byte key.");
    return null;
  }

  try {
    // Ensure encryptedData has the correct format: IV_HEX:Ciphertext_Base64
    const parts = encryptedData.split(":");
    if (parts.length !== 2) {
      console.error("Invalid encrypted format. Expected IV:EncryptedText format.");
      return null;
    }

    const [ivHex, encryptedText] = parts;

    // Validate IV and Ciphertext
    if (!ivHex || !encryptedText) {
      console.error("Invalid encrypted data - missing IV or ciphertext.");
      return null;
    }

    // Parse IV (Hex to WordArray)
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    // Decode Base64 Encrypted Text
    const encrypted = CryptoJS.enc.Base64.parse(encryptedText);

    // Perform AES Decryption
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encrypted } as any, // Type assertion for TypeScript
      CryptoJS.enc.Utf8.parse(encryptionKey), // Ensure the key is parsed correctly
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Convert decrypted data to UTF-8 string
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      console.error("Decryption resulted in an empty string. Possible incorrect key or corrupted data.");
      return null;
    }

    return decryptedText;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};