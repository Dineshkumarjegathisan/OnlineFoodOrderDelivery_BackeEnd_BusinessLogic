import errorcode from "../../errorCode/errorcode.js";
import userSchema from "../../models/userSchema.js"


 async function userIdValidation(id){
        
    const userid = await userSchema.aggregate([{$match:{UserId:id,isDeleted:false}}]);
    if(userid.length == 0 ){
        throw new Error(errorcode.USER_ID_NOT_FOUND_ERROR.message);
    }
}
export default userIdValidation;