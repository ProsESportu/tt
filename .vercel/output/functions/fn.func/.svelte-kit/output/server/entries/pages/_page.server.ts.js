import { parseHTML } from "linkedom";
const load = async (e) => {
  const res = await e.fetch("https://www.zsem.edu.pl/plany/plany/o15.html");
  const text = await res.text();
  const parse = parseHTML(text);
  const title = parse.document.querySelector("span.tytulnapis").innerHTML;
  const table = parse.document.querySelector("table.tabela");
  const head = [];
  table.querySelectorAll("th").forEach((f) => {
    head.push(f.innerText);
  });
  const nrs = [];
  table.querySelectorAll("td.nr").forEach((f) => {
    nrs.push(f.innerHTML);
  });
  const hours = [];
  table.querySelectorAll("td.g").forEach((f) => {
    hours.push(f.innerHTML);
  });
  const lessons = [];
  table.querySelectorAll("tr").forEach((f) => {
    const cells = [];
    const isHead = f.querySelectorAll("th");
    f.querySelectorAll("td.l").forEach((g) => {
      const les = [];
      g.querySelectorAll("td.l > span[style=font-size:85%]").forEach((h) => {
        const teach = h.querySelector("a.n");
        const clas = h.querySelector("a.s");
        les.push({
          name: h.querySelector("span.p").innerHTML,
          teacher: {
            link: teach?.getAttribute("href"),
            short: teach?.innerHTML
          },
          classroom: {
            name: clas?.innerHTML,
            link: clas?.getAttribute("href")
          }
        });
      });
      if (les.length <= 0) {
        try {
          const teach = g.querySelector("a.n");
          const clas = g.querySelector("a.s");
          les.push({
            name: g.querySelector("span.p").innerHTML,
            teacher: {
              link: teach?.getAttribute("href"),
              short: teach?.innerHTML
            },
            classroom: {
              name: clas?.innerHTML,
              link: clas?.getAttribute("href")
            }
          });
        } catch (e2) {
        }
      }
      cells.push(les);
    });
    if (isHead.length == 0) {
      lessons.push(cells);
    }
  });
  return { title, head, lessons, hours, nrs };
};
export {
  load
};
