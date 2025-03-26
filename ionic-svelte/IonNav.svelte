<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let animated: boolean = "true";
  export let animation: any = undefined;
  export let root: string | undefined = undefined;
  export let rootParams: string | undefined = undefined;
  export let swipeGesture: boolean | undefined = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionNavDidChange: CustomEvent<void>;
  ionNavWillChange: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionNavDidChange', 'ionNavWillChange'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionNavDidChange', 'ionNavWillChange'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-nav
  bind:this={element}
  animated={animated}
  animation={animation}
  root={root}
  rootParams={rootParams}
  swipeGesture={swipeGesture}
  {...$$restProps}
>
  <slot />
  
</ion-nav>
