import fs from 'fs';
import path from 'path';

const COMPONENT_DIR = path.join(process.cwd(), 'src', 'components');

const replacements = {
  'theme-green-dark': 'theme-primary-dark',
  'theme-green-light': 'theme-primary',
  'theme-purple-dark': 'theme-secondary-dark',
  'theme-purple-light': 'theme-secondary',
  'bg-white/50': 'bg-theme-card/50',
  'bg-white/40': 'bg-theme-card/40',
  'bg-white/60': 'bg-theme-card/60',
  'bg-white': 'bg-theme-card',
  'border-white/60': 'border-theme-border/60',
  'border-white/50': 'border-theme-border/50',
  'border-white/40': 'border-theme-border/40',
  'border-white': 'border-theme-border',
  'text-gray-900': 'text-theme-text-strong',
  'text-gray-800': 'text-theme-text',
  'text-gray-700': 'text-theme-text',
  'text-gray-600': 'text-theme-text-muted',
  'text-gray-500': 'text-theme-text-muted',
  'text-gray-400': 'text-theme-text-muted',
  'text-white': 'text-theme-text-inverse',
  'bg-theme-bg/50': 'bg-theme-bg/50', // unchanged
  'bg-theme-bg/80': 'bg-theme-bg/80',
  'bg-theme-bg': 'bg-theme-bg', // unchanged
  'shadow-glow-green': 'shadow-glow-primary',
  'shadow-glow-purple': 'shadow-glow-secondary',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Since we want whole word replacements for tailwind classes, we can simply globally replace
  // We should be careful about order (e.g. replace text-gray-900 before text-gray).
  // The object keys are naturally ordered but we should sort by length descending to be safe.
  const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const val = replacements[key];
    // Use negative lookahead/behind to ensure we match full class names
    const regex = new RegExp(`(?<=[\\s"'\\\`])${key}(?=[\\s"'\\\`/:])|${key}(?=[\\s"'\\\`])`, 'g');
    content = content.replace(regex, val);
  }

  // Handle specific manual replacements where regex might miss due to brackets or template literals
  for (const key of sortedKeys) {
    content = content.split(key).join(replacements[key]);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

function traverseAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseAndReplace(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

traverseAndReplace(COMPONENT_DIR);
traverseAndReplace(path.join(process.cwd(), 'src')); // For App.jsx and index.css (though index.css we'll rewrite manually)
console.log('Refactoring complete.');
