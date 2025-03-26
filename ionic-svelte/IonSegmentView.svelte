<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let disabled: boolean = "false";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionSegmentViewScroll: CustomEvent<SegmentViewScrollEvent>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionSegmentViewScroll'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionSegmentViewScroll'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-segment-view
  bind:this={element}
  disabled={disabled}
  {...$$restProps}
>
  <slot />
  
</ion-segment-view>
