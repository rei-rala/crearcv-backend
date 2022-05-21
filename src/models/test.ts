export let profileExample = {
  name: "Ramon Irala",
  email: "ramonirala@outlook.com",
  currently: "En busqueda laboral activa",
  headline: "Desarrollador fullstack trainee",
  about: `Fui estudiante de la carrera de Contador Publico en la Universidad de Buenos Aires hasta el año 2020.
  Actualmente estudio la Tecnicatura Universitaria en Desarrollo de Software en la UADE, tras la cual continuare con la Ingenieria en Informatica.
  
  Por mi parte aprendi desarrollo web gracias a diversos cursos e internet.
  En el presente me enfoco en capacitarme, practicar con la realizacion de proyectos y seguir aprendiendo los procesos y buenas prácticas en esta materia.
  Programo mayormente en JavaScript y un poco en Python. Utilizo React y Next.js como framework de Frontend web. 
  Para el backend manejo  Node.js, Express y Flask.
  Tambien utilizo tecnologias como TypeScript, SQL, MongoDB, jQuery, SASS, entre otros.
  
  Me gusta describirme como una persona analitica, detallista y entusiasta que gusta tanto de buscar puntos débiles y aspectos de mejora y desarrollar soluciones.
  Me interesa continuar profundizando front end y aprender desarrollo backend y blockchain
  
  Mi portfolio se encuentra en desarrollo, pero puede visitarse mi github para mas o menos saber en que estoy trabajando
  
  Github: https://github.com/rei-rala
  Correo de contacto: ramonirala@outlook.com`,
  images: [
    "https://media-exp1.licdn.com/dms/image/C4D03AQHukYfNFf_aKw/profile-displayphoto-shrink_800_800/0/1616921269118?e=1658361600&v=beta&t=MXZNh40o7NUouUbLCTceBFCfkhHHZJtv568I01X2CPA",
  ],
  history: {
    academic: [
      {
        where: "Universidad Argentina de la Empresa",
        from: new Date(),
        to: new Date(),
        title: "Tecnicatura Universitaria en Desarrollo de Software",
        condition: "En curso",
        description: 'UADE',
      },
    ],
    professional: [
      {
        where: "Garantizar SGR",
        from: new Date(),
        to: new Date(),
        title: 'Analista de Riesgo',
        seniority: 'Semi Senior',
      },
      {
        where: "KPMG",
        from: new Date(),
        to: new Date(),
        title: 'Auditor Contable',
        seniority: 'Junior',
      },
    ]
  },
  contact: [
    {
      type: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ramon-irala-220362110/',
    },
    {
      type: 'GitHub',
      url: 'https://github.com/rei-rala'
    },
    {
      type: 'e-Mail',
      url: 'ramonirala@outlook.com'
    },
    {
      type: 'Portfolio',
      url: '-'
    }
  ],
  customSection: {
    title: 'Tecnologias',
    hover: 'Habilidad',
    lines: [
      {
        text: 'HTML5',
        icon: 'https://img.icons8.com/color/html-5',
        tooltip: 'Avanzado 🔥'
      },
      {
        text: 'CSS3',
        icon: 'https://img.icons8.com/color/css3',
        tooltip: 'Avanzado 🔥'
      },
      {
        text: 'SASS',
        icon: 'https://img.icons8.com/color/sass',
        tooltip: 'Intermedio 🤓'
      },
      {
        icon: 'https://img.icons8.com/color/javascript',
        text: 'JavaScript',
        tooltip: 'Avanzado 🔥'
      },
      {
        icon: 'https://img.icons8.com/color/react-native',
        text: 'React',
        tooltip: 'Avanzado 🔥'
      },
      {
        text: 'Next.js',
        icon: 'https://img.icons8.com/color/nextjs',
        tooltip: 'Pre intermedio? 🤔'
      },
      {
        icon: 'https://img.icons8.com/color/nodejs',
        text: 'Node.js',
        tooltip: 'Intermedio 😊'
      },
      {
        text: 'Express',
        icon: 'https://img.icons8.com/color/express',
        tooltip: 'Intermedio 🤓'
      },
      {
        text: 'Firebase',
        icon: 'https://img.icons8.com/color/firebase',
        tooltip: 'Intermedio 🤓'
      },

      {
        icon: 'https://img.icons8.com/color/python',
        text: 'Python',
        tooltip: 'Pre intermedio 😊'
      },
      {
        icon: 'https://img.icons8.com/color/django',
        text: 'Django',
        tooltip: 'Fundamentos 🤔'
      },
      {
        icon: 'https://img.icons8.com/color/java',
        text: 'Java',
        tooltip: 'Fundamentos 🤔'
      },
      {
        icon: 'https://img.icons8.com/color/git',
        text: 'Git',
        tooltip: 'Intermedio 🤓'
      },
      {
        text: 'Github',
        icon: 'https://img.icons8.com/color/github',
        tooltip: 'Intermedio 🤓'
      },
      {
        text: 'MongoDB',
        icon: 'https://img.icons8.com/color/mongodb',
        tooltip: 'Fundamentos 🤔'
      },
      {
        text: 'SQL',
        icon: 'https://img.icons8.com/color/sql',
        tooltip: 'Fundamentos 🤔'
      },
      {
        text: 'Heroku',
        icon: 'https://img.icons8.com/color/heroku',
        tooltip: 'Basico 🤔'
      },
      {
        text: 'Excel',
        icon: 'https://img.icons8.com/color/microsoft-excel',
        tooltip: 'Intermedio 🤓'
      },
      {
        text: 'PowerPoint',
        icon: 'https://img.icons8.com/color/powerpoint',
        tooltip: 'Intermedio 🤓'
      },
      {
        text: 'Power BI',
        icon: 'https://img.icons8.com/color/power-bi',
        tooltip: 'Intermedio 🤓'
      }
    ]
  },
  highlights: [
    {
      type: 'good',
      text: 'Aprendizaje constante',
    },
    {
      type: 'good',
      text: 'Detallista',
    },
    {
      type: 'good',
      text: 'Altamente dedicado',
    },
    {
      type: 'good',
      text: 'Actitud positiva',
    },
    {
      type: 'bad',
      text: 'Conformidad',
    },
    {
      type: 'bad',
      text: 'Experiencia en el sector',
    }
  ],
  languages: [
    {
      name: 'Español',
      icon: 'https://img.icons8.com/color/spain',
      level: 'Nativo',
    },
    {
      name: 'Ingles',
      icon: 'https://img.icons8.com/color/usa',
      level: 'Avanzado',
    },
  ],
}

export default profileExample