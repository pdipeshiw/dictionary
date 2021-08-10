export function parseErrorResponse(error){
    return {
        data: error.data,
        message: error.data.detail,
        status: error.status
    }
}
