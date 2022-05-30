import path from 'path'
import { Express } from 'express';
import { engine, create } from 'express-handlebars';


export const templateConfig = (expressApp: Express, dirName: string) => {
  let hbs: any = create({})

  // Allows handlebars 'compareStrings' verifying equal strings as if/else
  hbs.handlebars.registerHelper('compareStrings', (p: any, q: any, options: any) => (p == q) ? options.fn(this) : options.inverse(this));

  // Allows hbs to lowercase a string using 'lower' method
  hbs.handlebars.registerHelper('lower', (p: any) => p.toLowerCase())

  // Allows hbs to uppercase a string using 'upper' method
  hbs.handlebars.registerHelper('upper', (p: any) => p.toUpperCase())

  expressApp.set('view engine', 'pug');
  expressApp.set('views', 'views');

  expressApp.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'base.hbs',
    layoutsDir: path.join(dirName, './views/layout'),
    partialsDir: path.join(dirName, './views/partials')
  }));

  expressApp.set('views', path.join(dirName, '/views'));
  expressApp.set('view engine', '.hbs');
}
