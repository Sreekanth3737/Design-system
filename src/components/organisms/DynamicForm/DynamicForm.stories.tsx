import type { Meta, StoryObj } from "@storybook/react";
import React,{useState} from "react";
import {
  DynamicForm,
  FormElement,
  FormRow,
  FormItem,
  DynamicFormProps,
} from "./index";
import { FieldValues } from "react-hook-form";
import { Button } from "../../atoms/Button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

type ComponentType = typeof DynamicForm;

const meta = {
  title: "Organisms/DynamicForm",
  component: DynamicForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<ComponentType>;

export default meta;

// Helper type to ensure proper typing of stories
type StoryWithConfig<T extends FieldValues> = Omit<
  StoryObj<typeof meta>,
  "args"
> & {
  args: DynamicFormProps<T>;
};

// Basic form example
interface BasicFormData extends FieldValues {
  name: string;
  email: string;
  message: string;
}

const basicFormElements: FormItem<BasicFormData>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    validation: {
      required: "Name is required",
      minLength: { value: 2, message: "Name must be at least 2 characters" },
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter your message",
    rows: 4,
    validation: {
      required: "Message is required",
      maxLength: {
        value: 500,
        message: "Message must be less than 500 characters",
      },
    },
  },
];

export const BasicForm: StoryWithConfig<BasicFormData> = {
  args: {
    elements: basicFormElements,
    onSubmit: (data: BasicFormData) => {
      console.log("Form submitted:", data);
      alert("Form submitted! Check console for data.");
    },
    submitButtonText: "Send Message",
  },
};

// Advanced form example
interface AdvancedFormData extends FieldValues {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    gender: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: string;
    favoriteColor: string;
    interests: string[];
  };
  feedback: string;
}

const advancedFormElements: FormItem<AdvancedFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "personalInfo.firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter first name",
        validation: { required: "First name is required" },
      },
      {
        name: "personalInfo.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
        validation: { required: "Last name is required" },
      },
    ],
  },
  {
    name: "personalInfo.email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    validation: { required: "Email is required" },
  },
  {
    name: "personalInfo.birthDate",
    label: "Birth Date",
    type: "date",
    placeholder: "Select your birth date",
  },
  {
    name: "personalInfo.gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "preferences.notifications",
    label: "Notification Preference",
    type: "select",
    placeholder: "Select notification preference",
    options: [
      { label: "Email only", value: "email" },
      { label: "SMS only", value: "sms" },
      { label: "Both", value: "both" },
      { label: "None", value: "none" },
    ],
  },
  {
    name: "preferences.favoriteColor",
    label: "Favorite Color",
    type: "color",
    colorOptions: [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ],
  },
  {
    name: "preferences.interests",
    label: "Interests",
    type: "tags",
    placeholder: "Add your interests...",
  },
  {
    name: "feedback",
    label: "Additional Feedback",
    type: "textarea",
    placeholder: "Share your thoughts...",
    rows: 3,
  },
  {
    name: "preferences.newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
  },
];

export const AdvancedForm: StoryWithConfig<AdvancedFormData> = {
  args: {
    elements: advancedFormElements,
    onSubmit: (data: AdvancedFormData) => {
      console.log("Advanced form submitted:", data);
      alert("Advanced form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        gender: "",
      },
      preferences: {
        newsletter: false,
        notifications: "",
        favoriteColor: "",
        interests: [],
      },
      feedback: "",
    },
  },
};

// Form with validation
interface ValidationFormData extends FieldValues {
  username: string;
  password: string;
  confirmPassword: string;
  age: number;
  terms: boolean;
}

const validationFormElements: FormItem<ValidationFormData>[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter username",
    validation: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
      maxLength: {
        value: 20,
        message: "Username must be less than 20 characters",
      },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    validation: {
      required: "Please confirm your password",
      validate: (value, formValues) => {
        return value === formValues.password || "Passwords do not match";
      },
    },
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    validation: {
      required: "Age is required",
      validate: (value) => {
        const age = parseInt(value);
        if (age < 18) return "You must be at least 18 years old";
        if (age > 120) return "Please enter a valid age";
        return true;
      },
    },
  },
  {
    name: "terms",
    label: "I agree to the terms and conditions",
    type: "checkbox",
    validation: {
      required: "You must accept the terms and conditions",
    },
  },
];

