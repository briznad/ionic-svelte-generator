<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  // No props defined for this component

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionTabsDidChange: CustomEvent<{ tab: string; }>;
  ionTabsWillChange: CustomEvent<{ tab: string; }>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionTabsDidChange', 'ionTabsWillChange'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionTabsDidChange', 'ionTabsWillChange'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-tabs
  bind:this={element}
  
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
  <slot name="bottom" slot="bottom" />
  <slot name="top" slot="top" />
</ion-tabs>
