import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  username: { type: String, required: [true, 'Proporcione nombre de usuario'], unique: true, match: [/^[A-Za-z0-9]+$/g, 'Nombre de usuario debe ser solo letras y/o numeros'], minlength: [3, 'Nombre de usuario debe tener al menos 3 caracteres'], maxlength: [15, 'Nombre de usuario no debe exceder los 15 caracteres'] },
  name: { type: String, required: [true, 'Proporcione su nombre completo'], match: [/^[A-Za-z\s]+$/g, 'Nombre debe ser solo letras y espacios'], minlength: [3, 'Nombre debe tener al menos 3 caracteres'], maxlength: [30, 'Nombre no debe exceder los 30 caracteres'] },
  currently: { type: String, maxlength: [30, 'Actualidad no debe exceder los 30 caracteres'] },
  headline: { type: String, maxlength: [30, 'Titulo no debe exceder los 30 caracteres'] },
  about: { type: String, maxlength: [600, 'Descripcion no debe exceder los 600 caracteres'] },
  images: [{ type: String, maxlength: [200, 'URL de imagen no debe exceder los 200 caracteres'] }],
  location: { type: String, maxlength: [100, 'Ubicacion no debe exceder los 100 caracteres'] },
  history: {
    academic: [{
      where: { type: String, required: [true, "Proporcione ubicacion de estudios"], maxlength: [100, "Ubicacion academica no debe exceder 100 caracteres"] },
      from: { type: Date, required: [true, "Especifique fecha de inicio"] },
      to: { type: Date, },
      title: { type: String, maxlength: [100, "Titulacion no debe exceder 100 caracteres"] },
      condition: { type: String, required: true, maxlength: [20, "Condicion no debe superar 20 caracteres"] },
      description: { type: String, maxlength: [100, "Descripcion no debe superar 100 caracteres"] },
    }],
    professional: [{
      where: { type: String, required: [true, "Proporcione ubicacion de trabajo"], maxlength: [100, "Ubicacion laboral no debe exceder 100 caracteres"] },
      from: { type: Date, required: [true, "Especifique fecha de inicio"] },
      to: { type: Date, },
      title: { type: String, maxlength: [100, "Titulacion no debe exceder 100 caracteres"] },
      seniority: { type: String, maxlength: [20, "Seniority no debe exceder 20 caracteres"] },
      actual: { type: [Boolean, "Solamente verdadero o falso"] },
    }],
  },
  contact: [{
    type: { type: String, required: [true, "Debe especificar tipo de contacto"], maxlength: [20, "Tipo de contacto no debe superar 20 caracteres"] },
    url: { type: String, maxlength: [150, "URL debe tener maximo 150 caracteres"], },
  }],
  customSection: {
    title: { type: String, required: [true, "Debe especificar texto para titulo personalizado"], maxlength: [100, "Ingrese titulo para seccion personalizada"] },
    hover: { type: String, required: [true, "Que va a mostrar en esta seccion"], maxlength: [100, "Maximo 100 caracteres"] },
    lines: [{
      text: { type: String, required: [true, "Especificar de que se trata"], maxlength: [100, "Maximo 100 caracteres"] },
      icon: { type: String, maxlength: [100, "Maximo 100 caracteres"] },
      tooltip: { type: String, required: [true, "Que nivel tiene o que hace con este articulo"], maxlength: [100, "Maximo 100 caracteres"] },
    }],
  },
  highlights: [{
    type: { type: String, required: true, maxlength: 20 },
    text: { type: String, required: true, maxlength: 100 },
  }],
  languages: [{
    name: { type: String, required: true, maxlength: [30, "Maximo 40 caracteres"] },
    icon: { type: String, maxlength: [100, "Maximo 100 caracteres"], },
    level: { type: String, maxlength: [30, "Maximo 30 caracteres"] },
  }],
})

const Profile = model('Profile', profileSchema);

export { profileSchema, Profile };
export default Profile; 