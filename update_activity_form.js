const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'app', 'checkout', 'page.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldStart = 'function ActivityForm({ travelers, pickupConfig, initialPickup, onNext, onBack }) {';
const startIdx = content.indexOf(oldStart);
if (startIdx === -1) {
    console.error('Could not find ActivityForm start');
    process.exit(1);
}

// Find the closing brace of the function - looking for the closing brace pattern
// The function ends with "}\r\n}\r\n" (form closing, then function closing)
// We need to find the last } of the function which is followed by blank lines before EOF
const afterStart = startIdx + oldStart.length;

// Count braces to find the end of the function
let braceCount = 1; // We already passed the opening {
let i = afterStart;
while (i < content.length && braceCount > 0) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    i++;
}
const endIdx = i; // Position right after the closing }

console.log('Found ActivityForm from', startIdx, 'to', endIdx);
console.log('Last chars:', JSON.stringify(content.substring(endIdx - 5, endIdx + 5)));

const newActivityForm = `function ActivityForm({ travelers, pickupConfig, initialPickup, onNext, onBack }) {
    const [formData, setFormData] = useState({ 
        dateOfArrival: '', 
        cruiseShipName: '', 
        placeOfStay: '', 
        orderNotes: '',
        meetingPoint: '',
        meetingType: 'pickup'
    });

    const [errors, setErrors] = useState({});

    const cruiseShips = [
        'Carnival Vista',
        'Royal Caribbean Allure',
        'Norwegian Pearl',
        'MSC Seaside',
        'Celebrity Edge',
        'Holland America Nieuw Amsterdam',
        'Princess Regal',
        'Disney Fantasy',
        'Costa Luminosa',
        'Other'
    ];

    const placesOfStay = [
        'Mahogany Bay',
        'West Bay Beach',
        'West End',
        'Coxen Hole',
        'French Harbour',
        'Sandy Bay',
        'Parrot Tree',
        'Camp Bay',
        'Other'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        if (!formData.dateOfArrival) newErrors.dateOfArrival = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onNext({ ...formData });
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: false});
        }
    };

    const getInputClass = (fieldName) => {
        return errors[fieldName] 
            ? "w-full p-3 bg-[#feF2F2] border border-red-500 rounded-lg text-sm outline-none focus:border-red-500 placeholder-red-400"
            : "w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B]";
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date of Arrival */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#b8860b] font-medium z-10">Date of Arrival *</label>
                <input 
                    type="date"
                    name="dateOfArrival" 
                    className={getInputClass('dateOfArrival')}
                    onChange={handleChange}
                    value={formData.dateOfArrival}
                />
                {errors.dateOfArrival && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}
            </div>

            {/* Cruise Ship Name */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#b8860b] font-medium z-10">Cruise Ship Name (optional)</label>
                <select 
                    name="cruiseShipName" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B] appearance-none cursor-pointer"
                    onChange={handleChange}
                    value={formData.cruiseShipName}
                >
                    <option value="">Choose...</option>
                    {cruiseShips.map((ship, i) => (
                        <option key={i} value={ship}>{ship}</option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Place of Stay */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#b8860b] font-medium z-10">Place of Stay (optional)</label>
                <select 
                    name="placeOfStay" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B] appearance-none cursor-pointer"
                    onChange={handleChange}
                    value={formData.placeOfStay}
                >
                    <option value="">Choose...</option>
                    {placesOfStay.map((place, i) => (
                        <option key={i} value={place}>{place}</option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Order Notes */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400 font-medium z-10">Order Notes (optional)</label>
                <textarea 
                    name="orderNotes" 
                    rows={4}
                    className="w-full p-3 pt-4 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B] resize-y"
                    onChange={handleChange}
                    value={formData.orderNotes}
                />
            </div>

            <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3 px-8 rounded-full transition-colors">Next</button>
            </div>
        </form>
    )
}`;

content = content.substring(0, startIdx) + newActivityForm + content.substring(endIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated ActivityForm');
