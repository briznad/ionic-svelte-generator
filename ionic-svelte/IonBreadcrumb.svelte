<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let active: boolean = "false";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let download: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let mode: any = undefined;
  export let rel: string | undefined = undefined;
  export let routerAnimation: any = undefined;
  export let routerDirection: any = "'forward'";
  export let separator: boolean | undefined = undefined;
  export let target: string | undefined = undefined;

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

<ion-breadcrumb
  bind:this={element}
  active={active}
  color={color}
  disabled={disabled}
  download={download}
  href={href}
  mode={mode}
  rel={rel}
  routerAnimation={routerAnimation}
  routerDirection={routerDirection}
  separator={separator}
  target={target}
  {...$$restProps}
>
  <slot />
  
</ion-breadcrumb>
