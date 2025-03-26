<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let disabled: boolean = "false";
  export let position: any = "'bottom'";
  export let threshold: string = "'15%'";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionInfinite: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionInfinite'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionInfinite'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-infinite-scroll
  bind:this={element}
  disabled={disabled}
  position={position}
  threshold={threshold}
  {...$$restProps}
>
  <slot />
  
</ion-infinite-scroll>
