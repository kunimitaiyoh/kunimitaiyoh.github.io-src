import { Instant } from "@/data/instant";

export interface Resources {
    resolveLastUpdate: (time: Instant) => string;
    email: string;
    head: string;
    name: string;
    nameLatin: string | null;
    birthday: string;
    location: string;
    company: string;
    digest: Digest;
    education: Education;
    workExperience: WorkExperience;
    privateActivities: PrivateActivities;
    skills: Skills;
    myAccounts: {
        title: string;
    };
    qualifications: {
        title: string;
        items: { date: string; title: string; }[]
        format(item: { date: string; title: string; }): string;
    };
    favoriteBooks: {
        title: string;
        items: { title: string }[];
    };
}

export interface Digest {
    title: string;
    text: string;
}

export interface Education {
    title: string;
    items: EducationItem[];

    format(e: EducationItem): string;
}

export interface EducationItem {
    date: string;
    title: string;
}

export interface WorkExperience {
    title: string;
    employments: Employment[];
    format(employment: Employment): string;
}

export interface Employment {
    company: string;
    type: string;
    start: string;
    end: string | null;
    description?: string;
    works: Work[];
}

export interface Work {
    description: string;
}

export interface PrivateActivities {
    title: string;
    items: PrivateActivity[];
}

export interface PrivateActivity {
    description: string;
    annotations?: string[];
}

export interface Skills {
    title: string;
    groups: SkillGroup[];
    others: {
        title: string;
        items: string[];
    };
}

export interface SkillGroup {
    name: string;
    content: string;
}
