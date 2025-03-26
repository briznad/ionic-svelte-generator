<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let buttonType: string = "'button'";
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let download: string | undefined = undefined;
  export let expand: any = undefined;
  export let fill: any = undefined;
  export let form: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let mode: any = undefined;
  export let rel: string | undefined = undefined;
  export let routerAnimation: any = undefined;
  export let routerDirection: any = "'forward'";
  export let shape: any = undefined;
  export let size: any = undefined;
  export let strong: boolean = "false";
  export let target: string | undefined = undefined;
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

<ion-button
  bind:this={element}
  buttonType={buttonType}
  color={color}
  disabled={disabled}
  download={download}
  expand={expand}
  fill={fill}
  form={form}
  href={href}
  mode={mode}
  rel={rel}
  routerAnimation={routerAnimation}
  routerDirection={routerDirection}
  shape={shape}
  size={size}
  strong={strong}
  target={target}
  type={type}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
  <slot name="end" slot="end" />
  <slot name="icon-only" slot="icon-only" />
  <slot name="start" slot="start" />
</ion-button>
