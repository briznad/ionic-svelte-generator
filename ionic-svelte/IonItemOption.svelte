<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let download: string | undefined = undefined;
  export let expandable: boolean = "false";
  export let href: string | undefined = undefined;
  export let mode: any = undefined;
  export let rel: string | undefined = undefined;
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

<ion-item-option
  bind:this={element}
  color={color}
  disabled={disabled}
  download={download}
  expandable={expandable}
  href={href}
  mode={mode}
  rel={rel}
  target={target}
  type={type}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
  <slot name="bottom" slot="bottom" />
  <slot name="end" slot="end" />
  <slot name="icon-only" slot="icon-only" />
  <slot name="start" slot="start" />
  <slot name="top" slot="top" />
</ion-item-option>
