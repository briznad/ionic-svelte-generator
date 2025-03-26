<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = undefined;
  export let itemsAfterCollapse: number = "1";
  export let itemsBeforeCollapse: number = "1";
  export let maxItems: number | undefined = undefined;
  export let mode: any = undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionCollapsedClick: CustomEvent<BreadcrumbCollapsedClickEventDetail>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionCollapsedClick'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionCollapsedClick'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-breadcrumbs
  bind:this={element}
  color={color}
  itemsAfterCollapse={itemsAfterCollapse}
  itemsBeforeCollapse={itemsBeforeCollapse}
  maxItems={maxItems}
  mode={mode}
  {...$$restProps}
>
  <slot />
  
</ion-breadcrumbs>
