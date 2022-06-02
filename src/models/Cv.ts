import { Schema, model } from "mongoose";

const cvSchema = new Schema({
  ownerId: { type: String, required: true },
  created: { type: Date },
  lastUpdated: { type: Date },
  cvName: { type: String },
  name: { type: String, required: [true, 'Proporcione su nombre completo'], match: [/^[A-Za-z\s]+$/g, 'Nombre debe ser solo letras y espacios'], minlength: [3, 'Nombre debe tener al menos 3 caracteres'], maxlength: [30, 'Nombre no debe exceder los 30 caracteres'] },
  currently: { type: String, maxlength: [30, 'Actualidad no debe exceder los 30 caracteres'] },
  headline: { type: String, maxlength: [30, 'Titulo no debe exceder los 30 caracteres'] },
  about: { type: String, maxlength: [600, 'Descripcion no debe exceder los 600 caracteres'] },
  photos: [{ type: String, maxlength: [200, 'URL de imagen no debe exceder los 200 caracteres'] }],
  location: { type: String, maxlength: [100, 'Ubicacion no debe exceder los 100 caracteres'] },
  academic: [{
    title: { type: String, maxlength: [100, "Titulacion no debe exceder 100 caracteres"] },
    where: { type: String, maxlength: [100, "Ubicacion academica no debe exceder 100 caracteres"] },
    from: { type: Date, },
    to: { type: Date, },
    condition: { type: String, maxlength: [20, "Condicion no debe superar 20 caracteres"] },
    description: { type: String, maxlength: [100, "Descripcion no debe superar 100 caracteres"] },
    isCurrent: { type: Boolean, default: false }
  }],
  professional: [{
    title: { type: String, maxlength: [100, "Titulacion no debe exceder 100 caracteres"] },
    where: { type: String, maxlength: [100, "Ubicacion laboral no debe exceder 100 caracteres"] },
    from: { type: Date, },
    to: { type: Date, },
    seniority: { type: String, maxlength: [20, "Seniority no debe exceder 20 caracteres"] },
    isCurrent: { type: [Boolean, "Solamente verdadero o falso"], default: false },
  }],
  contact: [{
    type: { type: String, maxlength: [20, "Tipo de contacto no debe superar 20 caracteres"] },
    url: { type: String, maxlength: [150, "URL debe tener maximo 150 caracteres"], },
  }],
  customSection: {
    title: { type: String, maxlength: [100, "Ingrese titulo para seccion personalizada"] },
    hover: { type: String, maxlength: [100, "Maximo 100 caracteres"] },
    lines: [{
      text: { type: String, maxlength: [100, "Maximo 100 caracteres"] },
      icon: { type: String, maxlength: [100, "Maximo 100 caracteres"] },
      tooltip: { type: String, maxlength: [100, "Maximo 100 caracteres"] },
    }],
  },
  highlights: [{
    type: { type: String, maxlength: 20 },
    text: { type: String, maxlength: 100 },
  }],
  languages: [{
    name: { type: String, maxlength: [30, "Maximo 40 caracteres"] },
    icon: { type: String, maxlength: [100, "Maximo 100 caracteres"], },
    level: { type: String, maxlength: [30, "Maximo 30 caracteres"] },
  }],
})

const Cv = model('Cv', cvSchema);

export { cvSchema, Cv };
export default Cv; 