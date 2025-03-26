<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let loadingSpinner: any = undefined;
  export let loadingText: string | undefined = undefined;

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

<ion-infinite-scroll-content
  bind:this={element}
  loadingSpinner={loadingSpinner}
  loadingText={loadingText}
  {...$$restProps}
>
  <slot />
  
</ion-infinite-scroll-content>
