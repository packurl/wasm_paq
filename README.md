[WASM](https://developer.mozilla.org/en-US/docs/WebAssembly) libs for [PAQ](http://mattmahoney.net/dc/)-based compression and decompression.

This is a simple wrapper on top of the [mashi-core](https://github.com/datatrash/mashi) [rust](https://www.rust-lang.org/) [crate](https://crates.io/crates/mashi-core).

<br>

Compilation:

`wasm-pack build --target web`

<br>

Dependencies:
- [mashi](https://github.com/datatrash/mashi) ([GPL3 License](https://github.com/datatrash/mashi/blob/main/LICENSE))
- [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) ([MIT License](https://github.com/rustwasm/wasm-bindgen/blob/main/LICENSE-MIT))
- [wee_alloc](https://github.com/rustwasm/wee_alloc) ([Mozilla Public License 2.0](https://github.com/rustwasm/wee_alloc/blob/master/LICENSE))
