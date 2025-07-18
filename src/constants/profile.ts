export interface ProfileField {
  id: string;
  label: string;
  type: "text" | "date" | "tel" | "email";
  placeholder?: string;
  required: boolean;
  disabled?: boolean;
}

export interface CourseStat {
  id: string;
  label: string;
  value: number;
  color: string;
}

export const profileFields: ProfileField[] = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    id: "hometown",
    label: "Hometown",
    type: "text",
    placeholder: "Enter your hometown",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: false,
    disabled: true,
  },
];

export const courseStats: CourseStat[] = [
  {
    id: "joined",
    label: "Courses Joined",
    value: 12,
    color: "text-blue-400",
  },
  {
    id: "completed",
    label: "Courses Completed",
    value: 8,
    color: "text-green-400",
  },
  {
    id: "certificates",
    label: "NFT Certificates",
    value: 5,
    color: "text-purple-400",
  },
];

export const walletInfo = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  balance: "1,250.50 ADA",
}; 