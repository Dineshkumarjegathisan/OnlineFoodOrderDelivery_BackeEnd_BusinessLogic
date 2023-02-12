import _ from 'lodash'
import errorcode from '../../errorCode/errorcode.js';


async function updateValidation(status) {
    if (status == "" && _.isString(status)) {
        throw new Error(errorcode.INVALID_INPUT_FORMAT_ERROR.message);
    }
    else {
        status = parseInt(status);
        if (isNaN(status)) {
            return {status}
        } else {
            throw new Error(errorcode.INVALID_INPUT_FORMAT_ERROR.message);
        }
    }
}
export default updateValidation;