<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let closeDuration: string = "'280ms'";
  export let disabled: boolean = "false";
  export let mode: any = undefined;
  export let pullFactor: number = "1";
  export let pullMax: number = "this.pullMin + 60";
  export let pullMin: number = "60";
  export let snapbackDuration: string = "'280ms'";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionPull: CustomEvent<void>;
  ionRefresh: CustomEvent<RefresherEventDetail>;
  ionStart: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionPull', 'ionRefresh', 'ionStart'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionPull', 'ionRefresh', 'ionStart'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-refresher
  bind:this={element}
  closeDuration={closeDuration}
  disabled={disabled}
  mode={mode}
  pullFactor={pullFactor}
  pullMax={pullMax}
  pullMin={pullMin}
  snapbackDuration={snapbackDuration}
  {...$$restProps}
>
  <slot />
  
</ion-refresher>
