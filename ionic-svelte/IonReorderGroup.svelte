<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let disabled: boolean = "true";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionItemReorder: CustomEvent<ItemReorderEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionItemReorder'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionItemReorder'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-reorder-group
  bind:this={element}
  disabled={disabled}
  {...$$restProps}
>
  <slot />
  
</ion-reorder-group>
