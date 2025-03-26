<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let disabled: boolean = "false";
  export let download: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let layout: any = undefined;
  export let mode: any = undefined;
  export let rel: string | undefined = undefined;
  export let selected: boolean = "false";
  export let tab: string | undefined = undefined;
  export let target: string | undefined = undefined;

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

<ion-tab-button
  bind:this={element}
  disabled={disabled}
  download={download}
  href={href}
  layout={layout}
  mode={mode}
  rel={rel}
  selected={selected}
  tab={tab}
  target={target}
  {...$$restProps}
>
  <slot />
  
</ion-tab-button>
