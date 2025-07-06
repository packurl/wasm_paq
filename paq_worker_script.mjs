import {paq,unpaq} from "./paq.mjs";
onmessage=async({data})=>postMessage(data.bytes?paq(data.bytes):unpaq(data));
postMessage('ready');
