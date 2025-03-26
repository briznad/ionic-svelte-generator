<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let alt: string | undefined = undefined;
  export let src: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionError: CustomEvent<void>;
  ionImgDidLoad: CustomEvent<void>;
  ionImgWillLoad: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionError', 'ionImgDidLoad', 'ionImgWillLoad'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionError', 'ionImgDidLoad', 'ionImgWillLoad'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-img
  bind:this={element}
  alt={alt}
  src={src}
  {...$$restProps}
>
  <slot />
  
</ion-img>
