const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'app', 'checkout', 'page.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Build component as a regular string to avoid template literal issues
const D = '$'; // Dollar sign helper

// ======================================
// STEP 1: Add ExtrasForm component before ActivityForm
// ======================================
const activityFormStart = 'function ActivityForm(';
const activityIdx = content.indexOf(activityFormStart);
if (activityIdx === -1) { console.error('Could not find ActivityForm'); process.exit(1); }

const extrasForm = [
'function ExtrasForm({ tour, selectedExtras, onNext, onBack, onExtrasChange }) {',
'    const [localExtras, setLocalExtras] = useState({...selectedExtras});',
'',
'    const handleChange = (index, delta) => {',
'        const newExtras = {...localExtras};',
'        const current = newExtras[index] || 0;',
'        const newVal = Math.max(0, current + delta);',
'        if (newVal === 0) { delete newExtras[index]; } else { newExtras[index] = newVal; }',
'        setLocalExtras(newExtras);',
'        onExtrasChange(newExtras);',
'    };',
'',
'    const getTotal = () => {',
'        let total = 0;',
'        Object.entries(localExtras).forEach(([index, count]) => {',
'            if (count > 0 && tour.extraServices && tour.extraServices[index]) {',
'                total += count * parseFloat(tour.extraServices[index].price);',
'            }',
'        });',
'        return total;',
'    };',
'',
'    return (',
'        <div className="space-y-4">',
'            {tour.extraServices && tour.extraServices.length > 0 ? (',
'                <div className="space-y-3">',
'                    {tour.extraServices.map((service, index) => {',
'                        const count = localExtras[index] || 0;',
'                        return (',
'                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#15531B]/30 transition-colors">',
'                                <div>',
'                                    <h4 className="font-bold text-sm text-[#1a1a1a]">{service.name}</h4>',
'                                    <p className="text-sm text-[#15531B] font-semibold">' + D + '{parseFloat(service.price).toFixed(2)} / person</p>',
'                                </div>',
'                                <div className="flex items-center gap-3">',
'                                    <button',
'                                        type="button"',
'                                        onClick={() => handleChange(index, -1)}',
'                                        disabled={count === 0}',
'                                        className={`w-8 h-8 rounded-full border flex items-center justify-center text-lg font-bold transition-colors ' + D + '{count === 0 ? \'border-gray-200 text-gray-300 cursor-not-allowed\' : \'border-[#15531B] text-[#15531B] hover:bg-[#15531B] hover:text-white\'}`}',
'                                    >',
'                                        −',
'                                    </button>',
'                                    <span className="w-6 text-center font-bold text-sm">{count}</span>',
'                                    <button',
'                                        type="button"',
'                                        onClick={() => handleChange(index, 1)}',
'                                        className="w-8 h-8 rounded-full border border-[#15531B] text-[#15531B] flex items-center justify-center text-lg font-bold hover:bg-[#15531B] hover:text-white transition-colors"',
'                                    >',
'                                        +',
'                                    </button>',
'                                </div>',
'                            </div>',
'                        );',
'                    })}',
'',
'                    {getTotal() > 0 && (',
'                        <div className="bg-[#15531B]/5 border border-[#15531B]/20 rounded-lg p-3 flex justify-between items-center">',
'                            <span className="text-sm font-medium text-[#15531B]">Extras Total</span>',
'                            <span className="font-bold text-[#15531B]">' + D + '{getTotal().toFixed(2)}</span>',
'                        </div>',
'                    )}',
'                </div>',
'            ) : (',
'                <div className="text-center py-8 text-gray-400">',
'                    <p className="text-sm">No extra services available for this tour.</p>',
'                </div>',
'            )}',
'',
'            <div className="pt-4 flex items-center gap-4">',
'                <button type="button" onClick={() => onNext(localExtras)} className="bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3 px-8 rounded-full transition-colors">Next</button>',
'                <button type="button" onClick={onBack} className="text-gray-500 font-bold text-sm hover:text-gray-700">Back</button>',
'            </div>',
'        </div>',
'    )',
'}',
'',
''
].join('\r\n');

content = content.substring(0, activityIdx) + extrasForm + content.substring(activityIdx);
console.log('1. Added ExtrasForm component');

// ======================================
// STEP 2: Add extrasResult state
// ======================================
const arLine = 'const [activityResult, setActivityResult] = useState(null);';
const arIdx = content.indexOf(arLine);
if (arIdx === -1) { console.error('Could not find activityResult state'); process.exit(1); }
content = content.substring(0, arIdx + arLine.length) + '\r\n  const [extrasResult, setExtrasResult] = useState(null);' + content.substring(arIdx + arLine.length);
console.log('2. Added extrasResult state');

// ======================================
// STEP 3: Update PaymentIntent fetch trigger from step 3 to step 4
// ======================================
content = content.replace(
    'if (step === 3 && bookingData && !clientSecret && !isFetchingSecret && !paymentError)',
    'if (step === 4 && bookingData && !clientSecret && !isFetchingSecret && !paymentError)'
);
console.log('3. Updated PaymentIntent fetch to step 4');

// ======================================
// STEP 4: Insert Extra Services step before Activity Details
// ======================================
const activityMarker = '{/* Step 2: Activity Details */}';
const amIdx = content.indexOf(activityMarker);
if (amIdx === -1) { console.error('Could not find Activity Details marker'); process.exit(1); }