export const ValidationForm: StoryWithConfig<ValidationFormData> = {
  args: {
    elements: validationFormElements,
    onSubmit: (data: ValidationFormData) => {
      console.log("Validation form submitted:", data);
      alert("Registration successful! Check console for data.");
    },
    submitButtonText: "Register",
  },
};

// Loading state
export const LoadingForm: StoryWithConfig<BasicFormData> = {
  args: {
    elements: basicFormElements,
    onSubmit: (data: BasicFormData) => {
      console.log("Loading form submitted:", data);
    },
    submitButtonText: "Submit",
    isSubmitting: true,
  },
};

// Form without submit button
export const WithoutSubmitButton: StoryWithConfig<BasicFormData> = {
  args: {
    elements: basicFormElements.slice(0, 2),
    onSubmit: (data: BasicFormData) => {
      console.log("Form data:", data);
    },
    hideSubmitButton: true,
  },
};

// Row Layout Forms
interface RowFormData extends FieldValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  company: string;
  jobTitle: string;
  experience: string;
  bio: string;
  skills: string[];
  newsletter: boolean;
}

// Two Inputs Per Row
const twoInputsPerRowElements: FormItem<RowFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter first name",
        validation: { required: "First name is required" },
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
        validation: { required: "Last name is required" },
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter email address",
        validation: { required: "Email is required" },
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "Enter phone number",
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Enter company name",
      },
      {
        name: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Enter job title",
      },
    ],
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter full address",
  },
  {
    type: "row",
    elements: [
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Enter city",
      },
      {
        name: "state",
        label: "State",
        type: "text",
        placeholder: "Enter state",
      },
    ],
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself...",
    rows: 4,
  },
  {
    name: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
  },
];

export const TwoInputsPerRow: StoryWithConfig<RowFormData> = {
  args: {
    elements: twoInputsPerRowElements,
    onSubmit: (data: RowFormData) => {
      console.log("Two inputs per row form submitted:", data);
      alert("Two inputs per row form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
  },
};

// Three Inputs Per Row
const threeInputsPerRowElements: FormItem<RowFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter first name",
        validation: { required: "First name is required" },
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter email address",
        validation: { required: "Email is required" },
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "Enter phone number",
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Enter company name",
      },
      {
        name: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Enter job title",
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Enter city",
      },
      {
        name: "state",
        label: "State",
        type: "text",
        placeholder: "Enter state",
      },
      {
        name: "zipCode",
        label: "ZIP Code",
        type: "text",
        placeholder: "Enter ZIP code",
      },
    ],
  },
  {
    name: "address",
    label: "Full Address",
    type: "text",
    placeholder: "Enter full address",
  },
  {
    type: "row",
    elements: [
      {
        name: "experience",
        label: "Years of Experience",
        type: "select",
        placeholder: "Select experience level",
        width: "2/3",
        options: [
          { label: "0-1 years", value: "0-1" },
          { label: "2-5 years", value: "2-5" },
          { label: "5-10 years", value: "5-10" },
          { label: "10+ years", value: "10+" },
        ],
      },
    ],
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself...",
    rows: 4,
  },
  {
    name: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
    width: "1/3",
  },
];

