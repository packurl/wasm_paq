mod predictor;
mod codec;

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
use codec::{Decoder, Encoder};
extern crate alloc;

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn unpaq(data: &[u8]) -> Vec<u8> {
    let mut decoder = Decoder::new();
    decoder.decode(data).to_vec()
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub fn paq(data: &[u8]) -> Vec<u8> {
    let mut encoder = Encoder::new();
    encoder.encode(data).to_vec()
}

#[cfg(test)]
mod tests {
    use rand::rngs::OsRng;
    use rand::TryRngCore;
    use crate::{paq, unpaq};

    #[test]
    fn test() {
        let mut original = vec![0u8;10_000];
        OsRng::default().try_fill_bytes(&mut original).unwrap();
        let compressed = paq(&original);
        let decompressed = unpaq(&compressed);
        assert_eq!(original.len(), decompressed.len());
        assert_eq!(original, decompressed);
    }
}
