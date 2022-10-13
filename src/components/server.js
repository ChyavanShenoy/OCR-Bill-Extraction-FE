export const isReachable = async () =>{
    const timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 5000, 'Request timed out');
    });
    const request = fetch('http://localhost:8000/', {  method: 'GET', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
    try {
        const response = await Promise
            .race([timeout, request]);
        return true;
    }
    catch (error) {
        return false;
    }
}