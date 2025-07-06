importScripts('./paq_for_importScripts.js');
(async()=>{
  const {paq,unpaq}=await fns;
  onmessage=async msg=>{
    postMessage(msg.data.bytes?paq(msg.data.bytes):unpaq(msg.data));
  }
  postMessage('ready');
})();
