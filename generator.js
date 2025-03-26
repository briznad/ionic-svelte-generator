import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetch } from 'undici';
import { createRequire } from 'module';

// Get current directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IONIC_CORE_JSON = 'https://unpkg.com/@ionic/docs/core.json';
const OUTPUT_DIR = path.join(__dirname, './dist');
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');

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
 * @returns {Promise<{data: Object, version: string}>} The parsed JSON data and extracted version
 */
async function downloadIonicDefinition() {
  try {
    console.log(`Fetching from: ${IONIC_CORE_JSON}`);

    const response = await fetch(IONIC_CORE_JSON, {
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Failed to download: Status code ${response.status}`);
    }

    // Extract version from the redirected URL
    // The URL pattern is typically: https://unpkg.com/@ionic/docs@8.5.1/core.json
    const finalUrl = response.url;
    console.log(`Successfully downloaded from: ${finalUrl}`);

    // Extract version using regex
    const versionMatch = finalUrl.match(/@ionic\/docs@([^/]+)/);
    const version = versionMatch ? versionMatch[1] : null;

    if (version) {
      console.log(`Detected Ionic Docs version: ${version}`);
    } else {
      console.warn('Could not determine Ionic version from URL. Using latest.');
    }

    return {
      data: await response.json(),
      version
    };
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
 * Generate TypeScript type for a property
 * @param {Object} prop - The property definition from Ionic
 * @returns {string} TypeScript type definition
 */
function generatePropType(prop) {
  if (!prop) return 'any';

  // Handle complex types with references
  if (prop.complexType) {
    if (prop.complexType.original === 'boolean') return 'boolean';
    if (prop.complexType.original === 'string') return 'string';
    if (prop.complexType.original === 'number') return 'number';

    if (prop.complexType.resolved) {
      return prop.complexType.resolved;
    }
  }

  // Handle simple types
  if (prop.type) {
    // Handle union types
    if (typeof prop.type === 'string' && prop.type.includes('|')) {
      return prop.type;
    }

    return prop.type;
  }

  return 'any';
}

/**
 * Extract possible values from a property
 * @param {Object} prop - The property definition
 * @returns {Array<string>} List of allowed values if available
 */
function extractPropValues(prop) {
  if (prop.values && Array.isArray(prop.values)) {
    const literalValues = prop.values
      .filter(v => v.value !== undefined)
      .map(v => v.value);

    if (literalValues.length > 0) {
      return literalValues;
    }
  }

  return null;
}

/**
 * Generates TypeScript interface for a component
 * @param {Object} component - The component definition
 * @returns {string} TypeScript interface
 */
function generateComponentInterface(component) {
  const componentName = toPascalCase(component.tag);
  const props = component.props || [];

  if (props.length === 0) {
    return `export interface ${componentName}Props {}\n`;
  }

  let interfaceContent = `export interface ${componentName}Props {\n`;

  for (const prop of props) {
    // Add JSDoc comment if there's documentation
    if (prop.docs) {
      interfaceContent += `  /**\n`;
      interfaceContent += `   * ${prop.docs}\n`;

      // Add default value if available
      if (prop.default !== undefined) {
        interfaceContent += `   * @default ${prop.default}\n`;
      }

      interfaceContent += `   */\n`;
    }

    const propName = prop.name;
    let propType = generatePropType(prop);
    const isOptional = propType.includes('|') && propType.includes('undefined');

    // Create literal union types for enum-like props
    const values = extractPropValues(prop);
    if (values && values.length > 0) {
      propType = values.map(v => `'${v}'`).join(' | ');

      // Add undefined if optional
      if (isOptional) {
        propType += ' | undefined';
      }
    }

    // Add the property
    interfaceContent += `  ${propName}${isOptional ? '?' : ''}: ${propType};\n`;
  }

  interfaceContent += `}\n`;
  return interfaceContent;
}

/**
 * Generates runtime Svelte components using the factory pattern
 * @param {Array} components - The component definitions
 * @returns {string} The component factory code
 */
function generateRuntimeComponents(components) {
  let imports = `import '@ionic/core/dist/ionic/ionic.js';\n`;

  // Add imports for each component's defineCustomElement
  components.forEach(component => {
    const tag = component.tag;
    imports += `import { defineCustomElement as define${toPascalCase(tag)} } from '@ionic/core/components/${tag}.js';\n`;
  });

  imports += '\n// Define custom elements\n';
  components.forEach(component => {
    imports += `define${toPascalCase(component.tag)}();\n`;
  });

  const factoryFunction = `
/**
 * Creates a Svelte component for an Ionic web component
 * @param {string} tagName - The tag name of the Ionic component
 * @returns {Function} - A Svelte component constructor
 */
function createSvelteComponent(tagName) {
  return function(options) {
    const { target, props = {}, events = {} } = options;

    // Create element
    const element = document.createElement(tagName);

    // Attach to DOM
    target.appendChild(element);

    // Set initial props
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'class') {
          element.className = value;
        } else if (key === 'style') {
          Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
          const eventName = key.slice(2).toLowerCase();
          element.addEventListener(eventName, value);
        } else {
          element[key] = value;
        }
      }
    });

    // Set up event listeners
    Object.entries(events).forEach(([eventName, handler]) => {
      element.addEventListener(eventName, handler);
    });

    return {
      update(newProps) {
        // Update properties when component updates
        Object.entries(newProps).forEach(([key, value]) => {
          if (value !== undefined) {
            if (key === 'class') {
              element.className = value;
            } else if (key === 'style') {
              Object.assign(element.style, value);
            } else if (!key.startsWith('on')) {
              element[key] = value;
            }
          }
        });
      },
      destroy() {
        // Remove event listeners
        Object.keys(events).forEach(eventName => {
          element.removeEventListener(eventName, events[eventName]);
        });

        // Remove prop event listeners
        Object.entries(props).forEach(([key, value]) => {
          if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.slice(2).toLowerCase();
            element.removeEventListener(eventName, value);
          }
        });

        // Remove from DOM
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    };
  };
}
`;

  // Export components
  let exports = '\n// Create and export Ionic Svelte components\n';
  components.forEach(component => {
    const componentName = toPascalCase(component.tag);
    // Add JSDoc comment with component description
    if (component.docs) {
      exports += `/**\n * ${component.docs}\n */\n`;
    }
    exports += `export const ${componentName} = createSvelteComponent('${component.tag}');\n`;
  });

  return imports + factoryFunction + exports;
}

/**
 * Generates TypeScript definition file for all components
 * @param {Array} components - List of component definitions
 * @returns {string} TypeScript definition content
 */
function generateTypeDefinitions(components) {
  let typeDefsHeader = `// Type definitions for Ionic-Svelte components\n\n`;

  // Define the base component interfaces
  typeDefsHeader += `interface ComponentOptions<Props = {}> {\n`;
  typeDefsHeader += `  target: HTMLElement;\n`;
  typeDefsHeader += `  props?: Props;\n`;
  typeDefsHeader += `  events?: Record<string, (event: CustomEvent) => void>;\n`;
  typeDefsHeader += `}\n\n`;

  typeDefsHeader += `interface SvelteComponent {\n`;
  typeDefsHeader += `  update(props: Record<string, any>): void;\n`;
  typeDefsHeader += `  destroy(): void;\n`;
  typeDefsHeader += `}\n\n`;

  // Generate component-specific interfaces
  let componentInterfaces = '';
  let componentExports = '';

  for (const component of components) {
    const componentName = toPascalCase(component.tag);

    // Generate the props interface
    componentInterfaces += generateComponentInterface(component);

    // Generate the component export
    componentExports += `export declare const ${componentName}: (options: ComponentOptions<${componentName}Props>) => SvelteComponent;\n`;
  }

  return typeDefsHeader + componentInterfaces + '\n' + componentExports;
}

