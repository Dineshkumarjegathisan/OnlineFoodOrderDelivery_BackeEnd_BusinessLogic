import errorcode from '../errorCode/errorcode.js'

export default async (page,limit)=>{
    if(typeof page === "string" && typeof limit ==="string"){
            page = parseInt(page);
            limit = parseInt(limit);
            if(isNaN(page) || isNaN(limit)){
                throw new Error(errorcode.INVALID_INPUT_FORMAT_ERROR.message)
            }
            else{
                return {page:page,limit:limit}
            }
    }
    else{
        return {page:page,limit:limit}
    }
}

