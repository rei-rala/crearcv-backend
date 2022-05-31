import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  registered: { type: Number, required: true },
  lastConnection: { type: Number, required: true },
})

const User = model('User', userSchema);

export { userSchema, User };
export default User; 