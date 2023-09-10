import type { PageServerLoad } from './$types';
import { parseHTML } from "linkedom";

export const load = (async (e) => {
    const [table, substitutions] = await Promise.all([fetchTable(), fetchSubstitutions()]);

    return { table, substitutions };
}) satisfies PageServerLoad;

interface lesson {
    name: string,
    teacher: {
        link: string,
        short: string,
    },
    classroom: {
        name: string,
        link: string,
    }
}

async function fetchTable() {
    const res = await fetch("https://www.zsem.edu.pl/plany/plany/o15.html");
    const text = await res.text();
    const parse = parseHTML(text);
    const title = parse.document.querySelector("span.tytulnapis")!.innerHTML;
    const table = parse.document.querySelector("table.tabela");

    const head: string[] = [];
    table!.querySelectorAll("th").forEach(f => {
        head.push(f.innerText);
    });
    const nrs: string[] = [];
    table!.querySelectorAll("td.nr").forEach(f => {
        nrs.push(f.innerHTML);
    });
    const hours: string[] = [];
    table!.querySelectorAll("td.g").forEach(f => {
        hours.push(f.innerHTML);
    });
    const lessons: lesson[][][] = [];
    table!.querySelectorAll("tr").forEach(f => {
        const cells: lesson[][] = [];
        const isHead = f.querySelectorAll("th");
        f!.querySelectorAll("td.l").forEach(g => {
            const les: lesson[] = [];
            g!.querySelectorAll("td.l > span[style=font-size:85%]").forEach(h => {
                const teach = h!.querySelector("a.n");
                const clas = h!.querySelector("a.s");
                les.push({
                    name: h.querySelector("span.p")!.innerHTML,
                    teacher: {
                        link: teach?.getAttribute("href")!,
                        short: teach?.innerHTML!
                    },
                    classroom: {
                        name: clas?.innerHTML!,
                        link: clas?.getAttribute("href")!
                    }
                });
            });
            if (les.length <= 0) {
                try {
                    const teach = g!.querySelector("a.n");
                    const clas = g!.querySelector("a.s");
                    les.push({
                        name: g.querySelector("span.p")!.innerHTML,
                        teacher: {
                            link: teach?.getAttribute("href")!,
                            short: teach?.innerHTML!
                        },
                        classroom: {
                            name: clas?.innerHTML!,
                            link: clas?.getAttribute("href")!
                        },
                    });
                }
                catch (e) {
                }
            }
            cells.push(les);
        });
        if (isHead.length == 0) {
            lessons.push(cells);
        }
    });
    return { title, head, lessons, hours, nrs };
}

async function fetchSubstitutions() {
    const res = await fetch("https://zsem.edu.pl/plany/scripts/powrot.php", {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: "czegopragniesz=zastepstw",
        method: "POST",

    });
    const subLinks: string[] = await res.json()
    return await Promise.all(subLinks.map(fetchSubstitution))
}
async function fetchSubstitution(link: string) {
    const httpHeaders = new Headers();
    httpHeaders.set("Authorization", "Basic " + btoa("zsem:123456"));
    const res = await fetch(`https://zsem.edu.pl/zastepstwa/${link}.html`, { headers: httpHeaders });
    const text = await res.text();
    const parse = parseHTML(text);
    const table = parse.document.querySelector("table")
    const head = table!.querySelector("th[colspan=8]")!.innerHTML;
    const headers: string[] = []
    table!.querySelectorAll("tr:nth-child(2) th").forEach(f => {
        headers.push(f.innerHTML)
    })
    const rows: string[][] = []
    table!.querySelectorAll("tr").forEach(f => {
        const row: string[] = []
        f.querySelectorAll("td").forEach(g => {
            row.push(g.innerHTML)
        })
        if (row.length >= 0) {
            rows.push(row)
        }

    })
    return { head, headers, rows }
}