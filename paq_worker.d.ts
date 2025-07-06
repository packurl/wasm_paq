/* tslint:disable */
/* eslint-disable */
declare module 'paq_worker' {
  /**
   * Compresses an array of bytes with Paq.
   * @param {Uint8Array} bytes
   * @return {Promise<Uint8Array>}
   */
  export function paq(bytes: Uint8Array): Promise<Uint8Array>;
  /**
   * Decompresses an array of bytes compressed with Paq.
   * @param {Uint8Array} bytes
   * @return {Promise<Uint8Array>}
   */
  export function unpaq(bytes: Uint8Array): Promise<Uint8Array>;
}
