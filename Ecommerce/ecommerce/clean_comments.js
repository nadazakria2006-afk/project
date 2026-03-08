const fs = require('fs');
const path = require('path');

function walk(dir, cb) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p, cb);
        else cb(p);
    });
}

function cleanFile(file) {
    if (!file.match(/\.(ts|tsx|js|jsx)$/)) return;
    let code = fs.readFileSync(file, 'utf8');
    let original = code;

    // 1. Remove JSX comments block
    code = code.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');

    // 2. Remove other block comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');

    // 3. Remove full-line comments
    code = code.replace(/^[ \t]*\/\/.*$/gm, '');

    // 4. Remove inline comments (not preceded by ':')
    code = code.replace(/([^:])[ \t]*\/\/.*$/gm, '$1');

    // 5. clean up empty lines (max 1 consecutive empty line)
    let lines = code.split('\n');
    let newLines = [];
    let emptyCount = 0;
    for (let line of lines) {
        if (line.trim() === '') {
            emptyCount++;
            if (emptyCount > 1) continue;
        } else {
            emptyCount = 0;
        }
        newLines.push(line);
    }
    code = newLines.join('\n');

    // Also trim start of file
    code = code.trimStart();

    if (code !== original) {
        fs.writeFileSync(file, code);
        console.log('Cleaned ' + file);
    }
}

['app', 'components', 'services', 'lib', 'store', 'context', 'hooks'].forEach(d => {
    let fullPath = path.join(__dirname, d);
    if (fs.existsSync(fullPath)) walk(fullPath, cleanFile);
});

['next.config.ts', 'middleware.ts'].forEach(f => {
    let fullPath = path.join(__dirname, f);
    if (fs.existsSync(fullPath)) cleanFile(fullPath);
});
