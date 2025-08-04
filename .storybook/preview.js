/** @type { import('@storybook/react').Preview } */
import "../src/styles/globals.css";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === "string"
            ? notes
            : notes.markdown || notes.text;
        }
        return null;
      },
    },
  },
};

export default preview;
