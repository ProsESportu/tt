import type { fetchTable,fetchSubstitutions } from "./lib";

export interface lesson {
    name: string;
    teacher?: {
        link: string;
        short: string;
        name: string;
    };
    classroom?: {
        name: string;
        link: string;
    };
    clas?: {
        name: string;
        link: string;
    }
}

export type lessons = Awaited<ReturnType<typeof fetchTable>>
export type substitutions = Awaited<ReturnType<typeof fetchSubstitutions>>