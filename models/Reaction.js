const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: mongoose.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

reactionSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toDateString();
})

module.exports = reactionSchema;
