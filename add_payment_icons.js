
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'app', 'checkout', 'page.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import for PaymentMethodIcons after the PaymentSection import
const importMarker = "import PaymentSection from '@/components/PaymentSection';";
const newImport = "import PaymentSection from '@/components/PaymentSection';\nimport PaymentMethodIcons from '@/components/PaymentMethodIcons';";
content = content.replace(importMarker, newImport);

// 2. Add PaymentMethodIcons component above the Trustpilot div
const trustpilotMarker = '<div className="flex items-center justify-center gap-1 mt-2">';
const newBlock = `<PaymentMethodIcons />
                   <div className="flex items-center justify-center gap-1 mt-2">`;
content = content.replace(trustpilotMarker, newBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added PaymentMethodIcons to checkout page');
