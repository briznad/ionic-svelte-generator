# ionic-svelte-wrappers

A lightweight wrapper library that makes Ionic web components available as Svelte components with TypeScript support.

## Features

- Full support for all Ionic UI components
- Rich TypeScript definitions with proper interface imports
- Auto-synchronization with the latest Ionic version
- Minimal runtime overhead - direct WebComponent usage
- Maintains all Ionic component features and styling

## Installation

```bash
npm install ionic-svelte-wrappers
```

## Usage

```svelte
<script>
  import { IonButton, IonCard, IonCardContent } from 'ionic-svelte-wrappers';
</script>

<IonCard>
  <IonCardContent>
    <h1>Hello Ionic + Svelte</h1>
    <IonButton color="primary">Click Me</IonButton>
  </IonCardContent>
</IonCard>
```

## TypeScript Support

The library provides rich TypeScript definitions that directly import and reference the original Ionic interfaces. This gives you proper type checking, autocompletion, and documentation in your IDE.

```typescript
// You'll get proper typing for all props
const buttonProps = {
  color: 'primary',  // Will suggest 'primary', 'secondary', etc.
  disabled: false,
  size: 'small'      // Will suggest 'small', 'default', 'large'
};
```

## Event Handling

Events work just like in Svelte:

```svelte
<script>
  import { IonInput } from 'ionic-svelte-wrappers';

  let value = '';

  function handleInput(event) {
    value = event.detail.value;
  }
</script>

<IonInput
  value={value}
  events={{
    ionInput: handleInput
  }}
/>

<p>Current value: {value}</p>
```

## Building

This library automatically synchronizes with the latest Ionic version. To rebuild with the latest version:

```bash
cd ionic-svelte-wrappers

npm run generate
```

This will:
1. Download the latest Ionic component definitions
2. Generate the component wrappers
3. Create type definitions
4. Update package.json with the correct Ionic version

## License

[MIT](LICENSE)
