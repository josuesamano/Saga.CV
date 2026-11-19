export type Locale = 'es' | 'en';

export const name = 'Josué Daniel Sámano García';

export const educationInstitution = 'Instituto Tecnológico Superior del Sur de Guanajuato';
export const learningTechnologies = ['React', 'Rust', 'Astro', 'Python', 'Foundry', 'LLMs', 'RAG', 'MLOps'];

export const certifications = [
  { name: 'Scrum for Operations & DevOps Fundamentals Certified', year: 2024 },
  { name: 'Scrum Fundamentals Certified', year: 2024 },
  { name: 'Android Certified Professional', year: 2014 },
  { name: 'Oracle Certified Java Programmer', year: 2013 },
];

const skills = {
  backend: '.NET 10, .NET Core, .NET Framework, C#, ASP.NET, ASP.NET Core Web API, Minimal APIs, Swagger / OpenAPI, Hangfire',
  frontend: 'Angular 18, AngularJS, TypeScript, JavaScript, PrimeNG, Tailwind CSS, Bootstrap, Angular Material',
  data: 'SQL Server, PostgreSQL, MySQL, MongoDB, SQLite, BigQuery',
  cloud: 'Azure Blob Storage, Azure Virtual Machines, Azure Static Web Apps, Azure App Service, Azure Container Registry (ACR), Azure Kubernetes Service (AKS)',
  devops: 'Azure DevOps, Azure Pipelines, Docker, Helm, GitHub, GitLab',
  messaging: 'Kafka, SignalR',
  tools: 'Visual Studio, VS Code, Jira, Figma, Sonar',
};

export const resume = {
  es: {
    description: 'Perfil profesional de Josué Daniel Sámano García, desarrollador full stack Senior .NET, líder técnico y arquitecto de software.',
    skip: 'Ir al contenido',
    languages: 'Idioma',
    navigation: 'Secciones del currículum',
    document: 'CV-Josue-Daniel-Samano-Garcia-ES',
    location: 'México · Trabajo remoto',
    title: 'Desarrollador full stack Senior .NET',
    subtitle: 'Líder técnico · Arquitecto de software',
    profile: 'Perfil profesional',
    summary: 'Ingeniero en Sistemas Computacionales con más de 15 años de experiencia en software empresarial con .NET, Angular y SQL Server. Más de 8 años de liderazgo técnico, con equipos de hasta 5 desarrolladores. Experiencia en arquitectura de microservicios, Clean Architecture, CQRS, DDD, optimización de rendimiento y servicios de Azure.',
    experience: 'Experiencia profesional',
    jobs: [
      {
        company: 'Axity',
        role: 'Desarrollador full stack Senior .NET',
        period: 'Agosto 2023 – Actualidad',
        highlights: [
          'Diseño y desarrollo de soluciones empresariales con .NET 7 y .NET 8.',
          'Implementación de consumidores Kafka para procesamiento en tiempo real.',
          'Desarrollo de APIs REST escalables y frontend con Angular 16.',
          'Optimización de rendimiento y escalabilidad con buenas prácticas de arquitectura limpia.',
        ],
      },
      {
        company: 'Metrixx',
        role: 'Jefe de Desarrollo',
        period: 'Agosto 2022 – Julio 2023',
        highlights: [
          'Liderazgo técnico de un equipo de hasta 5 desarrolladores y definición de arquitectura.',
          'Implementación de estándares de desarrollo y optimización del rendimiento.',
          'Coordinación de entregas a producción.',
        ],
      },
      {
        company: 'Metrixx',
        role: 'Desarrollador full stack Senior .NET y líder técnico',
        period: 'Noviembre 2015 – Julio 2022',
        highlights: [
          'Diseño de arquitectura base e implementación de patrones de diseño.',
          'Liderazgo técnico y mentoría de desarrolladores.',
          'Optimización del rendimiento de aplicaciones.',
        ],
      },
    ],
    stack: 'Tecnologías',
    groups: [
      ['Backend', skills.backend], ['Frontend', skills.frontend], ['Bases de datos', skills.data],
      ['Arquitectura', 'Clean Architecture, CQRS, DDD, microservicios, SOLID'],
      ['Nube', skills.cloud], ['DevOps', `CI/CD en varias etapas y entornos, ${skills.devops}`], ['Mensajería', skills.messaging],
      ['Herramientas', skills.tools],
    ],
    learning: 'Aprendizaje actual',
    education: 'Educación',
    degree: 'Ingeniería en Sistemas Computacionales',
    graduation: '2011 · Titulado',
    certifications: 'Certificaciones',
  },
  en: {
    description: 'Professional resume of Josué Daniel Sámano García, Senior .NET Full Stack Developer, Tech Lead and Software Architect.',
    skip: 'Skip to content',
    languages: 'Language',
    navigation: 'Resume sections',
    document: 'CV-Josue-Daniel-Samano-Garcia-EN',
    location: 'Mexico · Remote',
    title: 'Senior .NET Full Stack Developer',
    subtitle: 'Tech Lead · Software Architect',
    profile: 'Professional profile',
    summary: 'Software engineer with over 15 years of experience building enterprise software with .NET, Angular and SQL Server. Over 8 years of technical leadership, with teams of up to five developers. Experienced in microservices architecture, Clean Architecture, CQRS, DDD, performance optimization and Azure services.',
    experience: 'Professional experience',
    jobs: [
      {
        company: 'Axity',
        role: 'Senior .NET Full Stack Developer',
        period: 'August 2023 – Present',
        highlights: [
          'Designed and developed enterprise solutions with .NET 7 and .NET 8.',
          'Implemented Kafka consumers for real-time processing.',
          'Built scalable REST APIs and frontends with Angular 16.',
          'Improved performance and scalability by applying Clean Architecture practices.',
        ],
      },
      {
        company: 'Metrixx',
        role: 'Head of Development',
        period: 'August 2022 – July 2023',
        highlights: [
          'Led a team of up to five developers and defined technical architecture.',
          'Introduced development standards and optimized application performance.',
          'Coordinated production releases.',
        ],
      },
      {
        company: 'Metrixx',
        role: 'Senior .NET Full Stack Developer and Tech Lead',
        period: 'November 2015 – July 2022',
        highlights: [
          'Designed application architecture and implemented design patterns.',
          'Provided technical leadership and mentored developers.',
          'Optimized application performance.',
        ],
      },
    ],
    stack: 'Technical stack',
    groups: [
      ['Backend', skills.backend], ['Frontend', skills.frontend], ['Databases', skills.data],
      ['Architecture', 'Clean Architecture, CQRS, DDD, microservices, SOLID'],
      ['Cloud', skills.cloud], ['DevOps', `CI/CD across stages and environments, ${skills.devops}`], ['Messaging', skills.messaging],
      ['Tools', skills.tools],
    ],
    learning: 'Currently learning',
    education: 'Education',
    degree: 'Bachelor’s degree in Computer Systems Engineering',
    graduation: '2011 · Graduated',
    certifications: 'Certifications',
  },
} as const;
