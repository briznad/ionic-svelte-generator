<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let root: string = "'/'";
  export let useHash: boolean = "true";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionRouteDidChange: CustomEvent<RouterEventDetail>;
  ionRouteWillChange: CustomEvent<RouterEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionRouteDidChange', 'ionRouteWillChange'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionRouteDidChange', 'ionRouteWillChange'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-router
  bind:this={element}
  root={root}
  useHash={useHash}
  {...$$restProps}
>
  <slot />
  
</ion-router>
