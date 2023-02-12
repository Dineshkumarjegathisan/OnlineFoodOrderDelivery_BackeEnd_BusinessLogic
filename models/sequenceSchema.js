import mongoose from "mongoose"
const sequence = mongoose.Schema({

    sequenceId:{
        type:String,
        require:true
    },
    count:{
        type:String,
        require:true,
        default:0
    }
})
export default mongoose.model("count",sequence);