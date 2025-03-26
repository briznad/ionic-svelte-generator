<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import '@ionic/core/dist/ionic/ionic.js';

  // Props
  export let alignment: any = undefined;
  export let color: string | undefined = undefined;
  export let disabled: boolean = "false";
  export let justify: any = undefined;
  export let labelPlacement: any = "'start'";
  export let mode: any = undefined;
  export let name: string = "this.inputId";
  export let value: any = undefined;

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

<ion-radio
  bind:this={element}
  alignment={alignment}
  color={color}
  disabled={disabled}
  justify={justify}
  labelPlacement={labelPlacement}
  mode={mode}
  name={name}
  value={value}
  {...$$restProps}
>
  <slot />
  <slot name="" slot="" />
</ion-radio>