/**
 * Updates package.json to set the correct Ionic version
 * @param {string} version - The version to set
 */
async function updatePackageJson(version) {
  if (!version) {
    console.log('No version provided, skipping package.json update.');
    return;
  }

  try {
    console.log(`Updating package.json with Ionic version ${version}...`);

    // Check if package.json exists
    let packageJson;
    try {
      const packageJsonContent = await fs.readFile(PACKAGE_JSON_PATH, 'utf8');
      packageJson = JSON.parse(packageJsonContent);
    } catch (err) {
      // If package.json doesn't exist or can't be parsed, create a new one
      console.log('Creating new package.json file...');
      packageJson = {
        name: "ionic-svelte",
        version: "1.0.0",
        description: "Svelte wrappers for Ionic Web Components",
        type: "module",
        dependencies: {},
        peerDependencies: {}
      };
    }

    // Update dependencies and peerDependencies
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.peerDependencies = packageJson.peerDependencies || {};

    packageJson.dependencies['@ionic/core'] = `^${version}`;
    packageJson.peerDependencies['@ionic/core'] = `^${version}`;

    // Write updated package.json
    await fs.writeFile(
      PACKAGE_JSON_PATH,
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );
    console.log('package.json updated successfully.');

  } catch (err) {
    console.error('Error updating package.json:', err.message);
  }
}

/**
 * Main function to process the Ionic components and generate index.js
 */
async function main() {
  try {
    await ensureOutputDir();

    console.log('Downloading Ionic components definition...');
    const { data: ionicDef, version } = await downloadIonicDefinition();

    console.log(`Found ${ionicDef.components.length} components to process`);

    // Generate the runtime index.js file
    const runtimeCode = generateRuntimeComponents(ionicDef.components);
    await fs.writeFile(path.join(OUTPUT_DIR, 'index.js'), runtimeCode);
    console.log('Generated index.js');

    // Generate the TypeScript definition file
    const typeDefinitions = generateTypeDefinitions(ionicDef.components);
    await fs.writeFile(path.join(OUTPUT_DIR, 'index.d.ts'), typeDefinitions);
    console.log('Generated index.d.ts with rich type definitions');

    // Update package.json with the detected version
    await updatePackageJson(version);

    console.log('\nSuccessfully generated index.js and index.d.ts with all Ionic web components as Svelte components!');
    console.log(`Output directory: ${path.resolve(OUTPUT_DIR)}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
