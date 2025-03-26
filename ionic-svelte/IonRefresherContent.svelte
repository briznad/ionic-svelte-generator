<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let pullingIcon: string | undefined = undefined;
  export let pullingText: string | undefined = undefined;
  export let refreshingSpinner: any = undefined;
  export let refreshingText: string | undefined = undefined;

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

<ion-refresher-content
  bind:this={element}
  pullingIcon={pullingIcon}
  pullingText={pullingText}
  refreshingSpinner={refreshingSpinner}
  refreshingText={refreshingText}
  {...$$restProps}
>
  <slot />
  
</ion-refresher-content>
