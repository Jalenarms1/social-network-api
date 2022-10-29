const { Schema, model, default: mongoose} = require("mongoose");
const Thought = require("./Thought");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        thoghts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    }
)

userSchema.virtual('friendCount').get(() => {
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;
