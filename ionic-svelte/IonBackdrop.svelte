<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let stopPropagation: boolean = "true";
  export let tappable: boolean = "true";
  export let visible: boolean = "true";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBackdropTap: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBackdropTap'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBackdropTap'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-backdrop
  bind:this={element}
  stopPropagation={stopPropagation}
  tappable={tappable}
  visible={visible}
  {...$$restProps}
>
  <slot />
  
</ion-backdrop>
