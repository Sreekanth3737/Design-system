# DynamicForm Component

A flexible, type-safe form component built with React Hook Form and our design system components.

## Features

- **Type-safe**: Full TypeScript support with proper type inference
- **Flexible**: Support for multiple input types including text, email, password, textarea, select, checkbox, radio, date, color picker, and tags
- **Validation**: Built-in validation with custom rules and error messages
- **Grouped Fields**: Support for nested form structures with grouped fields
- **Customizable**: Extensive customization options for styling and behavior
- **Accessible**: Built with accessibility in mind using semantic HTML and proper ARIA attributes

## Supported Input Types

- `text` - Standard text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Number input
- `textarea` - Multi-line text input
- `select` - Dropdown select
- `checkbox` - Single checkbox
- `radio` - Radio button group
- `date` - Date picker
- `color` - Color picker with predefined colors
- `tags` - Tag input with add/remove functionality
- `group` - Grouped fields container

## Basic Usage

```tsx
import { DynamicForm, FormElement } from "@yourorg/design-system";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const formElements: FormElement<ContactFormData>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your name",
    validation: {
      required: "Name is required",
      minLength: { value: 2, message: "Name must be at least 2 characters" },
    },
  },
  {
    name: "email",
    label: "Email",
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
    },
  },
];

const ContactForm = () => {
  const handleSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <DynamicForm
      elements={formElements}
      onSubmit={handleSubmit}
      submitButtonText="Send Message"
    />
  );
};
```

## Advanced Usage with Grouped Fields

```tsx
interface UserProfileData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

const profileElements: FormElement<UserProfileData>[] = [
  {
    name: "personalInfo" as any,
    label: "Personal Information",
    type: "group",
    children: [
      {
        name: "personalInfo.firstName" as any,
        label: "First Name",
        type: "text",
        validation: { required: "First name is required" },
      },
      {
        name: "personalInfo.lastName" as any,
        label: "Last Name",
        type: "text",
        validation: { required: "Last name is required" },
      },
      {
        name: "personalInfo.email" as any,
        label: "Email",
        type: "email",
        validation: { required: "Email is required" },
      },
    ],
  },
  {
    name: "preferences.theme" as any,
    label: "Theme",
    type: "radio",
    options: [
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ],
  },
  {
    name: "preferences.notifications" as any,
    label: "Enable notifications",
    type: "checkbox",
  },
];
```

## Props

### DynamicForm Props

| Prop               | Type               | Default  | Description                              |
| ------------------ | ------------------ | -------- | ---------------------------------------- |
| `elements`         | `FormElement<T>[]` | -        | Array of form elements to render         |
| `onSubmit`         | `SubmitHandler<T>` | -        | Form submission handler                  |
| `defaultValues`    | `Partial<T>`       | -        | Default form values                      |
| `className`        | `string`           | -        | CSS class for the form container         |
| `submitButtonText` | `string`           | 'Submit' | Text for the submit button               |
| `hideSubmitButton` | `boolean`          | `false`  | Whether to hide the submit button        |
| `isSubmitting`     | `boolean`          | `false`  | Whether the form is currently submitting |
| `form`             | `UseFormReturn<T>` | -        | External form instance (optional)        |

### FormElement Props

| Prop           | Type                              | Description                            |
| -------------- | --------------------------------- | -------------------------------------- |
| `name`         | `Path<T>`                         | Field name (must match your data type) |
| `label`        | `string`                          | Field label                            |
| `type`         | `InputType`                       | Input type                             |
| `placeholder`  | `string`                          | Placeholder text                       |
| `options`      | `SelectOption[] \| RadioOption[]` | Options for select/radio inputs        |
| `rows`         | `number`                          | Number of rows for textarea            |
| `className`    | `string`                          | CSS class for the input                |
| `children`     | `FormElement<T>[]`                | Child elements for group type          |
| `validation`   | `ValidationRules`                 | Validation rules                       |
| `colorOptions` | `string[]`                        | Available colors for color picker      |
| `disabled`     | `boolean`                         | Whether the field is disabled          |

## Validation

The component supports comprehensive validation rules:

```tsx
validation: {
  required: 'This field is required',
  minLength: { value: 3, message: 'Minimum 3 characters' },
  maxLength: { value: 100, message: 'Maximum 100 characters' },
  pattern: {
    value: /^[A-Za-z]+$/,
    message: 'Only letters allowed'
  },
  validate: (value) => {
    if (value < 18) return 'Must be 18 or older';
    return true;
  }
}
```

## Styling

The component uses Tailwind CSS classes and can be customized through:

- `className` prop on the form
- `className` prop on individual elements
- CSS custom properties for colors and spacing
- Tailwind utility classes

## Dependencies

- `react-hook-form` - Form state management and validation
- `date-fns` - Date formatting (for date picker)
- `lucide-react` - Icons
- All design system components (Button, Input, etc.)

## Examples

See the `DynamicForm.example.tsx` file for comprehensive usage examples including:

- Basic contact form
- User profile form with grouped fields
- Survey form with various input types
- Forms with validation and error handling
