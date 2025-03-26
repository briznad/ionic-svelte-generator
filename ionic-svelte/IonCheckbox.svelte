<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let alignment: any = undefined;
  export let checked: boolean = "false";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let errorText: string | undefined = undefined;
  export let helperText: string | undefined = undefined;
  export let indeterminate: boolean = "false";
  export let justify: any = undefined;
  export let labelPlacement: any = "'start'";
  export let mode: any = undefined;
  export let name: string = "this.inputId";
  export let required: boolean = "false";
  export let value: any = "'on'";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionChange: CustomEvent<CheckboxChangeEventDetail<any>>;
  ionFocus: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionChange', 'ionFocus'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionChange', 'ionFocus'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-checkbox
  bind:this={element}
  alignment={alignment}
  checked={checked}
  color={color}
  disabled={disabled}
  errorText={errorText}
  helperText={helperText}
  indeterminate={indeterminate}
  justify={justify}
  labelPlacement={labelPlacement}
  mode={mode}
  name={name}
  required={required}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
</ion-checkbox>