export const ThreeInputsPerRow: StoryWithConfig<RowFormData> = {
  args: {
    elements: threeInputsPerRowElements,
    onSubmit: (data: RowFormData) => {
      console.log("Three inputs per row form submitted:", data);
      alert("Three inputs per row form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
  },
};

// Mixed Layout with Different Widths
const mixedLayoutFormElements: FormItem<RowFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter first name",
        width: "1/3",
        validation: { required: "First name is required" },
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
        width: "1/3",
        validation: { required: "Last name is required" },
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter email address",
        width: "1/3",
        validation: { required: "Email is required" },
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "Enter phone number",
        width: "1/2",
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Enter company name",
        width: "1/2",
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Enter city",
        width: "1/4",
      },
      {
        name: "state",
        label: "State",
        type: "text",
        placeholder: "Enter state",
        width: "1/4",
      },
      {
        name: "zipCode",
        label: "ZIP Code",
        type: "text",
        placeholder: "Enter ZIP code",
        width: "1/4",
      },
      {
        name: "country",
        label: "Country",
        type: "text",
        placeholder: "Enter country",
        width: "1/4",
      },
    ],
  },
  {
    name: "address",
    label: "Full Address",
    type: "textarea",
    placeholder: "Enter full address",
    rows: 3,
  },
  {
    type: "row",
    elements: [
      {
        name: "skills",
        label: "Skills",
        type: "tags",
        placeholder: "Add your skills...",
        width: "3/4",
      },
    ],
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself...",
    rows: 4,
  },
  {
    name: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
    width: "1/4",
  },
];

export const MixedWidthLayout: StoryWithConfig<RowFormData> = {
  args: {
    elements: mixedLayoutFormElements,
    onSubmit: (data: RowFormData) => {
      console.log("Mixed width layout form submitted:", data);
      alert("Mixed width layout form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
  },
};

// Legacy story name for backward compatibility
export const MixedResponsiveLayout: StoryWithConfig<RowFormData> = {
  args: {
    elements: mixedLayoutFormElements,
    onSubmit: (data: RowFormData) => {
      console.log("Mixed responsive layout form submitted:", data);
      alert("Mixed responsive layout form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
  },
};

// Custom Gap Layout
export const CustomGapLayout: StoryWithConfig<RowFormData> = {
  args: {
    elements: [
      {
        type: "row",
        gap: "gap-2", // Small gap
        elements: [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            placeholder: "First name",
            validation: { required: "Required" },
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            placeholder: "Last name",
            validation: { required: "Required" },
          },
        ],
      },
      {
        type: "row",
        gap: "gap-6", // Large gap
        elements: [
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Email address",
            validation: { required: "Required" },
          },
          {
            name: "phone",
            label: "Phone",
            type: "text",
            placeholder: "Phone number",
          },
        ],
      },
      {
        type: "row",
        gap: "gap-8", // Extra large gap
        elements: [
          {
            name: "company",
            label: "Company",
            type: "text",
            placeholder: "Company name",
          },
          {
            name: "jobTitle",
            label: "Job Title",
            type: "text",
            placeholder: "Job title",
          },
        ],
      },
    ],
    onSubmit: (data: RowFormData) => {
      console.log("Custom gap form submitted:", data);
      alert("Custom gap form submitted! Check console for data.");
    },
    submitButtonText: "Submit",
  },
};

// Additional legacy story names for backward compatibility
export const TwoColumnLayout: StoryWithConfig<RowFormData> = {
  args: {
    elements: twoInputsPerRowElements,
    onSubmit: (data: RowFormData) => {
      console.log("Two column form submitted:", data);
      alert("Two column form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
  },
};

export const ThreeColumnLayout: StoryWithConfig<RowFormData> = {
  args: {
    elements: threeInputsPerRowElements,
    onSubmit: (data: RowFormData) => {
      console.log("Three column form submitted:", data);
      alert("Three column form submitted! Check console for data.");
    },
    submitButtonText: "Submit Application",
  },
};

export const CompactLayout: StoryWithConfig<RowFormData> = {
  args: {
    elements: [
      {
        type: "row",
        gap: "gap-4",
        elements: [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            placeholder: "First name",
            validation: { required: "Required" },
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            placeholder: "Last name",
            validation: { required: "Required" },
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Email address",
            validation: { required: "Required" },
          },
        ],
      },
      {
        type: "row",
        gap: "gap-4",
        elements: [
          {
            name: "phone",
            label: "Phone",
            type: "text",
            placeholder: "Phone number",
          },
          {
            name: "company",
            label: "Company",
            type: "text",
            placeholder: "Company name",
          },
          {
            name: "jobTitle",
            label: "Job Title",
            type: "text",
            placeholder: "Job title",
          },
        ],
      },
    ],
    onSubmit: (data: RowFormData) => {
      console.log("Compact form submitted:", data);
      alert("Compact form submitted! Check console for data.");
    },
    submitButtonText: "Submit",
  },
};

// Multi-step form example
interface MultiStepFormData extends FieldValues {
  // Step 1: Personal Information
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
  // Step 2: Professional Details
  professionalInfo: {
    company: string;
    jobTitle: string;
    experience: string;
    skills: string[];
    department: string;
  };
  // Step 3: Additional Information
  additionalInfo: {
    bio: string;
    interests: string[];
    newsletter: boolean;
    preferredContact: string;
  };
}

const step1Elements: FormItem<MultiStepFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "personalInfo.firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "personalInfo.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "personalInfo.email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email",
        validation: {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        },
      },
      {
        name: "personalInfo.phone",
        label: "Phone Number",
        type: "text",
        placeholder: "Enter your phone number",
        validation: {
          pattern: {
            value: /^[\+]?[1-9][\d]{0,15}$/,
            message: "Please enter a valid phone number",
          },
        },
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "personalInfo.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        placeholder: "Select date",
        validation: {
          required: "Date of birth is required",
        },
        className: "w-full", // Make the date input full width
        helperText: "Click to open calendar", // Add helper text for better UX
      },
    ],
  },
];

