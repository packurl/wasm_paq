use wasm_bindgen::prelude::*;
use mashi_core::{Decoder, Encoder};

#[wasm_bindgen]
pub fn unpaq(data: &[u8]) -> Vec<u8> {
    let mut decoder = Decoder::new();
    decoder.decode(&data).to_vec()
}

#[wasm_bindgen]
pub fn paq(data: &[u8]) -> Vec<u8> {
    let mut encoder = Encoder::new();
    encoder.encode(&data).to_vec()
}
