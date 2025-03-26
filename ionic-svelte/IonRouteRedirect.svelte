<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let from: string = undefined;
  export let to: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionRouteRedirectChanged: CustomEvent<any>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionRouteRedirectChanged'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionRouteRedirectChanged'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-route-redirect
  bind:this={element}
  from={from}
  to={to}
  {...$$restProps}
>
  <slot />
  
</ion-route-redirect>
