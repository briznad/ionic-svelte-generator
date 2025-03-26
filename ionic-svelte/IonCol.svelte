<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let offset: string | undefined = undefined;
  export let offsetLg: string | undefined = undefined;
  export let offsetMd: string | undefined = undefined;
  export let offsetSm: string | undefined = undefined;
  export let offsetXl: string | undefined = undefined;
  export let offsetXs: string | undefined = undefined;
  export let pull: string | undefined = undefined;
  export let pullLg: string | undefined = undefined;
  export let pullMd: string | undefined = undefined;
  export let pullSm: string | undefined = undefined;
  export let pullXl: string | undefined = undefined;
  export let pullXs: string | undefined = undefined;
  export let push: string | undefined = undefined;
  export let pushLg: string | undefined = undefined;
  export let pushMd: string | undefined = undefined;
  export let pushSm: string | undefined = undefined;
  export let pushXl: string | undefined = undefined;
  export let pushXs: string | undefined = undefined;
  export let size: string | undefined = undefined;
  export let sizeLg: string | undefined = undefined;
  export let sizeMd: string | undefined = undefined;
  export let sizeSm: string | undefined = undefined;
  export let sizeXl: string | undefined = undefined;
  export let sizeXs: string | undefined = undefined;

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

<ion-col
  bind:this={element}
  offset={offset}
  offsetLg={offsetLg}
  offsetMd={offsetMd}
  offsetSm={offsetSm}
  offsetXl={offsetXl}
  offsetXs={offsetXs}
  pull={pull}
  pullLg={pullLg}
  pullMd={pullMd}
  pullSm={pullSm}
  pullXl={pullXl}
  pullXs={pullXs}
  push={push}
  pushLg={pushLg}
  pushMd={pushMd}
  pushSm={pushSm}
  pushXl={pushXl}
  pushXs={pushXs}
  size={size}
  sizeLg={sizeLg}
  sizeMd={sizeMd}
  sizeSm={sizeSm}
  sizeXl={sizeXl}
  sizeXs={sizeXs}
  {...$$restProps}
>
  <slot />
  
</ion-col>
