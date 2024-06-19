import { Achiemement, Education, Project, WorkExperience } from "./interfaces";

export const workExperiences: WorkExperience[] = [
    {
        company: "Amalitech Services",
        title: "Software Engineer",
        fromDate: new Date(2021, 6, 1),
        toDate: new Date(2022, 6, 1),
        roleDescription: ``,
        isCurrent: true,
        logo: "https://amalitech-testing.amalitech-dev.net/wp-content/uploads/2023/05/amali-services-01-e1587997109319-300x281-1.png"
    },
    {
        company: "Overloop LTD.",
        title: "Software Engineer",
        fromDate: new Date(2022, 6, 1),
        roleDescription: "",
        isCurrent: true,
        logo: "https://images.squarespace-cdn.com/content/v1/58d10f5e3a041177cac79cc4/1537288726634-I2UA13XAPP5FYRCV6Y1B/favicon.ico?format=100w"
    },
    {
        company: "Maatec Systems",
        title: "Software Engineer",
        fromDate: new Date(2019, 1, 1),
        toDate: new Date(2020, 1, 1),
        roleDescription: "",
        isCurrent: true,
        logo: "https://www.maatecsystems.com/assets/img/favicon.png"
    }
]

export const educations: Education[] = [
    {
        institution: "Kwame Nkrumah University of Science and Technology",
        program: "Bsc. Computer Science",
        fromDate: new Date(2015, 9, 1),
        toDate: new Date(2019, 6, 1),
        image: "https://webapps.knust.edu.gh/staff/assets/img/favicon.png"
    },
    {
        institution: "Blossom Academy",
        program: "Bsc. Computer Science",
        fromDate: new Date(2019, 1, 1),
        toDate: new Date(2020, 1, 1),
        image: "https://blossom.africa/wp-content/uploads/2022/06/cropped-blossomlog-32x32.png"
    }
]

export const aboutMe = `
I grew up in a Kumasi a city in Ghana with my parents. Tech was not developed during my early age so no one really motivated me to pursue a career in Tech.
However I was driven by passion to solve problems with Software
`

export const achievements: Achiemement[] = [
    {
        description: "Teaching python programming language since 2023",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
    },
    {
        description: "Organized Backend development conference in 2023",
        thumbnail: "https://img.freepik.com/free-vector/award-medal-realistic-composition-with-isolated-image-circle-shaped-medal-blank-background-vector-illustration_1284-66121.jpg"
    },
    {
        description: "Founder of Pentabyte, parent company of a number of SaaS products"
    }
]

export const projects: Project[] = [
    {
        title: "MyFluence",
        description: "",
        imageUrl: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1212,h=992,fit=crop/m7VqRKlKZaukW67g/_mg_0457-AR0eQBEvJVu39B9B.jpg",
        stack: [
            "Python",
            "Django"
        ]
    },
    {
        title: "DukaAssets",
        description: "",
        imageUrl: "https://storage.googleapis.com/msys-dukaassetswebsite-prod-content/media/filer_public_thumbnails/filer_public/9f/37/9f378513-cad0-4078-90a2-3d11b20bd43f/home.png__3585.0x3584.0_subsampling-2.png",
        stack: [
            "Python",
            "Django"
        ]
    },
    {
        title: "GMA Appointment Portal",
        description: "",
        imageUrl: "/images/gma_portal.png",
        stack: [
            "Python",
            "Django",
        ]
    }
]

export const techItems = [
    { name: 'Django, django CMS', level: 9 },
    { name: 'Python', level: 9 },
    { name: 'Go lang', level: 5 },
    { name: 'JavaScript', level: 9 },
    { name: 'React, Redux', level: 8 },
    { name: 'HTML & Email', level: 8 },
    { name: 'CSS & Sass', level: 6 },
    { name: 'ES6 & Typescript', level: 6 },
    { name: 'GraphQL, Rest', level: 8 },
    { name: 'Node, Webpack', level: 8 },
    { name: 'Express', level: 7 },
    { name: 'Docker, Kubernetes', level: 5 },
    { name: 'Cloud, GCP', level: 4 },
    { name: 'Adobe', level: 3 },
  ];
  