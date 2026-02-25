import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, Anchor, Check, ChevronDown, ChevronUp } from 'lucide-react';
export default function PickupSelector({ configuration, selectedLocation, onSelect }) {
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync search input with selected location name if one is provided
  useEffect(() => {
    if (selectedLocation) {
        setSearch(selectedLocation.name);
    } else {
        setSearch('');
    }
  }, [selectedLocation]);

  if (!configuration?.pickup_offered) {
    return (
       <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-[#1a1a1a]" size={20} />
            <h3 className="font-bold text-[#1a1a1a]">Meeting Point</h3>
          </div>
          <p className="text-[#1a1a1a] ml-7">{configuration?.meeting_point_name || "Contact operator for details."}</p>
          <p className="text-gray-500 text-sm ml-7">{configuration?.meeting_point_address}</p>
       </div>
    );
  }

  const [locations, setLocations] = useState([]);

  useEffect(() => {
      const fetchLocations = async () => {
          try {
              const res = await fetch('/api/locations');
              const data = await res.json();
              if (data.success) {
                  setLocations(data.data);
              }
          } catch (error) {
              console.error('Failed to fetch locations', error);
          }
      };

      if (configuration?.pickup_offered) {
          fetchLocations();
      }
  }, [configuration?.pickup_offered]);

  const filteredLocations = locations.filter(loc => 
    loc && loc.name && loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (loc) => {
    if (onSelect) onSelect(loc);
    setSearch(loc.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 flex justify-center"><MapPin size={20} className="text-[#00694B]" /></div>
        <h3 className="font-bold text-[#1a1a1a]">Pickup points</h3>
      </div>

      {/* Selector UI */}
      <div className="ml-8 mb-6">
        <p className="font-bold text-[#1a1a1a] text-sm mb-2">Select a pickup point</p>

        {!selectedLocation ? (
          <div className="relative">
            <div className="relative">
              <input 
                type="text"
                placeholder="Type to search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setIsDropdownOpen(true); }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-[#1a1a1a] focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Dropdown Results */}
            {isDropdownOpen && (
              <div 
                onMouseDown={(e) => e.preventDefault()}
                className="w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto"
              >
                {filteredLocations.map((loc, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleSelect(loc)}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 border-gray-100"
                  >
                    {loc.type === 'Port' ? <Anchor size={18} className="text-[#00694B] mt-1" /> : <Building size={18} className="text-[#00694B] mt-1" />}
                    <div>
                      <div className="font-bold text-[#1a1a1a] text-sm">{loc.name}</div>
                      <div className="text-xs text-gray-500">{loc.address}</div>
                    </div>
                  </div>
                ))}
                {filteredLocations.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">No locations found</div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Selected State Card (Click to Change) */
          <div>
            <div 
                onClick={() => { if (onSelect) onSelect(null); setSearch(''); setIsDropdownOpen(true); }}
                className="rounded-md border border-[#00694B] bg-white p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                title="Click to change"
            >
                 <div className="font-medium text-[#1a1a1a] text-[15px] truncate pr-4">
                    <span className="font-bold">{selectedLocation.name}</span>, <span className="text-gray-600 font-normal">{selectedLocation.address}</span>
                 </div>
                 <div className="bg-[#00694B] rounded-full p-1 min-w-[20px] h-[20px] flex items-center justify-center">
                     <Check size={12} className="text-white" strokeWidth={4} />
                 </div>
            </div>

            <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.name + ' ' + selectedLocation.address)}`} 
                target="_blank" 
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[#1a1a1a] font-bold underline hover:no-underline text-[15px]"
            >
                Open in Google Maps <span className="text-lg leading-none">â€º</span>
            </a>
          </div>
        )}
      </div>

      {/* Instructions Text */}
      {configuration.pickup_instructions && (
        <div className="ml-8">
           <h3 className="font-bold text-[#1a1a1a] mb-2">Pickup details</h3>
           <div className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-[80px]'}`}>
               <p className="text-[#1a1a1a] text-sm leading-relaxed whitespace-pre-line">
                   {configuration.pickup_instructions}
               </p>
               
               {!isExpanded && (
                   <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-white to-transparent"></div>
               )}
           </div>
           
           <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-[#1a1a1a] font-bold text-sm mt-2 hover:underline"
           >
               {isExpanded ? 'Read less' : 'Read more'} 
               {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
           </button>
        </div>
      )}

    </div>
  );
}

