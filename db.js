const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})

const courseSchema = new Schema({
    creatorId: objectId,
    title: String,
    desc: String,
    imageUrl: String,
    price: Number
})

const purchaseSchema = new Schema({
    userId: {type: objectId, ref: 'user'},
    courseId: [{type: objectId, ref:'course'}]

})

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports={
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}