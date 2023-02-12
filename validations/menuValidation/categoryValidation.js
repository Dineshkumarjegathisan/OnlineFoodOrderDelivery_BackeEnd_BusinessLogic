import errorcode from "../../errorCode/errorcode.js";
import menuSchema from "../../models/menuSchema.js"

async function checkCategory(category){

    let item = await menuSchema.find({category:category});
    if(item.length==0){
        throw new Error(errorcode.FIELD_NOT_PRESENT_ERROR.message);
    }

}
export default checkCategory ;