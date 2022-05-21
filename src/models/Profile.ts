import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  name: { type: String, required: true },
  currently: { type: String, },
  headline: { type: String, required: true },
  about: { type: String, required: true },
  images: [{ type: String, }],
  email: { type: String, required: true, unique: true },
  history: {
    academic: [{
      where: { type: String, required: true, maxlength: 100 },
      from: { type: Date, required: true },
      to: { type: Date, },
      title: { type: String, required: true, maxlength: 100 },
      condition: { type: String, required: true, maxlength: 100 },
      description: { type: String, maxlength: 100 },
    }],
    professional: [{
      where: { type: String, required: true, maxlength: 100 },
      from: { type: Date, required: true },
      to: { type: Date, },
      title: { type: String, maxlength: 100 },
      seniority: { type: String, maxlength: 20 },
    }],
  },
  contact: [{
    type: { type: String, required: true, maxlength: 20 },
    url: { type: String, required: true, maxlength: 200, },
  }],
  customSection: {
    title: { type: String, required: true, maxlength: 100 },
    hover: { type: String, required: true, maxlength: 100 },
    lines: [{
      text: { type: String, required: true, maxlength: 100 },
      icon: { type: String, maxlength: 100 },
      tooltip: { type: String, required: true, maxlength: 100 },
    }],
  },
  highlights: [{
    type: { type: String, required: true, maxlength: 20 },
    text: { type: String, required: true, maxlength: 100 },
  }],
  languages: [{
    name: { type: String, required: true, maxlength: 100 },
    icon: { type: String, maxlength: 100, },
    level: { type: String, maxlength: 20 },
  }],
})

const Profile = model('Profile', profileSchema);

export { profileSchema, Profile };
export default Profile; 