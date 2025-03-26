<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let disabled: boolean = "false";
  export let mode: any = undefined;
  export let readonly: boolean = "false";
  export let toggleIcon: string = "chevronDown";
  export let toggleIconSlot: any = "'end'";
  export let value: string = "`ion-accordion-${accordionIds++}`";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  // No events defined for this component
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = [];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = [];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-accordion
  bind:this={element}
  disabled={disabled}
  mode={mode}
  readonly={readonly}
  toggleIcon={toggleIcon}
  toggleIconSlot={toggleIconSlot}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="content" slot="content" />
  <slot name="header" slot="header" />
</ion-accordion>
