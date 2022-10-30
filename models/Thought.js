const { Schema, model} = require("mongoose");
const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,

        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }
)

thoughtSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toDateString();
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;