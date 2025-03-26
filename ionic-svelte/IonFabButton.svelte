<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let activated: boolean = "false";
  export let closeIcon: string = "close";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let download: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let mode: any = undefined;
  export let rel: string | undefined = undefined;
  export let routerAnimation: any = undefined;
  export let routerDirection: any = "'forward'";
  export let show: boolean = "false";
  export let size: any = undefined;
  export let target: string | undefined = undefined;
  export let translucent: boolean = "false";
  export let type: any = "'button'";

  // Event dispatcher
  const dispatch = createEventDispatcher<{
  ionBlur: CustomEvent<void>;
  ionFocus: CustomEvent<void>;
  }>();

  let element: HTMLElement;

  onMount(() => {
    // Set up event forwarding
    if (element) {
      const events = ['ionBlur', 'ionFocus'];

      events.forEach(eventName => {
        element.addEventListener(eventName, (event: CustomEvent) => {
          dispatch(eventName, event.detail);
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (element) {
        const events = ['ionBlur', 'ionFocus'];

        events.forEach(eventName => {
          element.removeEventListener(eventName, (event: CustomEvent) => {
            dispatch(eventName, event.detail);
          });
        });
      }
    };
  });
</script>

<ion-fab-button
  bind:this={element}
  activated={activated}
  closeIcon={closeIcon}
  color={color}
  disabled={disabled}
  download={download}
  href={href}
  mode={mode}
  rel={rel}
  routerAnimation={routerAnimation}
  routerDirection={routerDirection}
  show={show}
  size={size}
  target={target}
  translucent={translucent}
  type={type}
  {...$$restProps}
>
  <slot />
  
</ion-fab-button>
