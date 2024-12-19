import React from 'react';

export default function FormatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if it's a valid phone number
    if (cleaned.length < 10) return phoneNumber; // Return original if invalid
    
    // Handle different formats based on length
    if (cleaned.length === 10) {
        // Format: (XXX) XXX-XXXX
        return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11) {
        // Format: +X (XXX) XXX-XXXX
        return `+${cleaned.slice(0,1)} (${cleaned.slice(1,4)}) ${cleaned.slice(4,7)}-${cleaned.slice(7)}`;
    } else {
        // Format: +XX (XXX) XXX-XXXX
        return `+${cleaned.slice(0,2)} (${cleaned.slice(2,5)}) ${cleaned.slice(5,8)}-${cleaned.slice(8)}`;
    }
}
