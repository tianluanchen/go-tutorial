import path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getTheWayToGoParts = () => getParts(path.join(__dirname, "../the-way-to-go"), [3, 11, 15, 21])
export const getBuildWebAppParts = () => getParts(path.join(__dirname, "../build-web-app"), Array(14).fill(null).map((_, i) => i + 1))

function getParts(targetDir: string, breakpoints: number[]) {
    const parts: string[][] = Array(breakpoints.length).fill(null).map(() => []);
    fs.readdirSync(targetDir).forEach(file => {
        const m = file.match(/^(?<chapter>\d{1,2})\.\d{1,2}\.md$/);
        if (!m) {
            return;
        }
        // @ts-ignore
        const chapter = parseInt(m.groups.chapter);
        if (isNaN(chapter)) {
            return;
        }
        for (let i = 0; i < breakpoints.length; i++) {
            const p = breakpoints[i];
            if (chapter <= p) {
                parts[i].push(file);
                break;
            }
        }
    })
    for (let i = 0; i < parts.length; i++) {
        parts[i].sort((a, b) => {
            const [a1, a2]: any[] = a.split(".");
            const [b1, b2]: any[] = b.split(".");
            if (a1 - b1 !== 0) {
                return a1 - b1;
            } else {
                return a2 - b2;
            }

        });
    }
    return parts
}


