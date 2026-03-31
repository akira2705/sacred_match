export const states = ["Lagos", "FCT", "Oyo", "Rivers", "Kano", "Enugu", "Akwa Ibom"];
export const lgasByState = {
    Lagos: ["Eti-Osa", "Ikeja", "Surulere", "Yaba"],
    FCT: ["Garki", "Wuse", "Maitama", "Gwarinpa"],
    Oyo: ["Ibadan North", "Egbeda", "Ogbomosho North"],
    Rivers: ["Port Harcourt", "Obio-Akpor"],
    Kano: ["Nassarawa", "Gwale"],
    Enugu: ["Enugu North", "Nsukka"],
    "Akwa Ibom": ["Uyo", "Eket"]
};
export const bodyTypes = ["Slim", "Athletic", "Average", "Curvy", "Plus Size"];
export const educationLevels = ["Secondary", "ND/NCE", "HND/Bachelors", "Masters", "Doctorate"];
export const incomeRanges = ["Below ?250k", "?250k - ?500k", "?500k - ?1m", "?1m+"];
export const practiceLevels = ["Very Religious", "Practicing", "Balanced", "Spiritual", "Prefer not to say"];
export const marriageTypes = ["Customary Marriage", "Islamic Nikah", "Christian Wedding", "Civil Marriage"];
export const timelines = ["0-6 months", "6-12 months", "1-2 years", "Flexible"];
export const genotypeOptions = ["AA", "AS", "SS"];
export const genotypePrivacyOptions = ["Show to all", "Show to serious matches", "Keep private"];
export const idTypes = ["National ID", "Driver's License", "Passport", "Voter's Card"];
export const religions = [
    {
        label: "Islam",
        subgroups: ["Sunni", "Shia", "Tijaniyya", "Qadiriyya"]
    },
    {
        label: "Christianity",
        subgroups: ["Catholic", "Anglican", "Pentecostal", "Baptist", "Methodist"]
    },
    {
        label: "Traditional",
        subgroups: ["Indigenous practice", "Mixed heritage"]
    },
    {
        label: "Other",
        subgroups: ["Other faith tradition"]
    },
    {
        label: "Prefer not to say",
        subgroups: []
    }
];
export const ethnicGroupsByRegion = [
    { region: "South West", groups: ["Yoruba", "Ijebu", "Egba", "Ondo", "Ekiti"] },
    { region: "South East", groups: ["Igbo", "Anioma", "Ngwa", "Ezza", "Nsukka"] },
    { region: "South South", groups: ["Efik", "Ibibio", "Ijaw", "Urhobo", "Itsekiri"] },
    { region: "North West", groups: ["Hausa", "Fulani", "Nupe", "Gwari"] },
    { region: "North East", groups: ["Kanuri", "Bura", "Margi"] },
    { region: "North Central", groups: ["Tiv", "Idoma", "Berom", "Igala"] }
];
export const testingLabs = [
    {
        state: "Lagos",
        name: "Lagos University Teaching Hospital Lab",
        address: "Idi-Araba, Surulere, Lagos",
        phone: "+234 700 123 4567",
        hours: "Mon-Fri, 8 AM - 4 PM"
    },
    {
        state: "FCT",
        name: "National Hospital Abuja Diagnostics",
        address: "Central District, Abuja",
        phone: "+234 700 345 6789",
        hours: "Mon-Sat, 8 AM - 5 PM"
    },
    {
        state: "Oyo",
        name: "University College Hospital Lab",
        address: "Queen Elizabeth Road, Ibadan",
        phone: "+234 700 555 2200",
        hours: "Mon-Fri, 8 AM - 4 PM"
    },
    {
        state: "Rivers",
        name: "UPTH Lab Services",
        address: "Alakahia, Port Harcourt",
        phone: "+234 700 888 1900",
        hours: "Mon-Fri, 8 AM - 4 PM"
    }
];
