<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let beforeEnter: any = undefined;
  export let beforeLeave: any = undefined;
  export let component: string = undefined;
  export let componentProps: string | undefined = undefined;
  export let url: string = "''";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionRouteDataChanged: CustomEvent<any>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionRouteDataChanged'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionRouteDataChanged'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-route
  bind:this={element}
  beforeEnter={beforeEnter}
  beforeLeave={beforeLeave}
  component={component}
  componentProps={componentProps}
  url={url}
  {...$$restProps}
>
  <slot />
  
</ion-route>
