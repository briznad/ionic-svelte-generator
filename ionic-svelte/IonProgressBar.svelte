<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let buffer: number = "1";
  export let color: string | undefined = undefined;
  export let mode: any = undefined;
  export let reversed: boolean = "false";
  export let type: any = "'determinate'";
  export let value: number = "0";

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

<ion-progress-bar
  bind:this={element}
  buffer={buffer}
  color={color}
  mode={mode}
  reversed={reversed}
  type={type}
  value={value}
  {...$$restProps}
>
  <slot />
  
</ion-progress-bar>
