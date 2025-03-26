<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let contentId: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let when: any = "QUERY['lg']";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionSplitPaneVisible: CustomEvent<{ visible: boolean; }>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionSplitPaneVisible'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionSplitPaneVisible'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-split-pane
  bind:this={element}
  contentId={contentId}
  disabled={disabled}
  when={when}
  {...$$restProps}
>
  <slot />
  
</ion-split-pane>
