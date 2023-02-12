import SequenceService from '../services/sequenceService.js'
import { v4 as uudiv4 } from 'uuid'

export default class SequenceController {
    constructor() {
        this.sequenceService = new SequenceService();
    }


    /**
 * Handles the creation of a sequence by generating a unique sequence ID and calling the `createSequence` method on an instance of `SequenceService`,
 * and returning a JSON response with the result.
 *
 * 
 * @async
 * @author DineshkumarJegathisan
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws Will throw an error if there is a problem during the execution of the function.
 * @returns {Object} A JSON object with the result of the `createSequence` method call.
 */

    async createSequence(req, res) {
        try {
            const params = {
                sequenceId: uudiv4()
            }
            const result = await new SequenceService().createSequence(params);
            res.status(201).json({
                result
            })
        } catch (err) {
            throw err;
        }
    }
}