const extrasStepLines = [
'{/* Step 2: Extra Services */}',
'               <div className={`bg-white p-6 rounded-xl border transition-all ' + D + '{step === 2 ? \'border-gray-200 shadow-sm\' : \'border-transparent\'}`}>',
'                  <div className="flex justify-between items-start mb-6">',
'                    <h2 className="text-xl font-bold flex items-center gap-3">',
'                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ' + D + '{step > 2 ? \'bg-[#15531B] text-white\' : step === 2 ? \'bg-black text-white\' : \'bg-gray-200 text-gray-500\'}`}>',
'                            {step > 2 ? <Check size={16} /> : \'2\'}',
'                        </div>',
'                        Extra services',
'                    </h2>',
'                     {step > 2 && (',
'                        <button onClick={() => setStep(2)} className="text-[#1a1a1a] text-sm font-bold underline hover:no-underline">Edit</button>',
'                    )}',
'                  </div>',
'',
'                  {step === 2 && (',
'                      <ExtrasForm',
'                        tour={tour}',
'                        selectedExtras={bookingData.selectedExtras || {}}',
'                        onExtrasChange={(newExtras) => {',
'                            setBookingData(prev => ({ ...prev, selectedExtras: newExtras }));',
'                        }}',
'                        onNext={(extras) => {',
'                            setExtrasResult(extras);',
'                            setBookingData(prev => ({ ...prev, selectedExtras: extras }));',
'                            const stored = JSON.parse(localStorage.getItem(\'checkoutData\') || \'{}\');',
'                            stored.selectedExtras = extras;',
'                            localStorage.setItem(\'checkoutData\', JSON.stringify(stored));',
'                            setStep(3);',
'                            window.scrollTo(0, 0);',
'                        }}',
'                        onBack={() => setStep(1)}',
'                      />',
'                  )}',
'                  {step > 2 && (',
'                      <div className="ml-11 text-sm text-gray-600">',
'                          {extrasResult && Object.entries(extrasResult).filter(([_, count]) => count > 0).length > 0 ? (',
'                              Object.entries(extrasResult).filter(([_, count]) => count > 0).map(([index, count]) => (',
'                                  <div key={index} className="flex justify-between py-1">',
'                                      <span>{tour.extraServices?.[index]?.name}</span>',
'                                      <span className="font-bold text-[#1a1a1a]">x{count} &mdash; ' + D + '{(count * parseFloat(tour.extraServices?.[index]?.price || 0)).toFixed(2)}</span>',
'                                  </div>',
'                              ))',
'                          ) : (',
'                              <p className="text-gray-400 italic">No extra services selected</p>',
'                          )}',
'                      </div>',
'                  )}',
'               </div>',
'',
'               '
].join('\r\n');

content = content.substring(0, amIdx) + extrasStepLines + content.substring(amIdx);
console.log('4. Inserted Extra Services step');

// ======================================
// STEP 5: Renumber Activity Details from step 2 to step 3
// ======================================
content = content.replace('{/* Step 2: Activity Details */}', '{/* Step 3: Activity Details */}');

// Find the activity details section boundaries
const s3Marker = '{/* Step 3: Activity Details */}';
const s3Idx = content.indexOf(s3Marker);
const payMarkerOrig = '{/* Step 3: Payment Details */}';
let payIdx = content.indexOf(payMarkerOrig);
if (payIdx === -1) {
    // Try to find it
    const altIdx = content.indexOf('Payment details', s3Idx + 200);
    if (altIdx === -1) { console.error('Could not find Payment section'); process.exit(1); }
    payIdx = content.lastIndexOf('{/*', altIdx);
}

let actSection = content.substring(s3Idx, payIdx);
// Replace step checks
actSection = actSection.replace(/step === 2 \?/g, 'step === 3 ?');
actSection = actSection.replace(/step > 2 \?/g, 'step > 3 ?');
actSection = actSection.replace(/step > 2 &&/g, 'step > 3 &&');
actSection = actSection.replace(/step === 2 &&/g, 'step === 3 &&');

// Fix the circle text from '2' to '3'
actSection = actSection.replace(
    "{step > 3 ? <Check size={16} /> : '2'}",
    "{step > 3 ? <Check size={16} /> : '3'}"
);

// Fix Edit button to go to step 3
actSection = actSection.replace(
    'onClick={() => setStep(2)}',
    'onClick={() => setStep(3)}'
);

// Fix onNext to go to step 4
actSection = actSection.replace(
    /setStep\(3\);/,
    'setStep(4);'
);

// Fix onBack to go to step 2 (extras)
actSection = actSection.replace(
    'onBack={() => setStep(1)}',
    'onBack={() => setStep(2)}'
);

content = content.substring(0, s3Idx) + actSection + content.substring(payIdx);
console.log('5. Renumbered Activity Details to step 3');

// ======================================
// STEP 6: Renumber Payment from step 3 to step 4
// ======================================
content = content.replace('{/* Step 3: Payment Details */}', '{/* Step 4: Payment Details */}');

// Update the step comparisons in payment section
const s4Marker = '{/* Step 4: Payment Details */}';
const s4Idx = content.indexOf(s4Marker);
if (s4Idx === -1) { console.error('Could not find step 4 marker'); process.exit(1); }

let paySection = content.substring(s4Idx);
paySection = paySection.replace(
    "step === 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'",
    "step === 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'"
);
paySection = paySection.replace(
    "step === 3 ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-60'",
    "step === 4 ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-60'"
);
paySection = paySection.replace('{step === 3 && (', '{step === 4 && (');
// Update the circle number 3 -> 4
paySection = paySection.replace(
    /\`\}\>3<\/div\>/,
    '`}>4</div>'
);

content = content.substring(0, s4Idx) + paySection;
console.log('6. Renumbered Payment to step 4');

fs.writeFileSync(filePath, content, 'utf8');
console.log('\nDone! Flow: Contact (1) -> Extras (2) -> Activity (3) -> Payment (4)');
