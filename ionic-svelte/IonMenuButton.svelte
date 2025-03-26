<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let autoHide: boolean = "true";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let menu: string | undefined = undefined;
  export let mode: any = undefined;
  export let type: any = "'button'";

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

<ion-menu-button
  bind:this={element}
  autoHide={autoHide}
  color={color}
  disabled={disabled}
  menu={menu}
  mode={mode}
  type={type}
  {...$$restProps}
>
  <slot />
  
</ion-menu-button>
