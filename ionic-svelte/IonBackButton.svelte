<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = undefined;
  export let defaultHref: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let icon: string | undefined = undefined;
  export let mode: any = undefined;
  export let routerAnimation: any = undefined;
  export let text: string | undefined = undefined;
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

<ion-back-button
  bind:this={element}
  color={color}
  defaultHref={defaultHref}
  disabled={disabled}
  icon={icon}
  mode={mode}
  routerAnimation={routerAnimation}
  text={text}
  type={type}
  {...$$restProps}
>
  <slot />
  
</ion-back-button>
