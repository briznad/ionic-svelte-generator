<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let mode: any = undefined;
  export let scrollable: boolean = "false";
  export let selectOnFocus: boolean = "false";
  export let swipeGesture: boolean = "true";
  export let value: string | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionChange: CustomEvent<SegmentChangeEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionChange'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionChange'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-segment
  bind:this={element}
  color={color}
  disabled={disabled}
  mode={mode}
  scrollable={scrollable}
  selectOnFocus={selectOnFocus}
  swipeGesture={swipeGesture}
  value={value}
  {...$$restProps}
>
  <slot />
  
</ion-segment>
