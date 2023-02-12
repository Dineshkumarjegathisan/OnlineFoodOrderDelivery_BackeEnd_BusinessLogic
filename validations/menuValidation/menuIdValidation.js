import menuSchema from "../../models/menuSchema.js";
import errorcode from "../../errorCode/errorcode.js";

async function menuIdValidation(id){
        
    const userid = await menuSchema.aggregate([{$match:{itemId:id,isDeleted:false}}]);
    if(userid.length == 0 ){
        throw new Error(errorcode.USER_ID_NOT_FOUND_ERROR.message);
    }
}
export default menuIdValidation;