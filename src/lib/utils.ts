import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Handle null, undefined, or empty string
  if (!phoneNumber) return '';

  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Handle different length phone numbers
  if (cleaned.length === 10) {
    // Format as (XXX) XXX-XXXX for 10 digit numbers
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  } else if (cleaned.length === 7) {
    // Format as XXX-XXXX for 7 digit numbers
    const match = cleaned.match(/^(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
  } else if (cleaned.length === 11) {
    // Handle 11 digit numbers - format as XXX XXXX XXXX
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
  }

  // If the number doesn't match any expected format, return cleaned version
  return cleaned;
}

// Country codes remain the same
export const COUNTRY_CODES = [
  { value: "1", label: "🇺🇸 +1" },
  { value: "44", label: "🇬🇧 +44" },
  { value: "81", label: "🇯🇵 +81" },
  { value: "86", label: "🇨🇳 +86" },
  { value: "91", label: "🇮🇳 +91" },
  { value: "61", label: "🇦🇺 +61" },
  { value: "49", label: "🇩🇪 +49" },
  { value: "33", label: "🇫🇷 +33" },
  { value: "39", label: "🇮🇹 +39" },
  { value: "7", label: "🇷🇺 +7" },
]