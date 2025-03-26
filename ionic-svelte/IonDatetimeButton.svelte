<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = "'primary'";
  export let datetime: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let mode: any = undefined;

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

<ion-datetime-button
  bind:this={element}
  color={color}
  datetime={datetime}
  disabled={disabled}
  mode={mode}
  {...$$restProps}
>
  <slot />
  <slot name="date-target" slot="date-target" />
  <slot name="time-target" slot="time-target" />
</ion-datetime-button>
