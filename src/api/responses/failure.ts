export function failure(message : string, content? : any) {
    return { 
        success:false, 
        message:message, 
        content:content?content:null
    };
}