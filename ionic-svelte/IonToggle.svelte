<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let alignment: any = undefined;
  export let checked: boolean = "false";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let enableOnOffLabels: boolean | undefined = "config.get('toggleOnOffLabels')";
  export let errorText: string | undefined = undefined;
  export let helperText: string | undefined = undefined;
  export let justify: any = undefined;
  export let labelPlacement: any = "'start'";
  export let mode: any = undefined;
  export let name: string = "this.inputId";
  export let required: boolean = "false";
  export let value: string | undefined = "'on'";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionChange: CustomEvent<ToggleChangeEventDetail<any>>;
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

<ion-toggle
  bind:this={element}
  alignment={alignment}
  checked={checked}
  color={color}
  disabled={disabled}
  enableOnOffLabels={enableOnOffLabels}
  errorText={errorText}
  helperText={helperText}
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
</ion-toggle>
