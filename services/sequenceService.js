import errorcode from '../errorCode/errorcode.js';
import SequenceRepo from '../Repo/sequenceRepo.js'


export default class SequenceService{
    constructor(){
        this.sequenceRepo = new SequenceRepo();
    }


    async createSequence (params){
        try {

            const result = await this.sequenceRepo.createSequence(params);
            return errorcode.CREATE_SUCESS;
            
        } catch (err) {
            throw err ;
        }
    }
}