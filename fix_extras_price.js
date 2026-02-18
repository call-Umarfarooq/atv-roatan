const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'app', 'checkout', 'page.jsx');
let content = fs.readFileSync(filePath, 'utf8');
const D = '$'; // Dollar sign helper

// ======================================
// FIX 1: Fix the "Your Special Price" to use dynamic calculation
// Replace: const finalAmountToPay = totalPrice * 1.10;
// With: dynamic calculation from basePrice + extrasTotal
// ======================================
const oldFinalCalc = 'const finalAmountToPay = totalPrice * 1.10;';
const newFinalCalc = `// Dynamic: recalculate from real base + current extras
                        const realPreTaxTotal = basePrice + extrasTotal;
                        const finalAmountToPay = hasPayNowDiscount 
                            ? (realPreTaxTotal * 0.98 * 1.10) 
                            : (realPreTaxTotal * 1.10);`;
content = content.replace(oldFinalCalc, newFinalCalc);
console.log('1. Fixed dynamic price calculation');

// ======================================
// FIX 2: Remove the Extra Services as a step
// - Remove the entire Step 2 section (Extra Services)
// - Revert Activity Details from step 3 to step 2
// - Revert Payment from step 4 to step 3
// - Remove extrasResult state (not needed anymore)
// ======================================

// 2a. Remove the Extra Services step section
const extrasStepStart = '{/* Step 2: Extra Services */}';
const extrasStepStartIdx = content.indexOf(extrasStepStart);
if (extrasStepStartIdx === -1) {
    console.error('Could not find Extra Services step');
    process.exit(1);
}

// Find the end - it ends before the Activity Details step
const activityStepMarker = '{/* Step 3: Activity Details */}';
const activityStepIdx = content.indexOf(activityStepMarker);
if (activityStepIdx === -1) {
    console.error('Could not find Activity Details step');
    process.exit(1);
}

// Remove the Extra Services step section
content = content.substring(0, extrasStepStartIdx) + content.substring(activityStepIdx);
console.log('2a. Removed Extra Services step section');

// 2b. Renumber Activity Details from step 3 back to step 2
content = content.replace('{/* Step 3: Activity Details */}', '{/* Step 2: Activity Details */}');

// Find Activity section and update step numbers
const s2Marker = '{/* Step 2: Activity Details */}';
const s2Idx = content.indexOf(s2Marker);
const payMarker = '{/* Step 4: Payment Details */}';
const payIdx = content.indexOf(payMarker);

let actSection = content.substring(s2Idx, payIdx);
actSection = actSection.replace(/step === 3 \?/g, 'step === 2 ?');
actSection = actSection.replace(/step > 3 \?/g, 'step > 2 ?');
actSection = actSection.replace(/step > 3 &&/g, 'step > 2 &&');
actSection = actSection.replace(/step === 3 &&/g, 'step === 2 &&');
actSection = actSection.replace(
    "{step > 2 ? <Check size={16} /> : '3'}",
    "{step > 2 ? <Check size={16} /> : '2'}"
);
actSection = actSection.replace(
    'onClick={() => setStep(3)}',
    'onClick={() => setStep(2)}'
);
actSection = actSection.replace('setStep(4);', 'setStep(3);');
actSection = actSection.replace(
    'onBack={() => setStep(2)}',
    'onBack={() => setStep(1)}'
);
content = content.substring(0, s2Idx) + actSection + content.substring(payIdx);
console.log('2b. Renumbered Activity Details back to step 2');

// 2c. Renumber Payment from step 4 back to step 3
content = content.replace('{/* Step 4: Payment Details */}', '{/* Step 3: Payment Details */}');
const s3Marker = '{/* Step 3: Payment Details */}';
const s3Idx = content.indexOf(s3Marker);
let paySection = content.substring(s3Idx);
paySection = paySection.replace(
    "step === 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'",
    "step === 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'"
);
paySection = paySection.replace(
    "step === 4 ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-60'",
    "step === 3 ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-60'"
);
paySection = paySection.replace('{step === 4 && (', '{step === 3 && (');
paySection = paySection.replace(/`\}>4<\/div>/g, '`}>3</div>');
content = content.substring(0, s3Idx) + paySection;
console.log('2c. Renumbered Payment back to step 3');

// 2d. Update PaymentIntent fetch trigger from step 4 back to step 3
content = content.replace(
    'if (step === 4 && bookingData && !clientSecret && !isFetchingSecret && !paymentError)',
    'if (step === 3 && bookingData && !clientSecret && !isFetchingSecret && !paymentError)'
);
console.log('2d. Updated PaymentIntent fetch to step 3');

