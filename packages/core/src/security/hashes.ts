import { compareSync, hashSync } from "bcryptjs";

/**
 * Helper for creating and comparing hashes.
 * It is in place to make sure that whenever any
 * changes to either creating and/or comparing hashes is needed,
 * any other changes won't be needed.
 */

/**
 * Compare hash against a password
 *
 * @param {string} password
 * @param {string} hash
 */
export const compareHash = compareSync;

/**
 * Create a hash
 *
 * @param password
 * @returns
 */
export const createHash = (password: string) => hashSync(password);
