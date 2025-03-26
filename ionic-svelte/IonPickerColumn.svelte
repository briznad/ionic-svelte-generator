<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = "'primary'";
  export let disabled: boolean = "false";
  export let mode: any = undefined;
  export let value: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionChange: CustomEvent<PickerColumnChangeEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionChange'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionChange'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-picker-column
  bind:this={element}
  color={color}
  disabled={disabled}
  mode={mode}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="prefix" slot="prefix" />
  <slot name="suffix" slot="suffix" />
</ion-picker-column>
