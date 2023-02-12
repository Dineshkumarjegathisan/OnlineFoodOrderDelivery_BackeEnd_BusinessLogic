import errorcode from "../../errorCode/errorcode.js";
import deliveryPersonSchema from "../../models/deliveryPersonSchema.js";

async function deliveryPersonIdValidation(id){

    const delId = await deliveryPersonSchema.aggregate([{$match:{deliverPersonId:id,deliveryPersonisDeleted:false}}]);
    if(delId.length==0){
        throw new Error(errorcode.USER_ID_NOT_FOUND_ERROR.message)
    }
}

export default deliveryPersonIdValidation;