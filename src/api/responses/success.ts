export function success(message : string, content : any) {
    return { 
        success:true, 
        message:message, 
        content:content
    };
}