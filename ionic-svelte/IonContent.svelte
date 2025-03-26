<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = undefined;
  export let fixedSlotPlacement: any = "'after'";
  export let forceOverscroll: boolean | undefined = undefined;
  export let fullscreen: boolean = "false";
  export let scrollEvents: boolean = "false";
  export let scrollX: boolean = "false";
  export let scrollY: boolean = "true";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionScroll: CustomEvent<ScrollDetail>;
  ionScrollEnd: CustomEvent<ScrollBaseDetail>;
  ionScrollStart: CustomEvent<ScrollBaseDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionScroll', 'ionScrollEnd', 'ionScrollStart'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionScroll', 'ionScrollEnd', 'ionScrollStart'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-content
  bind:this={element}
  color={color}
  fixedSlotPlacement={fixedSlotPlacement}
  forceOverscroll={forceOverscroll}
  fullscreen={fullscreen}
  scrollEvents={scrollEvents}
  scrollX={scrollX}
  scrollY={scrollY}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
  <slot name="fixed" slot="fixed" />
</ion-content>