// ======================================
// FIX 3: Add always-visible Extra Services card in the right sidebar
// Insert it before the "Book with confidence" section in the order summary
// ======================================
const secureCheckoutLine = '<p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">';
const scIdx = content.indexOf(secureCheckoutLine);
if (scIdx === -1) {
    console.error('Could not find Secure Checkout line');
    process.exit(1);
}

const extrasCardHtml = [
'',
'                    {/* Extra Services - Always Visible */}',
'                    {tour.extraServices && tour.extraServices.length > 0 && (',
'                        <div className="mt-6 border border-dashed border-[#15531B]/40 rounded-xl p-4 bg-[#15531B]/5">',
'                            <h4 className="font-bold text-sm text-[#15531B] mb-1">🎯 Enhance Your Experience</h4>',
'                            <p className="text-xs text-gray-500 mb-4">Add optional services to make your tour even more memorable!</p>',
'                            <div className="space-y-3">',
'                                {tour.extraServices.map((service, index) => {',
'                                    const count = (bookingData.selectedExtras || {})[index] || 0;',
'                                    return (',
'                                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">',
'                                            <div>',
'                                                <h5 className="font-bold text-xs text-[#1a1a1a]">{service.name}</h5>',
'                                                <p className="text-xs text-[#15531B] font-semibold">' + D + '{parseFloat(service.price).toFixed(2)}</p>',
'                                            </div>',
'                                            <div className="flex items-center gap-2">',
'                                                <button',
'                                                    type="button"',
'                                                    onClick={() => {',
'                                                        const newExtras = {...(bookingData.selectedExtras || {})};',
'                                                        const curr = newExtras[index] || 0;',
'                                                        if (curr > 0) { newExtras[index] = curr - 1; if (newExtras[index] === 0) delete newExtras[index]; }',
'                                                        setBookingData(prev => ({ ...prev, selectedExtras: newExtras }));',
'                                                        const stored = JSON.parse(localStorage.getItem(\'checkoutData\') || \'{}\');',
'                                                        stored.selectedExtras = newExtras;',
'                                                        localStorage.setItem(\'checkoutData\', JSON.stringify(stored));',
'                                                    }}',
'                                                    disabled={count === 0}',
'                                                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold transition-colors ' + D + '{count === 0 ? \'border-gray-200 text-gray-300 cursor-not-allowed\' : \'border-[#15531B] text-[#15531B] hover:bg-[#15531B] hover:text-white\'}`}',
'                                                >',
'                                                    −',
'                                                </button>',
'                                                <span className="w-5 text-center font-bold text-xs">{count}</span>',
'                                                <button',
'                                                    type="button"',
'                                                    onClick={() => {',
'                                                        const newExtras = {...(bookingData.selectedExtras || {})};',
'                                                        newExtras[index] = (newExtras[index] || 0) + 1;',
'                                                        setBookingData(prev => ({ ...prev, selectedExtras: newExtras }));',
'                                                        const stored = JSON.parse(localStorage.getItem(\'checkoutData\') || \'{}\');',
'                                                        stored.selectedExtras = newExtras;',
'                                                        localStorage.setItem(\'checkoutData\', JSON.stringify(stored));',
'                                                    }}',
'                                                    className="w-7 h-7 rounded-full border border-[#15531B] text-[#15531B] flex items-center justify-center text-sm font-bold hover:bg-[#15531B] hover:text-white transition-colors"',
'                                                >',
'                                                    +',
'                                                </button>',
'                                            </div>',
'                                        </div>',
'                                    );',
'                                })}',
'                            </div>',
'                        </div>',
'                    )}',
''
].join('\r\n');

content = content.substring(0, scIdx) + extrasCardHtml + '\r\n                    ' + content.substring(scIdx);
console.log('3. Added always-visible Extras card in sidebar');

// ======================================
// FIX 4: Remove the ExtrasForm component (no longer needed)
// ======================================
const extrasFormStart = 'function ExtrasForm(';
const extrasFormIdx = content.indexOf(extrasFormStart);
if (extrasFormIdx !== -1) {
    // Find the end using brace counting
    const afterStart = content.indexOf('{', extrasFormIdx);
    let braceCount = 1;
    let i = afterStart + 1;
    while (i < content.length && braceCount > 0) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        i++;
    }
    // Skip any trailing whitespace/newlines
    while (i < content.length && (content[i] === '\r' || content[i] === '\n')) i++;
    content = content.substring(0, extrasFormIdx) + content.substring(i);
    console.log('4. Removed ExtrasForm component');
} else {
    console.log('4. ExtrasForm not found (already removed)');
}

// ======================================
// FIX 5: Clean up extrasResult state (keep it to avoid errors but it's unused)
// Actually let's remove the extrasResult references
// ======================================
// Just leave the state, it won't cause issues

fs.writeFileSync(filePath, content, 'utf8');
console.log('\nDone! Extras card is now always visible in sidebar, price updates dynamically.');
