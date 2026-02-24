const fs = require('fs');

const path = 'src/app/(app)/email-marketing/email-editor/page.tsx';
let lines = fs.readFileSync(path, 'utf-8').split('\n');

const startIdx = lines.findIndex(l => l.includes('{/* Code Editor Slide-Up Slider */}'));
let endIdx = -1;
for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].includes('{/* Right Sidebar Property Panel */}')) {
        endIdx = i - 1; // End right before the Right Sidebar comment, which includes empty line
        break;
    }
}

// Extract the chunk
const chunk = lines.splice(startIdx, endIdx - startIdx);

// Remove the blank line before Right Sidebar if there's one left
if (lines[startIdx] && lines[startIdx].trim() === '') {
    lines.splice(startIdx, 1);
}

// Find target injection index right before the final `</div>\n    );`
let targetIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('    )')) {
        targetIdx = i - 1;
        break;
    }
}

// Modify the chunk to update z-index from z-[30] to z-[100] for full overlay safety
for (let i = 0; i < chunk.length; i++) {
    if (chunk[i].includes('z-[30]')) {
        chunk[i] = chunk[i].replace('z-[30]', 'z-[100]');
    }
}

// Insert chunk
lines.splice(targetIdx, 0, ...chunk);

fs.writeFileSync(path, lines.join('\n'));
console.log('Successfully relocated Code Editor to full-screen overlay.');
