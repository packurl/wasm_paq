const url=new URL('paq.wasm',import.meta.url);
await (await fetch(url)).arrayBuffer();
const src=name=>`(async()=>{
  const mod=await WebAssembly.compileStreaming(await fetch('${url}',{cache:'force-cache'}));
  const wasm=(await WebAssembly.instantiate(mod)).exports;
  const malloc=wasm.__wbindgen_malloc;const free=wasm.__wbindgen_free;
  const fn=it=>{
    const n1=it.length;const p1=malloc(n1);
    new Uint8Array(wasm.memory.buffer).set(it,p1);
    wasm.${name}(8,p1,n1);
    const arr=new Int32Array(wasm.memory.buffer);
    const p2=arr[2];const n2=arr[3];
    const res=new Uint8Array(wasm.memory.buffer).subarray(p2,p2+n2).slice();
    free(p2,n2);
    return res;
  };
  onmessage=async msg=>postMessage(fn(msg.data));
  postMessage('ready');
})();`
const fns=['paq','unpaq'];
const workers=new Map(await Promise.all(fns.map(it=>new Promise(r=>{
  const worker=new Worker(URL.createObjectURL(new Blob([src(it)],{type:'application/javascript'})));
  worker.onmessage=msg=>{
    if(msg.data==='ready'){
      worker.onmessage=null;
      r([it,worker]);
    }
  };
}))));
/**
 * PAQ-Compresses the supplied data.
 * @param {Uint8Array} data
 * @return {Promise<Uint8Array>}
 */
const paq=(data)=>new Promise(r=>{
  const worker=workers.get('paq');
  worker.onmessage=msg=>{
    worker.onmessage=null;
    r(msg.data);
  }
  worker.postMessage(data);
});

/**
 * PAQ-Decompresses the supplied data.
 * @param {Uint8Array} data
 * @return {Promise<Uint8Array>}
 */
const unpaq=(data)=>new Promise(r=>{
  const worker=workers.get('unpaq');
  worker.onmessage=msg=>{
    worker.onmessage=null;
    r(msg.data);
  }
  worker.postMessage(data);
});

export {
  paq,
  unpaq
};
