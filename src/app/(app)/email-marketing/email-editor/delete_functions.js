const fs = require('fs');
const file = 'c:/Users/DARSH/.antigravity/scalerbox-v1-saas-dashboard-email-marketing-/src/app/(app)/email-marketing/email-editor/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = "    const renderContainerOverlay =";
const endStr = "    // --- Tool strip chevron scroll logic";

const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + content.substring(endIdx);
    console.log("Successfully removed the three functions.");
} else {
    console.log("Could not find start or end block.");
}

const targetReplacementStr = `{structure.containers.map((container, ci) => (
                                                                <div key={container.id} style={{ flex: structure.columns[ci] ?? 1 }} className="w-full">
                                                                    {renderBoxContent(container.block ? container.block.type : 'empty', container.id, structure.id, backdrop.id)}
                                                                </div>
                                                            ))}`;
const replacementStr = `{structure.containers.map((container, ci) => (
                                                                <div key={container.id} style={{ flex: structure.columns[ci] ?? 1 }} className="w-full">
                                                                    {/* ContainerLayer will go here in Phase 5 */}
                                                                </div>
                                                            ))}`;

if (content.includes(targetReplacementStr)) {
    content = content.replace(targetReplacementStr, replacementStr);
    console.log("Successfully replaced renderBoxContent map implementation.");
} else {
    // try replacing differently if spacing mismatch
    console.log("Could not find target replacement string exactly. Trying regex or parts...");
    const regex1 = /\{renderBoxContent\(container\.block \? container\.block\.type : 'empty', container\.id, structure\.id, backdrop\.id\)\}/g;
    content = content.replace(regex1, "{/* ContainerLayer will go here in Phase 5 */}");
}

fs.writeFileSync(file, content);