const step2Elements: FormItem<MultiStepFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "professionalInfo.company",
        label: "Company",
        type: "text",
        placeholder: "Enter your company name",
        validation: {
          required: "Company name is required",
        },
      },
      {
        name: "professionalInfo.jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Enter your job title",
        validation: {
          required: "Job title is required",
        },
      },
    ],
  },
  {
    type: "row",
    elements: [
      {
        name: "professionalInfo.experience",
        label: "Years of Experience",
        type: "select",
        placeholder: "Select years of experience",
        options: [
          { label: "0-2 years", value: "0-2" },
          { label: "3-5 years", value: "3-5" },
          { label: "6-10 years", value: "6-10" },
          { label: "10+ years", value: "10+" },
        ],
        validation: {
          required: "Years of experience is required",
        },
      },
      {
        name: "professionalInfo.department",
        label: "Department",
        type: "select",
        placeholder: "Select your department",
        options: [
          { label: "Engineering", value: "engineering" },
          { label: "Design", value: "design" },
          { label: "Product", value: "product" },
          { label: "Marketing", value: "marketing" },
          { label: "Sales", value: "sales" },
          { label: "Other", value: "other" },
        ],
        validation: {
          required: "Department is required",
        },
      },
    ],
  },
  {
    name: "professionalInfo.skills",
    label: "Skills",
    type: "tags",
    placeholder: "Add your skills",
    validation: {
      required: "At least one skill is required",
    },
  },
];

const step3Elements: FormItem<MultiStepFormData>[] = [
  {
    type: "row",
    elements: [
      {
        name: "additionalInfo.preferredContact",
        label: "Preferred Contact Method",
        type: "radio",
        options: [
          { label: "Email", value: "email" },
          { label: "Phone", value: "phone" },
          { label: "Both", value: "both" },
        ],
        validation: {
          required: "Please select a preferred contact method",
        },
        className: "space-y-2", // Add spacing between radio options
      },
      {
        name: "additionalInfo.newsletter",
        label: "Subscribe to newsletter",
        type: "checkbox",
        className: "mt-6", // Add top margin to align with radio group
      },
    ],
  },
  {
    name: "additionalInfo.bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself",
    rows: 4,
    validation: {
      required: "Bio is required",
      maxLength: {
        value: 500,
        message: "Bio must be less than 500 characters",
      },
    },
  },
  {
    name: "additionalInfo.interests",
    label: "Interests",
    type: "tags",
    placeholder: "Add your interests",
    helperText: "Press Enter or comma to add an interest",
  },
];

