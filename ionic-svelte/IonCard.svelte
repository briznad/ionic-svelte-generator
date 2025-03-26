<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let button: boolean = "false";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let download: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let mode: any = undefined;
  export let rel: string | undefined = undefined;
  export let routerAnimation: any = undefined;
  export let routerDirection: any = "'forward'";
  export let target: string | undefined = undefined;
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

<ion-card
  bind:this={element}
  button={button}
  color={color}
  disabled={disabled}
  download={download}
  href={href}
  mode={mode}
  rel={rel}
  routerAnimation={routerAnimation}
  routerDirection={routerDirection}
  target={target}
  type={type}
  {...$$restProps}
>
  <slot />
  
</ion-card>
