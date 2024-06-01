import { parseHTML } from "linkedom";
import { teach as teacherData } from "$lib/data";
import type { lesson } from './types';

export async function fetchTable(link: string = "https://www.zsem.edu.pl/plany/plany/o15.html") {
    const res = await fetch(link);
    // console.log(res)
    const text = await res.text();
    // console.log(text)
    const parse = parseHTML(text);
    const title = parse.document.querySelector("span.tytulnapis")?.innerHTML;
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
                const classroom = h!.querySelector("a.s");
                const clas = h!.querySelector("a.o");
                const short = (teach?.innerHTML)!;
                les.push({
                    name: h.querySelector("span.p")!.innerHTML,
                    teacher: teach ? {
                        link: (teach?.getAttribute("href"))!,
                        short,
                        name: teacherData.map(e => ({ name: `${e.name} ${e.surname}`, short: e.short })).filter(e => e.short === short)[0].name
                    } : undefined,
                    classroom: classroom ? {
                        name: (classroom?.innerHTML)!,
                        link: (classroom?.getAttribute("href"))!
                    } : undefined,
                    clas: clas ? {
                        name: (clas?.innerHTML)!,
                        link: (clas?.getAttribute("href"))!
                    } : undefined
                });
            });
            if (les.length <= 0) {
                try {
                    const teach = g!.querySelector("a.n");
                    const classroom = g!.querySelector("a.s");
                    const clas = g!.querySelector("a.o");
                    let short = (teach?.innerHTML)!;
                    les.push({
                        name: g.querySelector("span.p")!.innerHTML,
                        teacher: teach ? {
                            link: (teach?.getAttribute("href"))!,
                            short,
                            name: teacherData.map(e => ({ name: `${e.name} ${e.surname}`, short: e.short })).filter(e => e.short === short)[0].name
                        } : undefined,
                        classroom: classroom ? {
                            name: (classroom?.innerHTML)!,
                            link: (classroom?.getAttribute("href"))!
                        } : undefined,
                        clas: clas ? {
                            name: (clas?.innerHTML)!,
                            link: (clas?.getAttribute("href"))!
                        } : undefined
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
    return { title, head, lessons, hours, nrs, url: res.url, ts: new Date() };
}


export async function fetchSubstitutions() {
    const res = await fetch("https://zsem.edu.pl/plany/scripts/powrot.php", {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: "czegopragniesz=zastepstw",
        method: "POST",

    });
    if (!res.ok) return [];
    const subLinks: string[] | object | null = await res.json()
    if (subLinks) {
        return await Promise.all(Array.isArray(subLinks) ? subLinks.map(e => fetchSubstitution(e)) : Object.values(subLinks).map(e => fetchSubstitution(e)))
    }
    else return [];
}
async function fetchSubstitution(link: string) {
    const httpHeaders = new Headers();
    httpHeaders.set("Authorization", "Basic " + Buffer.from("zsem:123456").toString("base64"));
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
    return { head, headers, rows, ts: new Date() }
}