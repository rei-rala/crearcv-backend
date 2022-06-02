import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  registered: { type: Number, required: true },
  lastConnection: { type: Number, required: true },
  username: { type: String, match: [/^[A-Za-z0-9]+$/g, 'Nombre de usuario debe ser solo letras y numeros'], minlength: [3, 'Nombre de usuario debe tener al menos 3 caracteres'], maxlength: [30, 'Nombre de usuario no debe exceder los 30 caracteres'] },
})

const User = model('User', userSchema);

export { userSchema, User };
export default User; 