import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetch } from 'undici'; // Modern fetch implementation

// Get current directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try alternative URLs if the primary one fails
const IONIC_CORE_JSON = 'https://unpkg.com/@ionic/docs/core.json';

const OUTPUT_DIR = path.join(__dirname, './ionic-svelte');

/**
 * Ensures output directory exists
 */
async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating output directory:', err);
    throw err;
  }
}

/**
 * Downloads the Ionic components definition JSON using fetch API
 * @returns {Promise<Object>} The parsed JSON data
 */
async function downloadIonicDefinition() {
  try {
    console.log(`Fetching from: ${IONIC_CORE_JSON}`);

    // Fetch will automatically follow redirects
    const response = await fetch(IONIC_CORE_JSON, {
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Failed to download: Status code ${response.status}`);
    }

    // Log the actual URL after redirects
    console.log(`Successfully downloaded from: ${response.url}`);

    // Parse the JSON response
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(`Error downloading from ${IONIC_CORE_JSON}: ${error.message}`);

    process.exit(1);
  }
}

/**
 * Converts a component tag to pascal case (e.g., ion-button => IonButton)
 * @param {string} tag - The component tag
 * @returns {string} The pascal case name
 */
function toPascalCase(tag) {
  return tag.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Gets TypeScript type annotation for a prop
 * @param {Object} prop - The property definition
 * @returns {string} TypeScript type annotation
 */
function getTypeAnnotation(prop) {
  if (!prop.type) return 'any';

  let type = prop.type;

  // Handle special cases
  if (type.includes('|')) {
    if (type.includes('string') && type.includes('undefined')) {
      return 'string | undefined';
    } else if (type.includes('boolean') && type.includes('undefined')) {
      return 'boolean | undefined';
    } else if (type.includes('number') && type.includes('undefined')) {
      return 'number | undefined';
    } else {
      return 'any';
    }
  }

  // Simple types
  if (type === 'string' || type === 'boolean' || type === 'number') {
    return type;
  }

  return 'any';
}

/**
 * Gets the default value for a prop as a string representation
 * @param {Object} prop - The property definition
 * @returns {string} The default value as a string
 */
function getDefaultValue(prop) {
  if (prop.default === undefined || prop.default === null) {
    return 'undefined';
  }

  if (typeof prop.default === 'string') {
    return JSON.stringify(prop.default);
  }

  if (typeof prop.default === 'boolean' || typeof prop.default === 'number') {
    return String(prop.default);
  }

  return 'undefined';
}

/**
 * Generates the Svelte component wrapper for an Ionic component
 * @param {Object} component - The component definition
 * @returns {string} The Svelte component code
 */
function generateSvelteComponent(component) {
  const { tag, props = [], events = [], slots = [] } = component;
  const componentName = toPascalCase(tag);

  // Generate props
  const propsDefinition = props.map(prop => {
    const typeAnnotation = getTypeAnnotation(prop);
    const defaultValue = getDefaultValue(prop);

    return `export let ${prop.name}: ${typeAnnotation} = ${defaultValue};`;
  }).join('\n  ');

  // Generate event types
  const eventTypes = events.map(event => {
    const eventName = event.event;
    const detailType = event.detail || 'any';

    return `  ${eventName}: CustomEvent<${detailType}>;`;
  }).join('\n');

  // Generate the Svelte component
  return `<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  ${propsDefinition || '// No props defined for this component'}

  // Event dispatcher
  const dispatch = createEventDispatcher<{
${eventTypes || '  // No events defined for this component'}
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = [${events.map(e => `'${e.event}'`).join(', ')}];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = [${events.map(e => `'${e.event}'`).join(', ')}];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<${tag}
  bind:this={element}
  ${props.map(prop => `${prop.name}={${prop.name}}`).join('\n  ')}
  {...$$restProps}
>
  <slot />
  ${slots.map(slot => `<slot name="${slot.name}" slot="${slot.name}" />`).join('\n  ')}
</${tag}>
`;
}

/**
 * Generates the TypeScript definition file for the index
 * @param {Array} components - List of component definitions
 */
async function generateTypeDefinition(components) {
  const imports = components.map(component => {
    const componentName = toPascalCase(component.tag);
    return `export { default as ${componentName} } from './${componentName}.svelte';`;
  }).join('\n');

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.d.ts'), imports);
  console.log('Generated index.d.ts');
}

/**
 * Generates the index.js file that exports all components
 * @param {Array} components - List of component definitions
 */
async function generateIndexFile(components) {
  const imports = components.map(component => {
    const componentName = toPascalCase(component.tag);
    return `export { default as ${componentName} } from './${componentName}.svelte';`;
  }).join('\n');

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.js'), imports);
  console.log('Generated index.js');
}

/**
 * Main function to process the Ionic components and generate Svelte wrappers
 */
async function main() {
  try {
    await ensureOutputDir();

    console.log('Downloading Ionic components definition...');
    const ionicDef = await downloadIonicDefinition();

    console.log(`Found ${ionicDef.components.length} components to process`);

    // Generate individual component files
    for (const component of ionicDef.components) {
      const componentName = toPascalCase(component.tag);
      const componentCode = generateSvelteComponent(component);

      await fs.writeFile(path.join(OUTPUT_DIR, `${componentName}.svelte`), componentCode);
      console.log(`Generated ${componentName}.svelte`);
    }

    // Generate index file and TypeScript definitions
    await generateIndexFile(ionicDef.components);
    await generateTypeDefinition(ionicDef.components);

    console.log('\nSuccessfully generated all Svelte components for Ionic web components!');
    console.log(`Output directory: ${path.resolve(OUTPUT_DIR)}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
