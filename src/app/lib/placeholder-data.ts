import { Achiemement, Education, WorkExperience } from "./interfaces";

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