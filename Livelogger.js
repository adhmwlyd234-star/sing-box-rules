/*
 * Advanced Live Packet Analyzer for Shadowrocket
 * يقوم برصد، تحليل، وتحويل البيانات (Headers & Binary Body) بشكل عميق
 */

const logPrefix = "[Live-Analyzer]";

function binaryToHex(str) {
    if (!str) return "";
    let hex = "";
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i).toString(16);
        hex += (code.length === 1 ? "0" : "") + code;
    }
    return hex.toUpperCase();
}

// 1. معالجة الطلبات الخارجة (Requests)
if (typeof $request !== "undefined" && $request) {
    console.log(`${logPrefix} --- CRITICAL REQUEST DETECTED ---`);
    console.log(`${logPrefix} URL: ${$request.url}`);
    console.log(`${logPrefix} Method: ${$request.method}`);
    console.log(`${logPrefix} Headers: ${JSON.stringify($request.headers, null, 2)}`);
    
    if ($request.body) {
        // إذا كانت البيانات نصية أو تم تحويلها لـ Hex للقراءة العميقة
        let hexBody = binaryToHex($request.body);
        console.log(`${logPrefix} Body (Raw/Text): ${$request.body.substring(0, 500)}`);
        console.log(`${logPrefix} Body (Hex Representation): ${hexBody.substring(0, 1000)}`);
    }
    $done({});
} 
// 2. معالجة الاستجابات القادمة (Responses)
else if (typeof $response !== "undefined" && $response) {
    console.log(`${logPrefix} --- CRITICAL RESPONSE DETECTED ---`);
    console.log(`${logPrefix} Status Code: ${$response.status}`);
    console.log(`${logPrefix} Headers: ${JSON.stringify($response.headers, null, 2)}`);
    
    if ($response.body) {
        let hexBody = binaryToHex($response.body);
        console.log(`${logPrefix} Body (Raw/Text): ${$response.body.substring(0, 500)}`);
        console.log(`${logPrefix} Body (Hex Representation): ${hexBody.substring(0, 1000)}`);
    }
    $done({});
} else {
    $done({});
}