export const MultiStepForm: StoryWithConfig<MultiStepFormData> = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<MultiStepFormData>({
      mode: "onChange",
      defaultValues: {
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
        },
        professionalInfo: {
          company: "",
          jobTitle: "",
          experience: "",
          skills: [],
          department: "",
        },
        additionalInfo: {
          bio: "",
          interests: [],
          newsletter: false,
          preferredContact: "",
        },
      },
    });

    const getCurrentStepElements = () => {
      switch (currentStep) {
        case 1:
          return step1Elements;
        case 2:
          return step2Elements;
        case 3:
          return step3Elements;
        default:
          return step1Elements;
      }
    };

    const getCurrentStepTitle = () => {
      switch (currentStep) {
        case 1:
          return "Personal Information";
        case 2:
          return "Professional Details";
        case 3:
          return "Additional Information";
        default:
          return "Personal Information";
      }
    };

    const getCurrentStepDescription = () => {
      switch (currentStep) {
        case 1:
          return "Please provide your basic personal information.";
        case 2:
          return "Tell us about your professional background.";
        case 3:
          return "Share additional details to complete your profile.";
        default:
          return "";
      }
    };

    const totalSteps = 3;
    const completedSteps = currentStep - 1;
    const progressPercent = isCompleted
      ? 100
      : Math.round((completedSteps / totalSteps) * 100);

    const handleStepSubmit = async (data: Partial<MultiStepFormData>) => {
      try {
        setIsSubmitting(true);

        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsCompleted(true);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API
          console.log("Final form data:", data);
          alert("Form submitted! Check console for data.");

          // reset after delay
          setTimeout(() => {
            setIsCompleted(false);
            setCurrentStep(1);
            form.reset();
          }, 500);
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        form.handleSubmit(handleStepSubmit)();
      }
    };

    const handleButtonClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      form.handleSubmit(handleStepSubmit)();
    };

    const customSubmitButton = (
      <div className="flex items-center justify-between sm:justify-end space-x-4 mt-6 pt-4 border-t">
        {currentStep > 1 && (
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            type="button"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button
          onClick={handleButtonClick}
          type="button"
          disabled={isSubmitting}
          className="min-w-[100px] flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {currentStep === 3 ? "Submitting..." : "Processing..."}
            </>
          ) : (
            <>
              {currentStep === 3 ? "Submit" : "Continue"}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </>
          )}
        </Button>
      </div>
    );

    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {getCurrentStepTitle()}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {getCurrentStepDescription()}
              </p>
            </div>
            <div className="hidden sm:flex items-center text-sm font-medium text-gray-500 space-x-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-blue-600">{progressPercent}% Complete</span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-100">
              <div
                style={{ width: `${progressPercent}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              />
            </div>
            <div className="hidden sm:flex justify-between -mt-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    currentStep >= step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-500 ${
                      currentStep > step
                        ? "bg-green-500 text-white"
                        : currentStep === step
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {currentStep > step ? "✓" : step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col space-y-6" onKeyDown={handleKeyDown}>
            <DynamicForm<MultiStepFormData>
              elements={getCurrentStepElements()}
              onSubmit={handleStepSubmit}
              className="flex flex-col"
              hideSubmitButton={true}
              mode="onChange"
              form={form}
              showErrorSummary={true}
            />
            {customSubmitButton}
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Press Ctrl + Enter to {currentStep === 3 ? "submit" : "continue"}
          </div>
        </div>
      </div>
    );
  },
  args: {
    elements: step1Elements,
    onSubmit: () => {},
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
      },
      professionalInfo: {
        company: "",
        jobTitle: "",
        experience: "",
        skills: [],
        department: "",
      },
      additionalInfo: {
        bio: "",
        interests: [],
        newsletter: false,
        preferredContact: "",
      },
    },
  },
};
